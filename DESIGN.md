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
  vermilion-night: "#CE8572"
  success-night: "#8E9C8A"
  warning-night: "#B1936B"
  highlight: "#EACFBF"
  highlight-night: "#472925"
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
  mark-highlight:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  mark-highlight-dark:
    backgroundColor: "{colors.highlight-night}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.sm}"
  focus-ring:
    borderColor: "{colors.ink}"
    borderWidth: 2px
    offset: 4px
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
- **ink-light（#A49F97）**：只用于纯装饰、不传达信息的线条和图形（例如空状态的大图标）。它在宣纸底上的对比度只有 2.2:1，不能用于文字、占位符和有含义的图标；这些用 ink-mid。
- **ink-faint（#C9C2B7）**：分隔线、输入框边框。
- **night（#1E2022）/ night-raised（#2A2C2E）/ on-night（#EDE5D6）**：深色模式的背景、卡片与文字。
- **vermilion（#C8452D）/ vermilion-deep（#B83F29）**：唯一的强调色，只用于需要用户立即注意的单个元素，单个画面中的面积不超过 5%。不带文字的元素（印章、小圆点）用 vermilion；带文字的元素（待完成数量标记、误解标注）用 vermilion-deep，以保证宣纸色文字的对比度达到 WCAG AA（4.66:1）。
- **success（#4E6B58）/ warning（#8A5F27）**：判断结果的状态色，分别表示"已掌握"和"部分掌握"，只用于文字和小图标；"存在误解"使用 vermilion-deep。三者都是低饱和的墨调，与宣纸底色协调。
- **vermilion-night（#CE8572）/ success-night（#8E9C8A）/ warning-night（#B1936B）**：深色模式下的误解、已掌握、部分掌握。色相与浅色模式相同，提亮到在 night-raised 上对比度 ≥ 4.5:1。深色模式的提醒标记用 vermilion-night 底、night 色文字。
- **highlight（#EACFBF）/ highlight-night（#472925）**：划词高亮。实现时是叠在纸面上的半透明朱砂（浅色 16%，深色 24%），这里给出叠在 paper / night 上的效果色。文字颜色不变，对比度见 Accessibility。
- **primary / secondary / tertiary / neutral**：规范要求的语义色，分别等于 ink、ink-mid、vermilion-deep、paper。

## Color roles

每种颜色只做一件事。新增界面元素时先查这张表；表里没有的用途，不新增颜色。

| 颜色 | 只用于 | 例子 |
|---|---|---|
| ink / on-night | 正文、标题，以及系统说的话 | 章节正文、页面标题 |
| ink-mid | 次级文字、说明、有含义的图标 | 卡片上的一行说明、导航图标 |
| ink-light | 纯装饰的线条和图形 | 空状态的大图标 |
| ink-faint | 分隔线、输入框边框、进度条底 | 列表分隔线 |
| 墨底宣纸字（button-primary） | 一屏唯一的主操作 | 开始考察、提交作答 |
| vermilion / vermilion-deep | 需要立即注意的一处：待完成数量、误解、错误、印章 | 待完成数量标记、"存在误解" |
| highlight | 用户自己做的划词标记 | 高亮、带批注的高亮 |
| success / warning | 判断结果的文字和小图标 | "已掌握""部分掌握" |

- **含义不只靠颜色。** 错误、误解一定同时有文字或图标；"已掌握""部分掌握"一定有文字；色弱用户只看形状和文字也能读懂。
- **朱砂的 5% 面积限制**针对界面强调；划词高亮是用户自己的标记，不计入这 5%，但一屏的高亮由用户决定，界面不主动高亮。

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
- **划词标记（mark-highlight）**：阅读器里用户留下的标记，四种样式：
  - 高亮：highlight 底色，文字颜色不变，圆角 4px。
  - 带批注的高亮：高亮下方加一条 1px 朱砂虚线。
  - 问过 AI：不加底色，下方一条 1px ink-mid 点线。
  - 正在选中、尚未保存：ink 16% 的浅灰底，保存或取消后消失。
  - 标记必须是真实文字上的样式，不能是盖在文字上的图片或图层：可以选中、复制、搜索，屏幕阅读器照常朗读。
  - 文字换行时，标记逐行跟随，每行单独画，不画成一个跨行的大矩形。
  - 标记用半透明叠加，纸面底色透得出来，不用不透明的色块盖住纸面。

## States

每种状态都要在形状、线条或文字上有变化，不能只换颜色。

| 状态 | 变化 |
|---|---|
| 悬停 | 背景加深一档（按钮 ink-mid，文字按钮出现浅底），可点的文字出现下划线 |
| 按下 | 背景再加深一档；不缩放、不位移 |
| 焦点 | 2px ink 实线框，离元素 4px（focus-ring），只在键盘操作时出现；深色模式用 on-night |
| 选中 | 选项出现勾号，单选组和分段标签用浅底加加粗文字 |
| 不可用 | 不透明度 55%，鼠标指针不变成手形；旁边有文字说明为什么不可用 |
| 出错 | 输入框边框改 vermilion-deep，下方一行错误文字；不只把边框变红 |
| 加载 | 一条淡墨进度线，加一句说明在做什么 |

## Motion

动效模仿墨在纸上晕开，安静、缓慢、不弹跳。

- 出现：透明度从 0 到 1，同时向上移动 4px，时长 240ms，缓动曲线 ease-out。
- 消失：透明度从 1 到 0，时长 160ms。
- 不使用弹簧、缩放回弹、旋转、闪烁。
- 用户开启"减少动态效果"时，只保留透明度变化。
- **一个开关管全部。** 所有动画时长都写成 `calc(var(--motion-base) * var(--motion-scale))`，位移写成 `var(--motion-rise)`，不在组件里写死毫秒数。系统的"减少动态效果"和应用内的开关都只做一件事：把 `--motion-scale` 和 `--motion-rise` 设为 0。
- 动画结束时停在最后一帧（`animation-fill-mode: both`），时长为 0 时内容直接完整出现，不会停在一半。

## Accessibility

| 方面 | 要求 | 怎么检查 |
|---|---|---|
| 对比度 | 正文和标题 ≥ 7:1；其余文字（含状态色、提醒标记）≥ 4.5:1；不承载文字的界面元素（焦点框、印章）≥ 3:1。浅色、深色两套都要满足 | `node scripts/check-contrast.mjs`，任一组不达标即失败；新增颜色时把用途加进脚本 |
| 含义 | 颜色之外一定有文字、图标或形状 | 评审时用灰度截图看一遍 |
| 键盘 | 所有操作都能用键盘完成；单选组、分段标签用方向键在组内移动；Esc 关闭弹窗 | 评审时只用键盘走一遍主流程 |
| 焦点 | 每个可聚焦元素都有可见的焦点框，弹窗打开时焦点进入、关闭时回到原处 | 同上 |
| 点击范围 | 可点击区域不小于 28 × 28px，主按钮高度 44px；图形可以比点击区域小，不能比它大 | 评审时测量 |
| 动效 | 开启"减少动态效果"后没有位移，所有内容完整出现 | 打开系统设置后走一遍 |
| 屏幕阅读器 | 装饰性图形对屏幕阅读器隐藏；只有图标的按钮有文字名称；划词标记不改变朗读的文字 | macOS 旁白抽查 |

## Before you ship

新组件或新页面上线前，逐条回答：

1. 这一屏是否只突出一件"现在该做的事"，最多一个主按钮？
2. 用到的每种颜色，是否都在 Color roles 表里，并且用途一致？
3. 朱砂是否只点在一处（划词高亮除外）？
4. 去掉颜色（灰度截图），含义是否还能读懂？
5. 悬停、按下、焦点、不可用、出错，是否每种都有颜色以外的变化？
6. 只用键盘能否走完，焦点框是否始终可见？
7. 深色模式是否检查过，`node scripts/check-contrast.mjs` 是否通过？
8. 打开"减少动态效果"后，是否没有位移、没有停在一半的动画？
9. 有没有投影、渐变、纹理图片或 emoji？（都不应该有）
10. 文字是否都是短句，一张卡片是否只讲一件事？

## Do's and Don'ts

- 用宣纸色或夜墨色的纯色背景，不用渐变、纹理图片或照片背景。
- 标志只用墨色或白色，不改颜色，不加立体、玻璃、发光、描边、投影效果。
- 朱砂只点在一个地方，不用于大面积背景或装饰。
- 文字以短句为主，一张卡片只讲一件事。
- 不使用 emoji，图标使用线性图标，线宽 1.5px，颜色 ink 或 ink-mid。
