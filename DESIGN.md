---
version: alpha
name: Hou
description: 《厚》macOS 阅读与考察应用的视觉规范。宣纸与水墨，安静、克制、有书卷气。
colors:
  primary: "#333435"
  secondary: "#5F5E5C"
  tertiary: "#B83F29"
  neutral: "#F3EADB"
  paper: "#F3EADB"
  paper-raised: "#F8F2E7"
  ink: "#333435"
  ink-mid: "#5F5E5C"
  ink-light: "#A49F97"
  ink-faint: "#C9C2B7"
  night: "#1E2022"
  night-raised: "#2A2C2E"
  on-night: "#EDE5D6"
  vermilion: "#C8452D"
  vermilion-deep: "#B83F29"
  success: "#4E6B58"
  warning: "#8A5F27"
typography:
  display:
    fontFamily: Source Han Serif SC
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.25
  h1:
    fontFamily: Source Han Serif SC
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.3
  h2:
    fontFamily: Source Han Serif SC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: PingFang SC
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.7
  reading:
    fontFamily: Source Han Serif SC
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: PingFang SC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: PingFang SC
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: "{colors.ink-mid}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  action-card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  badge-alert:
    backgroundColor: "{colors.vermilion-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 2px 6px
  seal:
    backgroundColor: "{colors.vermilion}"
    rounded: "{rounded.sm}"
    size: 12px
  divider:
    backgroundColor: "{colors.ink-faint}"
    height: 1px
  progress-track:
    backgroundColor: "{colors.ink-faint}"
    rounded: "{rounded.sm}"
    height: 4px
  progress-fill:
    backgroundColor: "{colors.ink-light}"
    rounded: "{rounded.sm}"
    height: 4px
  feedback-mastered:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.success}"
    typography: "{typography.label}"
  feedback-partial:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.warning}"
    typography: "{typography.label}"
  feedback-misconception:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.vermilion-deep}"
    typography: "{typography.label}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  page-dark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
  card-dark:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

《厚》是一款以行动为中心的 macOS 学习应用：钩子在合适的时刻触发，用户在几分钟内完成一次考察。界面要像一张宣纸——大面积留白，墨色分层，没有多余的装饰，让用户的注意力始终落在"现在该做的这一件事"上。

品牌性格：安静、克制、有书卷气、耐心、长期。

## Colors

配色取自应用图标：宣纸底色，加上五遍淡墨的深浅层次。

- **paper（#F3EADB）**：主背景，所有页面的底色。
- **paper-raised（#F8F2E7）**：卡片与浮层，比底色略亮，用来分出层次，代替阴影。
- **ink（#333435）**：标题、正文、主按钮。
- **ink-mid（#5F5E5C）**：次级文字、说明。
- **ink-light（#A49F97）**：图标描边、占位符等装饰性元素，不用于需要阅读的文字。
- **ink-faint（#C9C2B7）**：分隔线、输入框边框。
- **night（#1E2022）/ night-raised（#2A2C2E）/ on-night（#EDE5D6）**：深色模式的背景、卡片与文字。
- **vermilion（#C8452D）/ vermilion-deep（#B83F29）**：唯一的强调色，只用于需要用户立即注意的单个元素，单个画面中的面积不超过 5%。不带文字的元素（印章、小圆点）用 vermilion；带文字的元素（待完成数量标记、误解标注）用 vermilion-deep，以保证宣纸色文字的对比度达到 WCAG AA（4.66:1）。
- **success（#4E6B58）/ warning（#8A5F27）**：判断结果的状态色，分别表示"已掌握"和"部分掌握"，只用于文字和小图标；"存在误解"使用 vermilion-deep。三者都是低饱和的墨调，与宣纸底色协调。
- **primary / secondary / tertiary / neutral**：规范要求的语义色，分别等于 ink、ink-mid、vermilion-deep、paper。

## Typography

标题和阅读正文使用思源宋体（Source Han Serif SC），延续书卷气；界面控件和说明文字使用苹方（PingFang SC），保证小字号清晰。

- 阅读器正文使用 `reading`：17px、行高 1.9，为长时间阅读留足行距。
- 界面正文使用 `body`：15px、行高 1.7。
- 按钮、标签使用 `label`：13px。

## Layout

- 间距只取 4、8、16、24、32、48px 六档。
- 主窗口内容区最大宽度 720px，居中，两侧留白。
- 一屏只突出一件"现在该做的事"：一张行动卡片居中，其余信息退到次要位置。

## Elevation & Depth

不使用投影。层次靠底色深浅区分：页面用 paper，卡片和浮层用 paper-raised，深色模式对应 night 与 night-raised。弹出窗口可以使用 macOS 系统自带的窗口阴影。

## Shapes

- 卡片和窗口内容区圆角 12px，按钮和输入框 8px，标记 4px。
- 线条统一 1px，颜色 ink-faint。

## Components

- **行动卡片（action-card）**：承载一次钩子触发的行动，例如一次考察、一次计划调整。卡片内依次为：一行说明（caption，ink-mid）、标题（h2）、一句话描述（body）、一个主按钮。
- **主按钮（button-primary）**：墨底宣纸字。一屏最多一个主按钮。
- **次按钮（button-secondary）**：宣纸底墨字，1px ink-faint 边框。
- **提醒标记（badge-alert）**：深朱砂底，只用于待完成数量。
- **印章（seal）**：朱砂小方块，不带文字，用于标注一处需要注意的位置。
- **分隔线（divider）与进度条（progress-track / progress-fill）**：浅墨与淡墨，不承载文字。
- **页面（page / page-dark）**：浅色模式宣纸底墨字，深色模式夜墨底宣纸色字。
- **深色模式卡片（card-dark）**：夜墨浮层底，宣纸色文字。

## Motion

动效模仿墨在纸上晕开，安静、缓慢、不弹跳。

- 出现：透明度从 0 到 1，同时向上移动 4px，时长 240ms，缓动曲线 ease-out。
- 消失：透明度从 1 到 0，时长 160ms。
- 不使用弹簧、缩放回弹、旋转、闪烁。
- 用户开启"减少动态效果"时，只保留透明度变化。

## Do's and Don'ts

- 用宣纸色或夜墨色的纯色背景，不用渐变、纹理图片或照片背景。
- 标志只用墨色或白色，不改颜色，不加立体、玻璃、发光、描边、投影效果。
- 朱砂只点在一个地方，不用于大面积背景或装饰。
- 文字以短句为主，一张卡片只讲一件事。
- 不使用 emoji，图标使用线性图标，线宽 1.5px，颜色 ink 或 ink-mid。
