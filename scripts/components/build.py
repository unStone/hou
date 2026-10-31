"""生成通用组件总览：prototype/components.html 与 prototype/components/data.js。

流程：在原型中采集各组件实际渲染出的 HTML → 写出展示窗口数据 → 逐个打开展示窗口测量内容高度 → 写出目录页。
需要在仓库根目录先启动静态服务（python3 -m http.server 5179），再运行：
    python3 -I scripts/components/build.py http://localhost:5179
依赖见 scripts/requirements.txt；使用本机安装的 Google Chrome。
"""
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
PROTO = ROOT / "prototype"
DEVICES = [("desktop", "桌面", 1120), ("mobile", "手机", 390)]
THEMES = [("light", "浅色"), ("dark", "深色")]
SCENES = {None, "topbar", "sidebar", "dialog", "sheet", "toast"}

if len(sys.argv) != 2:
    raise SystemExit("用法：python3 -I scripts/components/build.py <静态服务地址，如 http://localhost:5179>")
BASE = sys.argv[1].rstrip("/")
catalog = json.loads((HERE / "catalog.json").read_text(encoding="utf-8"))
capture_script = (HERE / "capture.js").read_text(encoding="utf-8")


def fail_on_errors(page, errors):
    page.on("pageerror", lambda error: errors.append(f"{page.url}：{error}"))
    page.on("console", lambda msg: msg.type == "error" and errors.append(f"{page.url}：{msg.text}"))


def capture(browser):
    page = browser.new_page(viewport={"width": 1280, "height": 860})
    errors = []
    fail_on_errors(page, errors)
    page.goto(f"{BASE}/prototype/index.html")
    page.wait_for_function("window.Hou && document.querySelector('.main')")
    result = page.evaluate(capture_script)
    page.close()
    if errors:
        raise RuntimeError(f"原型运行出错：{errors}")
    return result


def build_variants(captured):
    variants, used = {}, set()
    for group in catalog["groups"]:
        for item in group["items"]:
            if item.get("scene") not in SCENES:
                raise ValueError(f"{item['id']} 的场景 {item.get('scene')} 未定义")
            for variant in item["variants"]:
                missing = [key for key in variant["keys"] if key not in captured]
                if missing:
                    raise KeyError(f"缺少组件采集结果：{item['id']} 的变体「{variant['label']}」需要 {missing}")
                used.update(variant["keys"])
                # 轻提示在原型中默认隐藏，展示窗口直接显示
                markup = "".join(re.sub(r'(<div class="toast"[^>]*?)\s+hidden=""', r"\1", captured[key]) for key in variant["keys"])
                variants["+".join(variant["keys"])] = {"html": markup, "scene": item.get("scene")}
    unused = sorted(set(captured) - used)
    if unused:
        raise ValueError(f"有采集结果未展示：{unused}")
    return variants


def write_data(variants, demo):
    (PROTO / "components").mkdir(exist_ok=True)
    (PROTO / "components" / "data.js").write_text(
        "// 由 scripts/components/build.py 生成：原型各通用组件实际渲染出的 HTML，以及展示窗口演示交互所需的原型数据\n"
        f"window.HOU_COMPONENTS = {json.dumps(variants, ensure_ascii=False, indent=1)};\n"
        f"window.HOU_DEMO = {json.dumps(demo, ensure_ascii=False, indent=1)};\n",
        encoding="utf-8",
    )


def frame_name(variant_id, theme, device):
    return f"{variant_id}--{theme}--{device}"


def frame_src(variant_id, theme, device):
    return f"components/frame.html?key={quote(variant_id, safe='')}&theme={theme}&frame={quote(frame_name(variant_id, theme, device), safe='')}"


def measure(browser, variants):
    heights = {}
    for device, _, width in DEVICES:
        page = browser.new_page(viewport={"width": width, "height": 900})
        errors = []
        fail_on_errors(page, errors)
        for variant_id in variants:
            for theme, _ in THEMES:
                page.goto(f"{BASE}/prototype/{frame_src(variant_id, theme, device)}")
                page.wait_for_function("window.houFrame && window.houFrame.ready")
                heights[frame_name(variant_id, theme, device)] = page.evaluate("document.fonts.ready.then(() => window.houFrame.height())")
        page.close()
        if errors:
            raise RuntimeError(f"展示窗口运行出错：{errors}")
    return heights


def card_html(item, heights):
    blocks = []
    for variant in item["variants"]:
        variant_id = "+".join(variant["keys"])
        cells = []
        for device, device_name, width in DEVICES:
            for theme, theme_name in THEMES:
                name = frame_name(variant_id, theme, device)
                title = f"{item['name']} {variant['label']} {theme_name}{device_name}"
                cells.append(
                    f'   <figure class="cmp-cell" data-theme-cell="{theme}" data-device-cell="{device}">'
                    f'<figcaption>{theme_name} · {device_name} {width}px</figcaption>'
                    f'<div class="cmp-viewport" data-width="{width}"><iframe title="{html.escape(title)}" data-frame="{html.escape(name)}" '
                    f'data-src="{html.escape(frame_src(variant_id, theme, device))}" width="{width}" height="{heights[name]}"></iframe></div></figure>'
                )
        blocks.append(
            f'  <div class="cmp-variant"><div class="cmp-variant-label">{html.escape(variant["label"])}</div>\n'
            f'  <div class="cmp-cells">\n' + "\n".join(cells) + "\n  </div></div>"
        )
    note = f'\n  <p class="cmp-interaction">说明：{html.escape(item["note"])}</p>' if item.get("note") else ""
    return (
        f'<article class="cmp-card" id="{item["id"]}">\n'
        f'  <header class="cmp-card-head"><span class="cmp-id">{item["id"]}</span><h3>{html.escape(item["name"])}</h3><p>{html.escape(item["usage"])}</p></header>\n'
        f'  <p class="cmp-interaction">可操作：{html.escape(item["interaction"])}</p>{note}\n'
        + "\n".join(blocks) + "\n</article>"
    )


def write_page(heights):
    links, groups = [], []
    for group in catalog["groups"]:
        cards = [card_html(item, heights) for item in group["items"]]
        links += [f'      <a href="#{item["id"]}">{item["id"]} {html.escape(item["name"])}</a>' for item in group["items"]]
        groups.append(f'<section class="cmp-group"><h2>{html.escape(group["name"])}</h2>\n' + "\n".join(cards) + "\n</section>")
    count = sum(len(group["items"]) for group in catalog["groups"])
    tabs = lambda kind, label, options: (
        f'      <div class="cmp-filter"><span id="cmp-{kind}-label">{label}</span><div class="tabs" role="tablist" aria-labelledby="cmp-{kind}-label">'
        + "".join(f'<button type="button" role="tab" data-show="{kind}" data-value="{value}">{text}</button>' for value, text in options)
        + "</div></div>"
    )
    page = f"""<!doctype html>
<!-- 由 scripts/components/build.py 生成，请修改生成脚本或 scripts/components/catalog.json 后重新生成 -->
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>通用组件 · 厚 Hou</title>
<link rel="icon" href="../brand/icon/hou-icon-master.png">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="components/gallery.css">
</head>
<body data-show-theme="all" data-show-device="all">
<div id="cmp-static-warning" hidden style="padding:16px 24px;background:#B83F29;color:#F3EADB;font:14px/1.7 -apple-system,'PingFang SC',sans-serif">
  这个页面引用了同目录的样式表和组件窗口，作为单个文件预览时无法加载。请在 hou 仓库根目录运行 <code>python3 -m http.server 5179</code>，再打开 <code>http://localhost:5179/prototype/components.html</code>。
</div>
<script>
  // 作为单文件预览（如 data: 地址）时同目录资源无法加载，样式表不存在，此时显示打开方式
  if (![...document.styleSheets].some(sheet => sheet.href && sheet.href.endsWith('/styles.css'))) document.getElementById('cmp-static-warning').hidden = false;
</script>
<div class="cmp-page">
  <aside class="cmp-index" aria-label="组件目录">
    <h1>通用组件</h1>
    <p>{html.escape(catalog["intro"])}</p>
    <details class="cmp-index-list"><summary>组件目录（{count}）</summary>
    <nav>
{chr(10).join(links)}
    </nav>
    </details>
  </aside>
  <div class="cmp-main">
    <div class="cmp-toolbar">
{tabs("theme", "外观", [("all", "全部"), ("light", "浅色"), ("dark", "深色")])}
{tabs("device", "设备", [("all", "全部"), ("desktop", "桌面"), ("mobile", "手机")])}
    </div>
    <main class="cmp-content">
{chr(10).join(groups)}
    </main>
  </div>
</div>
<script src="components/gallery.js"></script>
</body>
</html>
"""
    (PROTO / "components.html").write_text(page, encoding="utf-8")
    return count


with sync_playwright() as playwright:
    chrome = playwright.chromium.launch(channel="chrome")
    captured = capture(chrome)
    variants = build_variants(captured["components"])
    write_data(variants, captured["demo"])
    frame_heights = measure(chrome, variants)
    chrome.close()
total = write_page(frame_heights)
print(f"生成 components.html 与 components/data.js：{total} 个组件，{len(variants)} 种状态，{len(frame_heights)} 个展示窗口")
