// Deterministic recorder: drives a page's virtual clock frame by frame and pipes screenshots into ffmpeg.
// The page must expose window.__step(ms), window.__ready (Promise) and set window.__done when its script ends;
// it should switch into recording mode when window.__RECORD is true.
//
// Usage: node tools/record.js <page.html> <out.mp4> [--w 1440 --h 1080 --scale 2 --fps 60]
//        node tools/record.js <page.html> <out-prefix> --preview 1000,2500   (still frames at those ms)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [src, out] = args;
const fps = +opt('--fps', 60), W = +opt('--w', 1440), H = +opt('--h', 900), SCALE = +opt('--scale', 2);
const preview = opt('--preview', null);
(async () => {
  const body = fs.readFileSync(src, 'utf8');
  // Full HTML documents load as-is; bare fragments get a minimal document around them.
  let target = path.resolve(src);
  if (!/^\s*<!doctype/i.test(body)) {
    target = path.join(path.dirname(path.resolve(out)), '_wrapped.html');
    fs.writeFileSync(target, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}</style></head><body>${body}</body></html>`);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE, colorScheme: 'light' });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await page.addInitScript(() => { window.__RECORD = true; });
  await page.goto('file://' + target, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.__ready);
  await page.waitForTimeout(800);
  const dt = 1000 / fps;
  if (preview) {
    const times = preview.split(',').map(Number); let t = 0, i = 0;
    for (const at of times) {
      while (t < at) { await page.evaluate(d => window.__step(d), dt); t += dt; }
      await page.screenshot({ path: `${out}_${String(i++).padStart(2, '0')}_${at}.jpg`, type: 'jpeg', quality: 85 });
    }
    console.log('errors', JSON.stringify(errs)); await browser.close(); return;
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  let n = 0; const t0 = Date.now();
  for (;;) {
    const done = await page.evaluate(d => { window.__step(d); return !!window.__done; }, dt);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    n++;
    if (n % 300 === 0) console.log(`frame ${n} (${(n / fps).toFixed(1)}s video) ${((Date.now() - t0) / 1000).toFixed(0)}s elapsed`);
    if (done || n > fps * 120) break;
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log('frames', n, 'errors', JSON.stringify(errs.slice(0, 5)));
  await browser.close();
})();
