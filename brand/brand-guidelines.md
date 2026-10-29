# 《厚》品牌规范

## 品牌核心

| 项目 | 内容 |
|---|---|
| 名称 | 中文名《厚》，英文名 Hou |
| 来源 | 华罗庚"先把书读厚，再把书读薄" |
| 标语 | 读厚，再读薄 |
| 性格 | 安静、克制、有书卷气、耐心、长期 |
| 标志含义 | 五层淡墨层层晕染叠成一座山：每一层是读厚时叠加的一层理解，积土成山 |

## 标志

| 文件 | 用途 |
|---|---|
| `icon/hou-icon-master.png` | 应用图标母版（浅色），1024×1024，铺满正方形，不带圆角 |
| `icon/hou-icon-master-dark.png` | 应用图标母版（深色模式） |
| `mark/hou-mark-ink.png` | 透明底墨色山形，用于浅色背景 |
| `mark/hou-mark-white.png` | 透明底白色山形，用于深色背景 |
| `lockup/hou-lockup-ink.png`、`lockup/hou-lockup-white.png` | 横版组合：山形加"厚"字，透明底，分浅色与深色背景两版 |
| `lockup/hou-lockup-tagline-ink.png`、`lockup/hou-lockup-tagline-white.png` | 横版组合加标语"读厚，再读薄" |

## 全部物料

| 类别 | 文件 | 规格 |
|---|---|---|
| macOS 图标 | `macos/AppIcon.appiconset`、`macos/Hou.icns` | 16 至 1024px 共 10 个尺寸 |
| Icon Composer 图层 | `icon/layers/foreground-ink.png`、`icon/layers/background-paper.png` | 1024×1024，前景透明底 |
| 网站 | `web/` 下的网页标签图标、PWA 图标、`og-image.png` 分享图（1200×630）、`head-tags.html` | |
| 头像 | `social/avatar-1024.png`、`social/avatar-400.png`、`social/avatar-dark-1024.png` | 圆形裁切后山形完整 |
| 公众号 | `social/wechat-cover-900x383.png`（首条封面，2.35:1）、`social/wechat-cover-square-500.png`（次条封面） | |
| 小红书 | `social/xiaohongshu-cover-1080x1440.png` | 3:4 |
| X | `social/x-header-1500x500.png` | 内容放在右侧中部，避开左下角头像和上下各约 60px 的裁切 |
| 品牌规范板 | `board/hou-brand-board.png` | 2560×1440 |
| Open Design 设计系统 | 仓库根目录的 `manifest.json`、`DESIGN.md`、`tokens.css`、`USAGE.md`、`assets/`、`fonts/` | 在 Open Design 中通过"从 GitHub 导入"读取本仓库 |

各平台尺寸来自 Canva 等第三方说明和 X 官方帮助中心；公众号次条封面和头像、B 站的尺寸没有找到官方说明，上传时以平台后台提示为准。

使用规则：

- 标志四周的留白不小于山形宽度的四分之一。
- 标志只用墨色或白色，不改成其他颜色。
- 不添加立体、玻璃、发光、描边、投影等效果。
- 不放在杂乱的照片或花纹上。
- 小于 64px 时使用应用图标，不单独使用透明底山形。

## 配色

| 名称 | 色值 | 用途 |
|---|---|---|
| 宣纸 | `#F3EADB` | 主背景 |
| 墨 | `#333435` | 标志、标题、正文 |
| 中墨 | `#5F5E5C` | 次级文字 |
| 淡墨 | `#A49F97` | 辅助信息、分隔线 |
| 浅墨 | `#C9C2B7` | 边框、占位 |
| 夜墨 | `#1E2022` | 深色模式背景 |
| 朱砂 | `#C8452D` | 强调色，只用于需要提醒的单个元素，单个画面中的面积不超过 5%；用于印章、小圆点等不带文字的元素 |
| 深朱砂 | `#B83F29` | 带文字的强调元素（如待完成数量标记），宣纸色文字对比度 4.66:1，符合 WCAG AA |

界面实现以仓库根目录的 `DESIGN.md` 为准，其中包含全部颜色、字体、间距、圆角、组件和动效的取值。

配色从选定图标中直接取色，墨色的五个层次对应图标中五遍淡墨的深浅。

## 字体

| 场景 | 字体 | 说明 |
|---|---|---|
| 品牌字、标题、封面文字 | 思源宋体（Source Han Serif） | 开源字体（SIL Open Font License），可以商用；字体文件与授权文本在仓库根目录 `fonts/` |
| 应用界面 | 苹方（PingFang SC） | macOS 系统字体，只在应用界面内使用 |

## 版式

- 以留白为主，画面中的元素不超过三个。
- 文字以标题为主，正文尽量短。
- 背景使用宣纸色或夜墨色的纯色，不使用渐变。
