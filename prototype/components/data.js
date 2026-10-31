// 由 scripts/components/build.py 生成：原型各通用组件实际渲染出的 HTML，以及展示窗口演示交互所需的原型数据
window.HOU_COMPONENTS = {
 "primary": {
  "html": "<button type=\"button\" class=\"primary\" data-action=\"start\" data-id=\"t1\">开始考察 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 15 15 5M5 5h10v10\"></path></svg></button>",
  "scene": null
 },
 "claim-button": {
  "html": "<button type=\"button\" class=\"quiet\" data-action=\"claim\" aria-label=\"主动领取一次考察\"><span class=\"claim-text\">领取考察</span><span class=\"kbd shortcut-label\">⌘ ⇧ H</span><svg class=\"od-icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M10 4v12M4 10h12\"></path></svg></button>",
  "scene": "topbar"
 },
 "text-button": {
  "html": "<button type=\"button\" class=\"text-button\" data-action=\"delay\" data-id=\"t1\">稍后再做</button>",
  "scene": null
 },
 "icon-button": {
  "html": "<button type=\"button\" class=\"icon-button panel-trigger\" data-action=\"queue\" id=\"queue-button\" aria-label=\"查看菜单栏待完成列表\" aria-expanded=\"false\" aria-controls=\"queue-body\"><svg class=\"od-icon icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 14h12l-2-3V8a4 4 0 0 0-8 0v3zm4 3h4\"></path></svg><span class=\"count\" id=\"queue-count\">3</span></button>",
  "scene": "topbar"
 },
 "kbd": {
  "html": "<span class=\"kbd shortcut-label\">⌘ ⇧ H</span>",
  "scene": null
 },
 "number-tag": {
  "html": "<span class=\"number-tag\">3</span>",
  "scene": null
 },
 "status-dot": {
  "html": "<span class=\"status-dot\"></span>",
  "scene": null
 },
 "nav-item-active+nav-item": {
  "html": "<button type=\"button\" class=\"nav-item\" data-action=\"today\" data-nav=\"today\" id=\"home-nav\" aria-current=\"page\"><svg class=\"od-icon icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"14\" height=\"12\" rx=\"2\"></rect><path d=\"M6 3v4m8-4v4M3 9h14m-10 4h2\"></path></svg><span>今天</span><span class=\"nav-count\" id=\"nav-count\">03</span></button><button type=\"button\" class=\"nav-item\" data-action=\"library\" data-nav=\"library\"><svg class=\"od-icon icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 4h5a3 3 0 0 1 3 3v10a4 4 0 0 0-3-1H3zm14 0h-3a3 3 0 0 0-3 3v10a4 4 0 0 1 3-1h3z\"></path></svg><span>内容库</span></button>",
  "scene": "sidebar"
 },
 "settings-nav": {
  "html": "<button type=\"button\" class=\"settings-nav\" data-action=\"toggle-theme\"><span id=\"theme-glyph\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M16 12a7 7 0 0 1-9-9 7 7 0 1 0 9 9Z\"></path></svg></span><span class=\"nav-text\" id=\"theme-label\">深色外观</span><span class=\"sr-only\">切换外观</span></button>",
  "scene": "sidebar"
 },
 "reading-mini": {
  "html": "<div class=\"reading-mini\"><div class=\"caption\">接着上次，慢慢读</div><button type=\"button\" data-action=\"continue-reading\" id=\"mini-title\">《厚》产品方案</button><div class=\"chapter-mini\" id=\"mini-chapter\">产品定位</div><div class=\"mini-track\" aria-hidden=\"true\"><span id=\"mini-progress\" style=\"width: 20%;\"></span></div></div>",
  "scene": "sidebar"
 },
 "crumb": {
  "html": "<div class=\"crumb\"><span>我的学习</span><svg class=\"od-icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg><span id=\"crumb-current\">今天</span></div>",
  "scene": null
 },
 "tabs": {
  "html": "<div class=\"tabs\" role=\"tablist\" aria-label=\"内容状态\"><button type=\"button\" class=\"\" data-action=\"filter\" data-value=\"active\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">阅读中</button><button type=\"button\" class=\"\" data-action=\"filter\" data-value=\"archived\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">已归档</button></div>",
  "scene": null
 },
 "page-head": {
  "html": "<div class=\"page-head\"><div class=\"od-field\"><span class=\"eyebrow\">10 月 31 日 · 星期六</span><h1 tabindex=\"-1\">今天，读厚一点。</h1><p>留几分钟，看看读过的内容理解了多少。</p></div><div class=\"calendar-stamp od-stat\"><span class=\"day\">31</span><span class=\"month\">10 / 2026</span></div></div>",
  "scene": null
 },
 "calendar-stamp": {
  "html": "<div class=\"calendar-stamp od-stat\"><span class=\"day\">31</span><span class=\"month\">10 / 2026</span></div>",
  "scene": null
 },
 "section-heading": {
  "html": "<div class=\"section-heading\"><h2>待完成的考察<span class=\"number-tag\">3</span></h2><span class=\"section-meta\">不必一次做完</span></div>",
  "scene": null
 },
 "action-card": {
  "html": "<article class=\"action-card\"><span class=\"caption\"><span class=\"status-dot\"></span>现在可以做的一件事<span>·</span>约 3 分钟</span><h2>把理解，放进一个新情境。</h2><p>换一个情境，想想怎样让读者自然地开始一次考察。</p><div class=\"source-line\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 4h5a3 3 0 0 1 3 3v10a4 4 0 0 0-3-1H3zm14 0h-3a3 3 0 0 0-3 3v10a4 4 0 0 1 3-1h3z\"></path></svg><span>《厚》产品方案 · 产品定位</span></div><div class=\"action-footer\"><button type=\"button\" class=\"primary\" data-action=\"start\" data-id=\"t1\">开始考察 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 15 15 5M5 5h10v10\"></path></svg></button><button type=\"button\" class=\"text-button\" data-action=\"delay\" data-id=\"t1\">稍后再做</button><span class=\"action-index\">理解 · 01 / 03</span></div></article>",
  "scene": null
 },
 "pending-row": {
  "html": "<div class=\"pending-row\"><span class=\"row-index\">02</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t2\">一屏只突出一件事</button><span class=\"pending-source\">Hou 视觉规范 · 界面与注意力</span></div><span class=\"row-duration\">约 2 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t2\" aria-label=\"开始考察：一屏只突出一件事\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div>",
  "scene": null
 },
 "schedule-item": {
  "html": "<div class=\"schedule-item\"><div class=\"schedule-time od-row\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 6v4l3 2\"></path></svg>明天 · 09:30</div><h3>用层次代替装饰</h3><div class=\"caption\">Hou 视觉规范 · 理解 · 3 分钟</div><button type=\"button\" class=\"\" data-action=\"reason\" data-id=\"t4\">为什么安排在这时？</button></div>",
  "scene": null
 },
 "library-row": {
  "html": "<article class=\"library-row\"><div class=\"document-symbol\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 2h7l4 4v12H5zM12 2v5h4M8 11h5m-5 3h5\"></path></svg></div><div class=\"od-fill\"><h2><button type=\"button\" class=\"pending-title\" data-action=\"read\" data-id=\"prd\">《厚》产品方案</button></h2><p>从阅读到考察，让理解持续生长。</p><div class=\"library-meta\"><span>Markdown</span><span>5 个章节</span><span>阅读位置已记住</span></div></div><div class=\"row-actions\"><button type=\"button\" class=\"icon-button\" data-action=\"book-menu\" data-id=\"prd\" aria-label=\"管理《厚》产品方案\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"4\" cy=\"10\" r=\".7\"></circle><circle cx=\"10\" cy=\"10\" r=\".7\"></circle><circle cx=\"16\" cy=\"10\" r=\".7\"></circle></svg></button></div></article>",
  "scene": null
 },
 "log-row": {
  "html": "<article class=\"log-row\"><div class=\"log-date od-field\"><span>10/31</span><span>09:37</span></div><div class=\"od-fill\"><h3><button type=\"button\" class=\"pending-title\" data-action=\"log\" data-id=\"9058e924-d0bc-4bf5-917f-49a381f9e591\">一屏只突出一件事</button></h3><p>考察完成 · 未掌握</p><span class=\"caption\">主动领取 · 本地示例</span></div><div class=\"row-actions\"><button type=\"button\" class=\"icon-button\" data-action=\"log\" data-id=\"9058e924-d0bc-4bf5-917f-49a381f9e591\" aria-label=\"查看运行记录\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div></article>",
  "scene": null
 },
 "mastery-row": {
  "html": "<div class=\"mastery-row\"><div class=\"od-fill od-field\"><button type=\"button\" class=\"pending-title\" data-action=\"book-detail\" data-id=\"prd\">《厚》产品方案</button><span class=\"caption\">2 个知识点</span></div><div class=\"mastery-bars\" aria-label=\"掌握程度 3，能解释\"><i class=\"filled\"></i><i class=\"filled\"></i><i class=\"filled\"></i><i class=\"\"></i><i class=\"\"></i></div><span class=\"mastery-level\">能解释</span></div>",
  "scene": null
 },
 "extraction-list": {
  "html": "<div class=\"extraction-list\"><article class=\"knowledge-card \"><div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"移除知识点：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p>换一个情境，想想怎样让读者自然地开始一次考察。</p><div class=\"caption\">原文出处 · 产品定位</div></article></div>",
  "scene": null
 },
 "extraction-list-removed": {
  "html": "<div class=\"extraction-list\"><article class=\"knowledge-card removed\"><div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"恢复知识点：以行动为中心\">恢复</button></div><p>已移除，不会加入考察。</p></article></div>",
  "scene": null
 },
 "settings-section": {
  "html": "<section class=\"settings-section\"><div class=\"section-heading\"><h2>模型服务</h2><span class=\"tag\">未连接</span></div><div class=\"notice\">原型不发送模型请求。可以填写配置体验表单；密钥仅保留在当前页面内存中，刷新后清除。</div><div class=\"form-field\"><label for=\"model-url\">服务地址</label><input id=\"model-url\" type=\"url\" value=\"\" placeholder=\"https://your-provider.example/v1\" autocomplete=\"off\"></div><div class=\"form-cols\"><div class=\"form-field\"><label for=\"model-name\">模型名称</label><input id=\"model-name\" value=\"\" placeholder=\"填写服务商提供的模型名\" autocomplete=\"off\"></div><div class=\"form-field\"><label for=\"model-key\">API 密钥</label><input id=\"model-key\" type=\"password\" placeholder=\"本次会话内暂存\" autocomplete=\"new-password\" value=\"\"></div></div><p id=\"config-error\" class=\"field-error\" role=\"alert\" hidden=\"\"></p><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"save-config\">保存配置</button></div></section>",
  "scene": null
 },
 "settings-section-error": {
  "html": "<section class=\"settings-section\"><div class=\"section-heading\"><h2>模型服务</h2><span class=\"tag\">未连接</span></div><div class=\"notice\">原型不发送模型请求。可以填写配置体验表单；密钥仅保留在当前页面内存中，刷新后清除。</div><div class=\"form-field\"><label for=\"model-url\">服务地址</label><input id=\"model-url\" type=\"url\" value=\"\" placeholder=\"https://your-provider.example/v1\" autocomplete=\"off\"></div><div class=\"form-cols\"><div class=\"form-field\"><label for=\"model-name\">模型名称</label><input id=\"model-name\" value=\"\" placeholder=\"填写服务商提供的模型名\" autocomplete=\"off\"></div><div class=\"form-field\"><label for=\"model-key\">API 密钥</label><input id=\"model-key\" type=\"password\" placeholder=\"本次会话内暂存\" autocomplete=\"new-password\" value=\"\"></div></div><p id=\"config-error\" class=\"field-error\" role=\"alert\">请填写完整的模型服务地址。</p><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"save-config\">保存配置</button></div></section>",
  "scene": null
 },
 "settings-row-switch": {
  "html": "<div class=\"settings-row\"><div class=\"od-field\"><span>减少动态效果</span><span class=\"caption\">仅保留状态变化，不使用位移动效</span></div><button type=\"button\" class=\"switch\" data-action=\"reduce-motion\" role=\"switch\" aria-label=\"减少动态效果\" aria-checked=\"false\"><span></span></button></div>",
  "scene": null
 },
 "form-field-reason": {
  "html": "<div class=\"form-field\"><label for=\"explanation\">你的判断理由（选填）</label><textarea id=\"explanation\" placeholder=\"这个选择，怎样帮助用户理解内容？\"></textarea><span class=\"caption\">本地示例只核对所选选项；文字理由会保留，不作语义评分。</span></div>",
  "scene": null
 },
 "assessment-top": {
  "html": "<header class=\"assessment-top\"><div class=\"od-field\"><span class=\"serif\">厚 / 考察</span><span class=\"caption\">一屏只突出一件事 · 本地示例</span></div><button type=\"button\" class=\"text-button\" data-action=\"exit-game\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg>稍后再做</button></header>",
  "scene": null
 },
 "game-options": {
  "html": "<div class=\"game-options\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"0\"><span class=\"choice-check\">A</span><span>三个同样突出的主按钮</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">B</span><span>用不同鲜艳颜色区分</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"2\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">C</span><span>只突出当前行动，其余退为次要</span></button></div>",
  "scene": null
 },
 "game-options-selected": {
  "html": "<div class=\"game-options\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">A</span><span>三个同样突出的主按钮</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"true\" tabindex=\"0\"><span class=\"choice-check\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 10 4 4 8-8\"></path></svg></span><span>用不同鲜艳颜色区分</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"2\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">C</span><span>只突出当前行动，其余退为次要</span></button></div>",
  "scene": null
 },
 "step-track": {
  "html": "<div class=\"step-track\" aria-hidden=\"true\"><i class=\"active\"></i><i class=\"\"></i></div>",
  "scene": null
 },
 "game-options+game-bottom-disabled": {
  "html": "<div class=\"game-options\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"0\"><span class=\"choice-check\">A</span><span>三个同样突出的主按钮</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">B</span><span>用不同鲜艳颜色区分</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"2\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">C</span><span>只突出当前行动，其余退为次要</span></button></div><div class=\"game-bottom\"><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span><span class=\"caption choice-hint\" id=\"choice-hint\">先选择一个做法，才能继续</span><button type=\"button\" class=\"primary\" data-action=\"game-next\" disabled=\"\" aria-describedby=\"choice-hint\">下一个情境</button></div>",
  "scene": null
 },
 "game-bottom": {
  "html": "<div class=\"game-bottom\"><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span><button type=\"button\" class=\"primary\" data-action=\"game-next\">下一个情境</button></div>",
  "scene": null
 },
 "result-card": {
  "html": "<div class=\"result-card\"><div class=\"result-label\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg><span>存在误解</span></div><h2>一屏只突出一件事</h2><div class=\"od-row gap-16\"><div class=\"mastery-bars\" aria-label=\"掌握程度 1，未掌握\"><i class=\"filled\"></i><i class=\"\"></i><i class=\"\"></i><i class=\"\"></i><i class=\"\"></i></div><span>未掌握</span></div><p class=\"footnote\">本地规则核对：0 / 2 项选择符合原文。此示例仅检测识别，不推断解释、应用或迁移能力。</p></div>",
  "scene": null
 },
 "result-details": {
  "html": "<section class=\"result-details\"><div class=\"od-row spaced\"><h3>情境 1 · 需要再想一想</h3><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg></div><p>一屏突出一件现在该做的事，通过留白和层次保持焦点。</p><div class=\"answer-comparison\"><div class=\"od-field\"><span class=\"caption\">你的选择</span><p>用不同鲜艳颜色区分</p></div><div class=\"od-field\"><span class=\"caption\">原文支持的选择</span><p>只突出当前行动，其余退为次要</p></div></div></section>",
  "scene": null
 },
 "loading-game": {
  "html": "<div class=\"loading-state\"><div class=\"eyebrow\">为一次理解，准备一个情境</div><h1 tabindex=\"-1\">正在准备考察…</h1><div class=\"loading-line\"></div><p class=\"muted\">正在载入本地示例，未向模型发送请求。</p><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span></div>",
  "scene": null
 },
 "loading-extract": {
  "html": "<div class=\"loading-state\"><h2>正在整理知识点…</h2><div class=\"loading-line\"></div><p class=\"muted\">原文位置会与知识点一起保留。</p></div>",
  "scene": null
 },
 "empty": {
  "html": "<div class=\"empty\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 4h5a3 3 0 0 1 3 3v10a4 4 0 0 0-3-1H3zm14 0h-3a3 3 0 0 0-3 3v10a4 4 0 0 1 3-1h3z\"></path></svg><h2>还没有归档的内容</h2><p>归档会停止相关考察，并保留历史记录。</p></div>",
  "scene": null
 },
 "notice": {
  "html": "<div class=\"notice\">以下为本地示例提取。可以移除不想考察的知识点，其余会保留。</div>",
  "scene": null
 },
 "toast": {
  "html": "<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"><span id=\"toast-text\">未保留知识点，本章节已标记读完。</span><button type=\"button\" data-action=\"close-toast\" aria-label=\"关闭提示\"><svg class=\"od-icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div>",
  "scene": "toast"
 },
 "menu-panel": {
  "html": "<section class=\"menu-panel\" id=\"queue-body\" role=\"dialog\" aria-modal=\"true\" aria-label=\"菜单栏待完成列表\"><div class=\"od-row spaced\"><h2>待完成的考察</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-panel\" aria-label=\"关闭待完成面板\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"caption\" style=\"margin-top:8px\">有空的时候，做一件就好。</p><div class=\"pending-row\"><span class=\"row-index\">01</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t1\">以行动为中心</button><span class=\"pending-source\">《厚》产品方案 · 产品定位</span></div><span class=\"row-duration\">约 3 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t1\" aria-label=\"开始考察：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><div class=\"pending-row\"><span class=\"row-index\">02</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t2\">一屏只突出一件事</button><span class=\"pending-source\">Hou 视觉规范 · 界面与注意力</span></div><span class=\"row-duration\">约 2 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t2\" aria-label=\"开始考察：一屏只突出一件事\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><div class=\"pending-row\"><span class=\"row-index\">03</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t3\">让游戏真正考察知识</button><span class=\"pending-source\">《厚》产品方案 · 考察小游戏的约束</span></div><span class=\"row-duration\">约 4 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t3\" aria-label=\"开始考察：让游戏真正考察知识\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><button type=\"button\" class=\"primary\" data-action=\"claim\">主动领取一项 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button><p class=\"footnote\">菜单栏面板的页面内预览</p></section>",
  "scene": "sheet"
 },
 "dialog-file": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"dropzone\" id=\"dropzone\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 13V3M6 7l4-4 4 4M3 13v4h14v-4\"></path></svg><div class=\"od-field\"><strong>拖入一本书，慢慢读。</strong><span class=\"caption\">PDF / EPUB</span></div><input id=\"file-input\" class=\"sr-only\" type=\"file\" accept=\".pdf,.epub\" aria-describedby=\"file-note\"><label for=\"file-input\" class=\"secondary\">选择本地文件</label></div><p class=\"caption\" id=\"file-note\">当前原型未接入 PDF / EPUB 正文解析。选择文件可查看导入状态；使用“正文”可完整体验阅读流程。</p><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div></div></dialog>",
  "scene": "dialog"
 },
 "dialog-web-error": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"form-field\"><label for=\"import-url\">网页链接</label><input id=\"import-url\" type=\"url\" placeholder=\"https://…\"></div><p class=\"caption\">原型不抓取外部网页。尝试导入后可以改为粘贴正文。</p><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-web\">导入网页</button></div><div id=\"import-error\" class=\"error\" role=\"alert\">请填写完整的网页链接，例如 https://example.com/article。</div></div></dialog>",
  "scene": "dialog"
 },
 "dialog-text": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">正文</button></div><div class=\"form-field\"><label for=\"import-title\">内容标题</label><input id=\"import-title\" placeholder=\"为这份内容起一个名字\" maxlength=\"120\"></div><div class=\"form-field\"><label for=\"import-text\">正文</label><textarea id=\"import-text\" placeholder=\"粘贴你准备阅读的正文…\" rows=\"8\"></textarea><span class=\"caption\">整篇作为一个章节保留，仅用于当前会话。</span></div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-text\">导入并阅读</button></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div></div></dialog>",
  "scene": "dialog"
 },
 "dispute-dialog": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>说说你的不同理解</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"muted\">可以指出评分依据的问题。原示例结果会保留。</p><div class=\"form-field\"><label for=\"dispute-reason\">异议理由</label><textarea id=\"dispute-reason\" placeholder=\"你认为哪一处判断需要重新考虑？\"></textarea></div><p id=\"dispute-error\" class=\"field-error\" role=\"alert\" hidden=\"\"></p><div class=\"notice\">真实复核需要模型服务。这里可以体验一次示例复核及采用自己结论的流程。</div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"review-dispute\">查看示例复核</button></div></div></dialog>",
  "scene": "dialog"
 },
 "dispute-review": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>说说你的不同理解</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"muted\">可以指出评分依据的问题。原示例结果会保留。</p><div class=\"form-field\"><label for=\"dispute-reason\">异议理由</label><textarea id=\"dispute-reason\" placeholder=\"你认为哪一处判断需要重新考虑？\">第二题的情境里，计划也会决定考察的时机</textarea></div><p id=\"dispute-error\" class=\"field-error\" role=\"alert\" hidden=\"\"></p><div class=\"review-note\">示例复核保留原结论。此处未运行模型；你仍可以自己的结论为准。</div><div class=\"segmented-label\">你的结论</div><div class=\"level-picker\" role=\"group\" aria-label=\"你的掌握程度\"><button type=\"button\" class=\"\" data-action=\"pick-level\" data-index=\"1\" aria-pressed=\"true\">未掌握</button><button type=\"button\" class=\"\" data-action=\"pick-level\" data-index=\"2\" aria-pressed=\"false\">能识别</button><button type=\"button\" class=\"\" data-action=\"pick-level\" data-index=\"3\" aria-pressed=\"false\">能解释</button><button type=\"button\" class=\"\" data-action=\"pick-level\" data-index=\"4\" aria-pressed=\"false\">能应用</button><button type=\"button\" class=\"\" data-action=\"pick-level\" data-index=\"5\" aria-pressed=\"false\">能迁移</button></div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"override-result\">采用我的结论</button></div></div></dialog>",
  "scene": "dialog"
 },
 "reason-dialog": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>为什么是这个安排？</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><h3>一屏只突出一件事</h3><p class=\"footnote\">今天 · 20:00 · 应用 · 约 2 分钟</p><p style=\"margin-top:24px\">依据本地示例选择结果，先巩固识别，再进入新的情境。</p><div class=\"notice\" style=\"margin-top:24px\">这是预设的示例安排，真实计划器尚未连接。</div><div class=\"form-actions\"><button type=\"button\" class=\"secondary\" data-action=\"modal-delay\" data-id=\"t2\">调整时间</button></div></div></dialog>",
  "scene": "dialog"
 },
 "toc": {
  "html": "<aside class=\"toc\" aria-label=\"章节目录\"><div class=\"toc-title\">目录 · 5 章</div><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"0\" aria-current=\"true\"><span class=\"muted\">01</span><span>产品定位</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"1\" aria-current=\"false\"><span class=\"muted\">02</span><span>导入与阅读</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"2\" aria-current=\"false\"><span class=\"muted\">03</span><span>考察与判断</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"3\" aria-current=\"false\"><span class=\"muted\">04</span><span>考察小游戏的约束</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"4\" aria-current=\"false\"><span class=\"muted\">05</span><span>异常与恢复</span></button><div class=\"caption\">Hou · 产品文档<br>正文来自项目原始文档</div></aside>",
  "scene": null
 },
 "reader-tools": {
  "html": "<div class=\"reader-tools\"><button type=\"button\" class=\"secondary\" data-action=\"highlight\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 13 8-9 4 4-8 9H4zm6-7 4 4M3 19h14\"></path></svg>高亮段落</button><button type=\"button\" class=\"text-button\" data-action=\"annotation\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h12v11l-4 4H4zm7 15v-5h5M7 7h6M7 10h3\"></path></svg>添加批注</button><span class=\"caption od-row\">选中一段原文后高亮</span></div>",
  "scene": null
 },
 "reader-bottom": {
  "html": "<div class=\"reader-bottom\"><span class=\"caption\">第 1 / 5 章 · 阅读位置自动保留</span><button type=\"button\" class=\"primary\" data-action=\"extract-start\">标记读完 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 10 4 4 8-8\"></path></svg></button></div>",
  "scene": null
 }
};
window.HOU_DEMO = {
 "check": "<svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 10 4 4 8-8\"></path></svg>",
 "knowledgePoints": [
  {
   "kept": "<div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"移除知识点：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p>换一个情境，想想怎样让读者自然地开始一次考察。</p><div class=\"caption\">原文出处 · 产品定位</div>",
   "removed": "<div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"恢复知识点：以行动为中心\">恢复</button></div><p>已移除，不会加入考察。</p>"
  }
 ],
 "importForms": {
  "file": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"dropzone\" id=\"dropzone\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 13V3M6 7l4-4 4 4M3 13v4h14v-4\"></path></svg><div class=\"od-field\"><strong>拖入一本书，慢慢读。</strong><span class=\"caption\">PDF / EPUB</span></div><input id=\"file-input\" class=\"sr-only\" type=\"file\" accept=\".pdf,.epub\" aria-describedby=\"file-note\"><label for=\"file-input\" class=\"secondary\">选择本地文件</label></div><p class=\"caption\" id=\"file-note\">当前原型未接入 PDF / EPUB 正文解析。选择文件可查看导入状态；使用“正文”可完整体验阅读流程。</p><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>",
  "web": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"form-field\"><label for=\"import-url\">网页链接</label><input id=\"import-url\" type=\"url\" placeholder=\"https://…\"></div><p class=\"caption\">原型不抓取外部网页。尝试导入后可以改为粘贴正文。</p><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-web\">导入网页</button></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>",
  "text": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">正文</button></div><div class=\"form-field\"><label for=\"import-title\">内容标题</label><input id=\"import-title\" placeholder=\"为这份内容起一个名字\" maxlength=\"120\"></div><div class=\"form-field\"><label for=\"import-text\">正文</label><textarea id=\"import-text\" placeholder=\"粘贴你准备阅读的正文…\" rows=\"8\"></textarea><span class=\"caption\">整篇作为一个章节保留，仅用于当前会话。</span></div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-text\">导入并阅读</button></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>"
 }
};
