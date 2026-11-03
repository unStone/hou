# Hou 厚

> 读厚，再读薄。Read it thick, then read it thin.

![Hou brand board](brand/board/hou-brand-board.png)

《厚》是一款正在设计中的 macOS 学习应用，名字取自华罗庚"先把书读厚，再把书读薄"。它以人为中心：在合适的时刻用钩子触发考察，由 LLM 判断理解程度、安排计划，帮助人把读过的书真正读厚，再提炼成自己的观点并输出。

本仓库目前包含产品方案、品牌物料、一套可以直接用于 Open Design 与 AI 编码工具的设计系统，以及统一阅读格式的独立包。应用代码尚未开始。

## 仓库内容

| 路径 | 内容 |
|---|---|
| `DESIGN.md` | 视觉规范：颜色、字体、间距、圆角、组件、动效与禁用规则，遵循 [DESIGN.md 规范](https://github.com/google-labs-code/design.md) |
| `tokens.css` | 与 DESIGN.md 一致的 CSS 变量，含浅色、深色与"减少动态效果"三套取值 |
| `manifest.json`、`USAGE.md`、`assets/`、`fonts/` | Open Design 设计系统包 |
| `docs/PRD.md` | 产品方案：目标、用户流程、功能设计、调研验证 |
| `brand/` | 品牌物料：图标、标志、横版组合、macOS 图标、网站图标、自媒体头像与封面、品牌规范板；总览页为 `brand/index.html`，说明见 `brand/brand-guidelines.md` |
| `prototype/` | 用 Open Design 制作的可交互原型（静态示例数据，未接入模型）；`prototype/components.html` 为通用组件总览，按浅色、深色和桌面、手机分别渲染，可直接点击操作。需通过本地服务器打开：在仓库根目录运行 `python3 -m http.server 5179`，访问 `http://localhost:5179/prototype/index.html` 或 `http://localhost:5179/prototype/components.html` |
| `packages/doc/` | 统一阅读格式：格式规范（`SPEC.md`）、校验、原文定位，以及网页、正文等来源的转换。独立于应用，可在桌面、浏览器和服务器运行；需要 Node 22.18 以上和 pnpm，在仓库根目录运行 `pnpm install` 后用 `pnpm test` 测试 |
| `scripts/` | 从图标母版重新生成标志与各类物料的脚本；`scripts/components/` 为通用组件总览的生成脚本 |

## 在 Open Design 中使用

1. 打开 Open Design，进入 **设置 → 设计系统 → 添加设计系统 → 从 GitHub 导入**。
2. 填入 `https://github.com/unStone/hou`，导入模式选择 **原样保留**。
3. 新建原型时选择设计系统 **Hou 厚**。

## 在 AI 编码工具中使用

把 `DESIGN.md` 与 `tokens.css` 放进你的项目根目录，或在提示中引用本仓库。界面颜色、字号与间距直接使用 `tokens.css` 中的变量。

## 重新生成物料

需要 ImageMagick 7（`magick` 命令）、Python 3 以及 `scripts/requirements.txt` 中的依赖（`pip install -r scripts/requirements.txt`）。

```bash
# 从 brand/icon/hou-icon-master.png 提取透明底标志、深色母版与 Icon Composer 图层
bash scripts/extract_mark.sh "$PWD"

# 用标志与思源宋体排版横版组合、分享图与自媒体封面
python3 -I scripts/brand_compose.py "$PWD"
```

两个脚本都会同步更新设计系统包中的 `assets/`。

## 重新生成通用组件总览

`prototype/components.html` 与 `prototype/components/data.js` 由脚本生成：在原型中采集各组件实际渲染出的 HTML，再逐个测量展示窗口高度。组件清单、用途与交互说明写在 `scripts/components/catalog.json`。修改原型或清单后，先在仓库根目录启动静态服务，再运行生成脚本（使用本机安装的 Google Chrome）：

```bash
python3 -m http.server 5179
```

```bash
python3 -I scripts/components/build.py http://localhost:5179
```

## 许可证

- 代码、设计系统取值与文档：[Apache License 2.0](LICENSE)。
- 名称"厚 / Hou"、图标、标志、横版组合、规范板与封面等品牌素材：**不在** Apache License 2.0 授权范围内，保留所有权利，详见 [TRADEMARKS.md](TRADEMARKS.md)。
- 思源宋体（Source Han Serif）：Adobe，[SIL Open Font License 1.1](fonts/LICENSE.txt)。
