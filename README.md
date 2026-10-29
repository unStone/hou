# Hou 厚

> 读厚，再读薄。Read it thick, then read it thin.

![Hou brand board](brand/board/hou-brand-board.png)

《厚》是一款正在设计中的 macOS 学习应用，名字取自华罗庚"先把书读厚，再把书读薄"。它以人为中心：在合适的时刻用钩子触发考察，由 LLM 判断理解程度、安排计划，帮助人把读过的书真正读厚，再提炼成自己的观点并输出。

本仓库目前包含产品方案、品牌物料和一套可以直接用于 Open Design 与 AI 编码工具的设计系统。应用代码尚未开始。

## 仓库内容

| 路径 | 内容 |
|---|---|
| `DESIGN.md` | 视觉规范：颜色、字体、间距、圆角、组件、动效与禁用规则，遵循 [DESIGN.md 规范](https://github.com/google-labs-code/design.md) |
| `tokens.css` | 与 DESIGN.md 一致的 CSS 变量，含浅色、深色与"减少动态效果"三套取值 |
| `manifest.json`、`USAGE.md`、`assets/`、`fonts/` | Open Design 设计系统包 |
| `docs/PRD.md` | 产品方案：目标、用户流程、功能设计、调研验证 |
| `brand/` | 品牌物料：图标、标志、横版组合、macOS 图标、网站图标、自媒体头像与封面、品牌规范板；总览页为 `brand/index.html`，说明见 `brand/brand-guidelines.md` |
| `scripts/` | 从图标母版重新生成标志与各类物料的脚本 |

## 在 Open Design 中使用

1. 打开 Open Design，进入 **设置 → 设计系统 → 添加设计系统 → 从 GitHub 导入**。
2. 填入 `https://github.com/unStone/hou`，导入模式选择 **原样保留**。
3. 新建原型时选择设计系统 **Hou 厚**。

## 在 AI 编码工具中使用

把 `DESIGN.md` 与 `tokens.css` 放进你的项目根目录，或在提示中引用本仓库。界面颜色、字号与间距直接使用 `tokens.css` 中的变量。

## 重新生成物料

需要 ImageMagick 7（`magick` 命令）以及 Python 3 与 Pillow。

```bash
# 从 brand/icon/hou-icon-master.png 提取透明底标志、深色母版与 Icon Composer 图层
bash scripts/extract_mark.sh "$PWD"

# 用标志与思源宋体排版横版组合、分享图与自媒体封面
python3 -I scripts/brand_compose.py "$PWD"
```

两个脚本都会同步更新设计系统包中的 `assets/`。

## 许可证

- 代码、设计系统取值与文档：[Apache License 2.0](LICENSE)。
- 名称"厚 / Hou"、图标、标志、横版组合、规范板与封面等品牌素材：**不在** Apache License 2.0 授权范围内，保留所有权利，详见 [TRADEMARKS.md](TRADEMARKS.md)。
- 思源宋体（Source Han Serif）：Adobe，[SIL Open Font License 1.1](fonts/LICENSE.txt)。
