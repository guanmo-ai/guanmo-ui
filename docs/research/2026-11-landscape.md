# 调研记录：设计 Skill 与大厂设计系统（2026-11）

## 大厂与知名设计系统的许可证（已核对仓库里的 LICENSE 原文）

| 来源 | 仓库 | 许可证 | 结论 |
| --- | --- | --- | --- |
| Google Material | material-components/material-web、google/material-design-icons | Apache 2.0 | 可用；保留声明，注明修改 |
| 微软 Fluent | microsoft/fluentui、microsoft/fluentui-system-icons | MIT | 可用 |
| IBM Carbon | carbon-design-system/carbon | Apache 2.0 | 可用 |
| IBM Plex 字体 | IBM/plex | OFL 1.1（保留字体名 Plex） | 可打包；修改后不能用原名；不能单独出售 |
| Vercel Geist 字体 | vercel/geist-font | OFL 1.1 | 同上 |
| GitHub Primer | primer/css、primer/primitives、primer/octicons | MIT | 可用 |
| Adobe Spectrum | adobe/react-spectrum、adobe/spectrum-css | Apache 2.0 | 可用；React Aria 的无障碍交互最值得借鉴 |
| Meta StyleX | facebook/stylex | MIT | 可用（Meta 没有开源完整设计系统） |
| Radix | radix-ui/primitives、radix-ui/themes | MIT | 可用 |
| shadcn/ui | shadcn-ui/ui | MIT | 可用 |
| Ant Design / Arco / TDesign / Semi | ant-design、arco-design、Tencent/tdesign、DouyinFE/semi-design | MIT | 可用 |
| Uber Base Web | uber/baseweb | MIT | 可用 |
| **Shopify Polaris** | Shopify/polaris | MIT 文本 + 附加限制 | **不用**：只能用于接入 Shopify 的应用；独立应用须与 Shopify 产品“明显不同”，由 Shopify 判定 |
| **Salesforce Lightning** | salesforce-ux/design-system | 代码 BSD-3；图标图片 CC BY-ND 4.0 | 代码可用；**图标图片不可修改** |
| **苹果 HIG / SF 字体 / SF Symbols** | 无开源仓库 | 非开源 | **不放进仓库**；只学原则，用自己的话写并附链接 |

注意：许可证只覆盖代码和资源，不覆盖商标；规范网站上的文字（material.io、HIG）有版权，不整段搬运。商业化（付费版）前请律师确认。

## 取各家所长（方向，待细化）

- Material 3：动效时长与缓动体系
- Carbon：高密度数据界面的栅格
- Primer：保证对比度的配色梯度
- React Aria / Radix：键盘、焦点、读屏等无障碍交互（可直接借用代码）
- 苹果 HIG：克制、层级、反馈的原则（只学思路）

## 其他设计 Skill（已读仓库内容与许可证）

| 项目 | 许可证 | 形态 | 最强的一点 |
| --- | --- | --- | --- |
| Anthropic frontend-design（anthropics/skills） | Apache 2.0 | 一份 SKILL.md | 审美原则：从题材出发、避免模板化的“AI 味”、字体与结构即信息 |
| Impeccable（pbakaus/impeccable） | Apache 2.0 | 24 个命令 + 网站 | 改现有界面：bolder / quieter / polish / harden 等动作词；critique 打分、audit 技术审计；62 条不靠大模型的“AI 味”检测规则；浏览器里选元素实时换方案 |
| UI UX Pro Max（nextlevelbuilder/ui-ux-pro-max-skill） | MIT | 多个子 Skill + 数据库 + CLI | 资料库：80 种可搜索风格、192 条推理规则、配色与字体搭配，按产品类型生成设计系统 |
| Vercel Web Interface Guidelines（vercel-labs/web-interface-guidelines） | MIT | 一份清单 + 命令 | 几百条交互细节：键盘、焦点、点击区域 24/44px、加载闪烁、URL 保存状态等 |

设计 Skill 能做的事，除了新建页面和 App：改现有界面、评审打分、技术审计、检测 AI 味、沉淀设计系统（DESIGN.md）、截图还原、多方向对比、浏览器里实时换方案、改界面文案、给开发的交付规格。

定位：guanmo-ui 本身就是这个设计 Skill（新建 + 打磨 + 评审），画廊是它的作品证明。差异点：自动出展示视频、动效与材质、确定性的自动验收、中文优先。
