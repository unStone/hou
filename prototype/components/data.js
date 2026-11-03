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
  "html": "<div class=\"reading-mini\"><div class=\"caption\">接着上次，慢慢读</div><button type=\"button\" data-action=\"continue-reading\" id=\"mini-title\" data-id=\"prd\">《厚》产品方案</button><div class=\"chapter-mini\" id=\"mini-chapter\">产品定位</div><div class=\"mini-track\" aria-hidden=\"true\"><span id=\"mini-progress\" style=\"width: 20%;\"></span></div></div>",
  "scene": "sidebar"
 },
 "crumb": {
  "html": "<div class=\"crumb\"><span>我的学习</span><svg class=\"od-icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg><span id=\"crumb-current\">今天</span></div>",
  "scene": null
 },
 "tabs": {
  "html": "<div class=\"tabs\" role=\"tablist\" aria-label=\"内容状态\"><button type=\"button\" class=\"\" data-action=\"filter\" data-value=\"active\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">在读</button><button type=\"button\" class=\"\" data-action=\"filter\" data-value=\"archived\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">归档</button></div>",
  "scene": null
 },
 "page-head": {
  "html": "<div class=\"page-head\"><div class=\"od-field\"><span class=\"eyebrow\">11 月 3 日 · 星期二</span><h1 tabindex=\"-1\">今天，读厚一点。</h1><p>留几分钟，看看读过的内容理解了多少。</p></div><div class=\"calendar-stamp od-stat\"><span class=\"day\">3</span><span class=\"month\">11 / 2026</span></div></div>",
  "scene": null
 },
 "calendar-stamp": {
  "html": "<div class=\"calendar-stamp od-stat\"><span class=\"day\">3</span><span class=\"month\">11 / 2026</span></div>",
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
  "html": "<article class=\"library-row\"><div class=\"document-symbol\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 2h7l4 4v12H5zM12 2v5h4M8 11h5m-5 3h5\"></path></svg></div><div class=\"od-fill\"><h2><button type=\"button\" class=\"pending-title\" data-action=\"read\" data-id=\"prd\">《厚》产品方案</button></h2><p>从阅读到考察，让理解持续生长。</p><div class=\"library-meta\"><span>书</span><span>5 个章节</span><span>已写阅读目标</span><span>阅读位置已记住</span></div></div><div class=\"row-actions\"><button type=\"button\" class=\"icon-button\" data-action=\"book-menu\" data-id=\"prd\" aria-label=\"管理《厚》产品方案\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"4\" cy=\"10\" r=\".7\"></circle><circle cx=\"10\" cy=\"10\" r=\".7\"></circle><circle cx=\"16\" cy=\"10\" r=\".7\"></circle></svg></button></div></article>",
  "scene": null
 },
 "library-row-archived": {
  "html": "<article class=\"library-row\"><div class=\"document-symbol\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 2h7l4 4v12H5zM12 2v5h4M8 11h5m-5 3h5\"></path></svg></div><div class=\"od-fill\"><h2><button type=\"button\" class=\"pending-title\" data-action=\"read\" data-id=\"brand\">《厚》品牌规范</button></h2><p>读薄：标志越克制越好认：只用墨色或白色，四周留足白。</p><div class=\"library-meta\"><span>书</span><span>2 个章节</span><span>读完 · 10 月 28 日</span><span>知识点继续复习</span></div></div><div class=\"row-actions\"><button type=\"button\" class=\"icon-button\" data-action=\"review\" data-id=\"brand\" aria-label=\"查看回顾：《厚》品牌规范\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button></div></article>",
  "scene": null
 },
 "log-row": {
  "html": "<article class=\"log-row\"><div class=\"log-date od-field\"><span>11/03</span><span>00:34</span></div><div class=\"od-fill\"><h3><button type=\"button\" class=\"pending-title\" data-action=\"log\" data-id=\"1463a376-0880-4c57-9ea0-7172fa32a1b2\">以行动为中心</button></h3><p>考察完成 · 未掌握</p><span class=\"caption\">从今天页开始 · 本地示例</span></div><div class=\"row-actions\"><button type=\"button\" class=\"icon-button\" data-action=\"log\" data-id=\"1463a376-0880-4c57-9ea0-7172fa32a1b2\" aria-label=\"查看运行记录\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div></article>",
  "scene": null
 },
 "mastery-row": {
  "html": "<div class=\"mastery-row\"><div class=\"od-fill od-field\"><button type=\"button\" class=\"pending-title\" data-action=\"book-detail\" data-id=\"prd\">《厚》产品方案</button><span class=\"caption\">2 个知识点，2 个与目标高度相关</span></div><div class=\"mastery-bars\" aria-label=\"掌握程度 3，能解释\"><i class=\"filled\"></i><i class=\"filled\"></i><i class=\"filled\"></i><i class=\"\"></i><i class=\"\"></i></div><span class=\"mastery-level\">能解释</span></div>",
  "scene": null
 },
 "extraction-list": {
  "html": "<div class=\"extraction-list\"><article class=\"knowledge-card \"><div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"移除知识点：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p>换一个情境，想想怎样让读者自然地开始一次考察。</p><div class=\"caption\">原文出处 · 产品定位</div><div class=\"relevance-row\"><div class=\"od-field\"><span class=\"caption\">直接对应“考察、判断、计划怎么配合”。</span></div><div class=\"rel-picker\" role=\"group\" aria-label=\"与目标的相关程度：以行动为中心\"><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"high\" aria-pressed=\"true\">高</button><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"mid\" aria-pressed=\"false\">中</button><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"low\" aria-pressed=\"false\">低</button></div></div></article></div>",
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
  "html": "<div class=\"form-field\"><label for=\"explanation\">你的理由（选填）</label><textarea id=\"explanation\" rows=\"3\" placeholder=\"为什么选这个？\"></textarea><span class=\"caption\">所选做法在本地按标准答案核对；理由不评分。</span></div>",
  "scene": null
 },
 "assessment-top": {
  "html": "<header class=\"assessment-top\"><div class=\"od-field\"><span class=\"serif\">厚 / 考察</span><span class=\"caption\">一屏只突出一件事 · 本地示例</span></div><button type=\"button\" class=\"text-button\" data-action=\"exit-game\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg>稍后再做</button></header>",
  "scene": null
 },
 "question-choice": {
  "html": "<div class=\"question\"><h1 tabindex=\"-1\">一个页面同时有阅读、考察和整理笔记。怎样组织更合适？</h1><p class=\"assessment-intro\">选出你认为最合适的做法。</p><div class=\"game-options\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"0\"><span class=\"choice-check\">A</span><span>三个同样突出的主按钮</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">B</span><span>用不同鲜艳颜色区分</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"2\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">C</span><span>只突出当前行动，其余退为次要</span></button></div><div class=\"form-field\"><label for=\"explanation\">你的理由（选填）</label><textarea id=\"explanation\" rows=\"3\" placeholder=\"为什么选这个？\"></textarea><span class=\"caption\">所选做法在本地按标准答案核对；理由不评分。</span></div></div>",
  "scene": null
 },
 "question-judge": {
  "html": "<div class=\"question\"><h1 tabindex=\"-1\">判断这个说法：为了在深色照片上更醒目，可以给标志加一圈白色描边。</h1><p class=\"assessment-intro\">先判断对错，再写一句理由。</p><div class=\"game-options two\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"0\"><span class=\"choice-check\">A</span><span>这个说法对</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">B</span><span>这个说法不对</span></button></div><div class=\"form-field\"><label for=\"explanation\">你的理由</label><textarea id=\"explanation\" rows=\"3\" placeholder=\"为什么对，或者为什么不对？\"></textarea><span class=\"caption\">对错在本地按标准答案核对；理由连接模型后按评分细则判分。</span></div></div>",
  "scene": null
 },
 "question-explain": {
  "html": "<div class=\"question\"><h1 tabindex=\"-1\">用自己的话解释：为什么《厚》以行动为中心，而不是以笔记为中心？</h1><p class=\"assessment-intro\">不看原文，用一两句话说清楚。</p><div class=\"form-field\"><label for=\"explanation\">你的回答</label><textarea id=\"explanation\" rows=\"5\" placeholder=\"用自己的话说……\"></textarea><span class=\"caption\">连接模型后按评分细则判分；原型只保存作答。</span></div></div>",
  "scene": null
 },
 "question-apply": {
  "html": "<div class=\"question\"><div class=\"scenario\"><span class=\"caption\">情境</span><p>你在设计《厚》的设置页：模型服务、外观、考察送达三组设置，每组都有一个“保存”按钮。</p></div><h1 tabindex=\"-1\">按照“一屏只突出一件事”，你会怎么调整这一页？为什么？</h1><p class=\"assessment-intro\">写出你会怎么做，以及为什么。</p><div class=\"form-field\"><label for=\"explanation\">你的回答</label><textarea id=\"explanation\" rows=\"5\" placeholder=\"我会……因为……\"></textarea><span class=\"caption\">连接模型后按评分细则判分；原型只保存作答。</span></div></div>",
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
  "html": "<div class=\"step-track\" aria-hidden=\"true\"><i class=\"active\"></i><i class=\"\"></i><i class=\"\"></i></div>",
  "scene": null
 },
 "game-options+game-bottom-disabled": {
  "html": "<div class=\"game-options\" role=\"radiogroup\" aria-label=\"你的选择\"><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"0\" role=\"radio\" aria-checked=\"false\" tabindex=\"0\"><span class=\"choice-check\">A</span><span>三个同样突出的主按钮</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"1\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">B</span><span>用不同鲜艳颜色区分</span></button><button type=\"button\" class=\"game-choice\" data-action=\"choose\" data-index=\"2\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\"><span class=\"choice-check\">C</span><span>只突出当前行动，其余退为次要</span></button></div><div class=\"game-bottom\"><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span><span class=\"caption choice-hint\" id=\"choice-hint\">先选一个，才能继续</span><button type=\"button\" class=\"primary\" data-action=\"game-next\" disabled=\"\" aria-describedby=\"choice-hint\">下一题</button></div>",
  "scene": null
 },
 "game-bottom": {
  "html": "<div class=\"game-bottom\"><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span><button type=\"button\" class=\"primary\" data-action=\"game-next\">下一题</button></div>",
  "scene": null
 },
 "result-card": {
  "html": "<div class=\"result-card\"><div class=\"result-label\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg><span>存在误解</span></div><h2>一屏只突出一件事</h2><div class=\"od-row gap-16\"><div class=\"mastery-bars\" aria-label=\"掌握程度 1，未掌握\"><i class=\"filled\"></i><i class=\"\"></i><i class=\"\"></i><i class=\"\"></i><i class=\"\"></i></div><span>未掌握</span></div><p class=\"footnote\">本地核对：0 / 2 道客观题符合原文。另有 1 道主观题待模型按评分细则判分，判分后再更新掌握程度。</p></div>",
  "scene": null
 },
 "result-details": {
  "html": "<section class=\"result-details\"><div class=\"od-row spaced\"><h3>第 1 题 · 情境选择 · 需要再想一想</h3><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg></div><p class=\"muted\">一个页面同时有阅读、考察和整理笔记。怎样组织更合适？</p><p>一屏突出一件现在该做的事，通过留白和层次保持焦点。</p><div class=\"answer-comparison\"><div class=\"od-field\"><span class=\"caption\">你的选择</span><p>用不同鲜艳颜色区分</p></div><div class=\"od-field\"><span class=\"caption\">原文支持的选择</span><p>只突出当前行动，其余退为次要</p></div></div></section>",
  "scene": null
 },
 "result-details-pending": {
  "html": "<section class=\"result-details\"><div class=\"od-row spaced\"><h3>第 3 题 · 情境应用 · 待模型判分</h3><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 6v4l3 2\"></path></svg></div><p class=\"muted\">按照“一屏只突出一件事”，你会怎么调整这一页？为什么？</p><div class=\"answer-comparison\"><div class=\"od-field\"><span class=\"caption\">你的回答</span><p>用自己的话写下的回答。</p></div><div class=\"od-field\"><span class=\"caption\">参考答案</span><p>只保留一个主按钮，或改为即时生效、去掉多余的保存按钮；用分组标题和留白区分三组，不用颜色和投影强调。</p></div></div><div class=\"rubric\"><span class=\"caption\">评分细则</span><ul><li>指出一屏有多个主按钮的问题</li><li>给出只保留一个主按钮或即时生效的做法</li><li>用留白、层次而不是装饰来区分分组</li></ul></div></section>",
  "scene": null
 },
 "loading-game": {
  "html": "<div class=\"loading-state\"><div class=\"eyebrow\">为一次理解，准备几道题</div><h1 tabindex=\"-1\">正在准备考察…</h1><div class=\"loading-line\"></div><p class=\"muted\">正在载入本地示例，未向模型发送请求。</p><span class=\"caption\">Hou 视觉规范 · 界面与注意力</span></div>",
  "scene": null
 },
 "loading-extract": {
  "html": "<div class=\"loading-state\"><h2>正在整理知识点…</h2><div class=\"loading-line\"></div><p class=\"muted\">原文位置会与知识点一起保留。</p></div>",
  "scene": null
 },
 "empty": {
  "html": "<div class=\"empty\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 4h5a3 3 0 0 1 3 3v10a4 4 0 0 0-3-1H3zm14 0h-3a3 3 0 0 0-3 3v10a4 4 0 0 1 3-1h3z\"></path></svg><h2>还没有运行记录</h2><p>完成一次考察后，触发原因与作答会一起留在这里。</p><button type=\"button\" class=\"secondary\" data-action=\"today\">回到今天</button></div>",
  "scene": null
 },
 "notice": {
  "html": "<div class=\"notice\">以下为本地示例提取，已按与阅读目标的相关程度排序。相关程度可以修改；可以移除不想考察的知识点，其余会保留。</div>",
  "scene": null
 },
 "toast": {
  "html": "<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"><span id=\"toast-text\">未保留知识点，本章节已标记读完。</span><button type=\"button\" data-action=\"close-toast\" aria-label=\"关闭提示\"><svg class=\"od-icon\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div>",
  "scene": "toast"
 },
 "menu-panel": {
  "html": "<section class=\"menu-panel\" id=\"queue-body\" role=\"dialog\" aria-modal=\"true\" aria-label=\"菜单栏待完成列表\"><div class=\"od-row spaced\"><h2>待完成的考察</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-panel\" aria-label=\"关闭待完成面板\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"caption\" style=\"margin-top:8px\">有空的时候，做一件就好。</p><div class=\"pending-row\"><span class=\"row-index\">01</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t1\">以行动为中心</button><span class=\"pending-source\">《厚》产品方案 · 产品定位</span></div><span class=\"row-duration\">约 3 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t1\" aria-label=\"开始考察：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><div class=\"pending-row\"><span class=\"row-index\">02</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t2\">一屏只突出一件事</button><span class=\"pending-source\">Hou 视觉规范 · 界面与注意力</span></div><span class=\"row-duration\">约 2 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t2\" aria-label=\"开始考察：一屏只突出一件事\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><div class=\"pending-row\"><span class=\"row-index\">03</span><div class=\"od-fill od-field\"><button class=\"pending-title\" type=\"button\" data-action=\"start\" data-id=\"t3\">用固定题型考察理解</button><span class=\"pending-source\">《厚》产品方案 · 考察题型</span></div><span class=\"row-duration\">约 4 分钟</span><button type=\"button\" class=\"icon-button\" data-action=\"start\" data-id=\"t3\" aria-label=\"开始考察：用固定题型考察理解\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m7 5 5 5-5 5\"></path></svg></button></div><button type=\"button\" class=\"primary\" data-action=\"claim\">主动领取一项 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button><p class=\"footnote\">菜单栏面板的页面内预览</p></section>",
  "scene": "sheet"
 },
 "dialog-quota": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"quota-block\"><span class=\"caption\">书的在读名额 · 1 / 1</span><h3>《厚》产品方案 · 还没读完</h3><p class=\"muted\">没有待读列表：导入就是开始读。先把这本读完，或者写下理由放弃，才能导入新的书。</p><div class=\"form-actions\"><button type=\"button\" class=\"text-button\" data-action=\"abandon\" data-id=\"prd\">放弃这本</button><button type=\"button\" class=\"primary\" data-action=\"quota-read\" data-id=\"prd\">继续读 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button></div></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div></div></dialog>",
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
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>为什么是这个安排？</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><h3>以行动为中心</h3><p class=\"footnote\">今天 · 20:00 · 理解 · 约 3 分钟</p><p style=\"margin-top:24px\">依据本地可判的题目先安排；主观题判分后再调整。</p><div class=\"notice\" style=\"margin-top:24px\">这是预设的示例安排，真实计划器尚未连接。</div><div class=\"form-actions\"><button type=\"button\" class=\"secondary\" data-action=\"modal-delay\" data-id=\"t1\">调整时间</button></div></div></dialog>",
  "scene": "dialog"
 },
 "slot-card": {
  "html": "<article class=\"slot-card\"><span class=\"caption\">书 · 第 1 / 5 章</span><h3><button type=\"button\" class=\"pending-title\" data-action=\"read\" data-id=\"prd\">《厚》产品方案</button></h3><p class=\"slot-goal\"><span class=\"caption\">想学会</span>考察、判断、计划、题型</p><div class=\"slot-track\" aria-hidden=\"true\"><span style=\"width:20%\"></span></div></article>",
  "scene": null
 },
 "slot-card-empty": {
  "html": "<article class=\"slot-card empty-slot\"><span class=\"caption\">文章 · 空着</span><h3>读完了，可以开始下一篇。</h3><p class=\"caption\">网页 / 正文</p><button type=\"button\" class=\"secondary\" data-action=\"import-kind\" data-value=\"article\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 4v12M4 10h12\"></path></svg>导入一篇文章</button></article>",
  "scene": null
 },
 "goal-panel": {
  "html": "<details class=\"goal-panel\"><summary><span>阅读目标</span><span class=\"caption\">考察、判断、计划、题型</span></summary><dl class=\"goal-lines\"><div><dt>想得到什么</dt><dd>弄清楚《厚》要解决什么问题，能讲清楚考察、判断、计划怎么配合。</dd></div><div><dt>想学会哪些内容</dt><dd>考察、判断、计划、题型</dd></div></dl><button type=\"button\" class=\"inline-link\" data-action=\"goal\" data-id=\"prd\">修改目标</button></details>",
  "scene": null
 },
 "goal-dialog": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>阅读目标</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"muted\">想清楚要从这本书里拿走什么，知识点会按目标排序，考察也会从目标场景出题。可以只写一项。</p><div class=\"form-field\"><label for=\"goal-gain\">想从这本书得到什么</label><textarea id=\"goal-gain\" rows=\"2\" placeholder=\"例如：弄清楚好界面背后的原则，能说出为什么好。\">弄清楚《厚》要解决什么问题，能讲清楚考察、判断、计划怎么配合。</textarea></div><div class=\"form-field\"><label for=\"goal-learn\">想学会哪些内容</label><textarea id=\"goal-learn\" rows=\"2\" placeholder=\"例如：信息层次、留白、一屏只突出一件事\">考察、判断、计划、题型</textarea><span class=\"caption\">用顿号或逗号分开。</span></div><p id=\"goal-error\" class=\"field-error\" role=\"alert\" hidden=\"\"></p><div class=\"form-actions\"><button type=\"button\" class=\"text-button\" data-action=\"close-modal\">取消</button><button type=\"button\" class=\"primary\" data-action=\"save-goal\" data-id=\"prd\" data-first=\"false\">保存目标</button></div></div></dialog>",
  "scene": "dialog"
 },
 "abandon-dialog": {
  "html": "<dialog id=\"dialog\" aria-label=\"操作面板\" open=\"\"><div id=\"dialog-body\"><div class=\"dialog-header\"><h2>放弃这篇？</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p class=\"archive-name\">Hou 视觉规范</p><p class=\"muted\">放弃后归档，标记为“未读完”，空出文章的在读名额。归档后不能再继续读，只能回看；已提取的知识点按“旧书复习”设置处理。</p><div class=\"form-field\"><label for=\"abandon-reason\">为什么不读了</label><textarea id=\"abandon-reason\" rows=\"3\" placeholder=\"例如：内容和我的目标关系不大。\"></textarea><span class=\"caption\">必填。理由会一直留在归档里。</span></div><p id=\"abandon-error\" class=\"field-error\" role=\"alert\" hidden=\"\"></p><div class=\"form-actions\"><button type=\"button\" class=\"text-button\" data-action=\"close-modal\">继续读</button><button type=\"button\" class=\"primary\" data-action=\"abandon-confirm\" data-id=\"design\">确认放弃</button></div></div></dialog>",
  "scene": "dialog"
 },
 "goal-summary": {
  "html": "<section class=\"goal-summary\"><h2>当初的阅读目标</h2><dl class=\"goal-lines\"><div><dt>想得到什么</dt><dd>知道标志在什么场合怎么用。</dd></div><div><dt>想学会哪些内容</dt><dd>标志、留白</dd></div></dl></section>",
  "scene": null
 },
 "toc": {
  "html": "<aside class=\"toc\" aria-label=\"章节目录\"><div class=\"toc-title\">目录 · 5 章</div><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"0\" aria-current=\"true\"><span class=\"muted\">01</span><span>产品定位</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"1\" aria-current=\"false\"><span class=\"muted\">02</span><span>导入与阅读</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"2\" aria-current=\"false\"><span class=\"muted\">03</span><span>考察与判断</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"3\" aria-current=\"false\"><span class=\"muted\">04</span><span>考察题型</span></button><button type=\"button\" class=\"\" data-action=\"chapter\" data-index=\"4\" aria-current=\"false\"><span class=\"muted\">05</span><span>异常与恢复</span></button><div class=\"caption\">Hou · 产品文档<br>正文来自项目原始文档</div></aside>",
  "scene": null
 },
 "reader-tools": {
  "html": "<div class=\"reader-tools\"><button type=\"button\" class=\"text-button\" data-action=\"annotation\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h12v11l-4 4H4zm7 15v-5h5M7 7h6M7 10h3\"></path></svg>写本章批注</button><span class=\"caption od-row\">选中文字，可以高亮、批注或问 AI</span></div>",
  "scene": null
 },
 "reader-bottom": {
  "html": "<div class=\"reader-bottom\"><span class=\"caption\">第 1 / 5 章 · 阅读位置自动保留</span><button type=\"button\" class=\"primary\" data-action=\"extract-start\">标记读完 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 10 4 4 8-8\"></path></svg></button></div>",
  "scene": null
 },
 "sel-toolbar": {
  "html": "<div class=\"sel-toolbar\" id=\"sel-toolbar\" role=\"toolbar\" aria-label=\"划词工具\" style=\"position:relative;top:0;left:50%;width:max-content\"><button type=\"button\" class=\"\" data-action=\"sel-highlight\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 13 8-9 4 4-8 9H4zm6-7 4 4M3 19h14\"></path></svg><span>高亮</span></button><button type=\"button\" class=\"\" data-action=\"sel-note\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h12v11l-4 4H4zm7 15v-5h5M7 7h6M7 10h3\"></path></svg><span>批注</span></button><button type=\"button\" class=\"\" data-action=\"sel-ask\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg><span>问 AI</span></button><button type=\"button\" class=\"\" data-action=\"sel-copy\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 2h7l4 4v12H5zM12 2v5h4M8 11h5m-5 3h5\"></path></svg><span>复制</span></button></div>",
  "scene": null
 },
 "sel-toolbar-mark": {
  "html": "<div class=\"sel-toolbar\" id=\"sel-toolbar\" role=\"toolbar\" aria-label=\"划词工具\" style=\"position:relative;top:0;left:50%;width:max-content\"><button type=\"button\" class=\"\" data-action=\"sel-unmark\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg><span>取消高亮</span></button><button type=\"button\" class=\"\" data-action=\"sel-note\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 3h12v11l-4 4H4zm7 15v-5h5M7 7h6M7 10h3\"></path></svg><span>批注</span></button><button type=\"button\" class=\"\" data-action=\"sel-ask\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"></circle><path d=\"M10 9v5m0-8v1\"></path></svg><span>问 AI</span></button><button type=\"button\" class=\"\" data-action=\"sel-copy\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 2h7l4 4v12H5zM12 2v5h4M8 11h5m-5 3h5\"></path></svg><span>复制</span></button></div>",
  "scene": null
 },
 "reader-marks": {
  "html": "<div class=\"reader-text\" id=\"reader-text\"><p data-paragraph=\"0\" class=\"\">以 AI 为引擎、以行动为中心的 macOS 学习应用。钩子在合适的时刻触发，LLM 通过考察、判断、计划三种能力，持续检测并提升用户对所学内容的理解。笔记作为知识来源留在背后，只在被引用时出现。</p><p data-paragraph=\"1\" class=\"\"><mark class=\"hl has-note\" data-mark=\"06186de0-7b7f-40a1-b569-2c403492f214\">考察：检测用户最近所学内</mark>容的理解是否到位，按理解、应用、分析、评价、创造逐级出题，每次换角度。考察由模型生成结构化的考察题，用固定的题型呈现。</p><p data-paragraph=\"2\" class=\"\">判断：根据作答识别掌握程度和具体误解；判断当前时刻是否应该打扰用户。</p><p data-paragraph=\"3\" class=\"\">计划：根据判断结果安排重讲、加练或推进，并决定下一次考察的时机。</p></div>",
  "scene": null
 },
 "mark-list": {
  "html": "<section class=\"mark-list\" aria-label=\"本章划线\"><div class=\"caption\">本章划线 · 1</div><div class=\"mark-item\"><button type=\"button\" class=\"mark-quote\" data-action=\"goto-mark\" data-id=\"06186de0-7b7f-40a1-b569-2c403492f214\">考察：检测用户最近所学内</button><p>问：解释这段\n答：这段出自「产品定位」。它所在的段落是：“考察：检测用户最近所学内容的理解是否到位，按理解、应用、分析、评价、创造逐级出题，每次换角度。考察由模型生成结构化的考察题，用固定的题型呈现。” 真实回答会由模型用更直白的话重述这段，并说明它在本章里起什么作用。</p></div></section>",
  "scene": null
 },
 "ask-panel": {
  "html": "<aside class=\"ask-panel\" style=\"position:relative;max-height:none\" aria-label=\"问 AI\"><div class=\"od-row spaced\"><h2>问 AI</h2><button type=\"button\" class=\"icon-button\" data-action=\"ask-close\" aria-label=\"关闭问答\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><blockquote class=\"ask-quote\">考察：检测用户最近所学内</blockquote><div class=\"ask-log\" id=\"ask-log\"><p class=\"ask-q\">解释这段</p><div class=\"ask-a\"><p>这段出自「产品定位」。它所在的段落是：“考察：检测用户最近所学内容的理解是否到位，按理解、应用、分析、评价、创造逐级出题，每次换角度。考察由模型生成结构化的考察题，用固定的题型呈现。” 真实回答会由模型用更直白的话重述这段，并说明它在本章里起什么作用。</p><div class=\"od-row spaced\"><span class=\"caption\">本地示例回答 · 未连接模型</span><button type=\"button\" class=\"inline-link\" data-action=\"ask-save\" data-index=\"1\">存为批注</button></div></div></div><div class=\"ask-presets\"><button type=\"button\" class=\"tag-button\" data-action=\"ask-preset\" data-value=\"解释这段\">解释这段</button><button type=\"button\" class=\"tag-button\" data-action=\"ask-preset\" data-value=\"举个例子\">举个例子</button><button type=\"button\" class=\"tag-button\" data-action=\"ask-preset\" data-value=\"和我的阅读目标有什么关系\">和我的阅读目标有什么关系</button></div><div class=\"form-field\"><label class=\"sr-only\" for=\"ask-input\">你的问题</label><textarea id=\"ask-input\" rows=\"2\" placeholder=\"继续问，回车发送\"></textarea></div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"ask-send\">发送 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button></div><p class=\"footnote\">回答以本书原文为依据。原型不发送模型请求。</p></aside>",
  "scene": null
 },
 "welcome-steps": {
  "html": "<ol class=\"welcome-steps\"><li class=\"welcome-step\"><span class=\"step-no\">1</span><div class=\"od-fill\"><h2>配置模型服务</h2><p class=\"muted\">提取知识点、出题和判分需要模型。可以先跳过：引导自带知识点和考察题，不需要模型。</p><div class=\"od-row gap-16\"><button type=\"button\" class=\"secondary\" data-action=\"welcome-config\">去配置</button><button type=\"button\" class=\"text-button\" data-action=\"welcome-skip-config\">先跳过</button></div></div></li>\n  <li class=\"welcome-step\"><span class=\"step-no\">2</span><div class=\"od-fill\"><h2>读一篇引导</h2><p class=\"muted\">《怎样用厚》是你的第一篇在读文章。顺着读下去，会把划词、标记读完、考察、回顾都用一遍，大约十分钟。</p><button type=\"button\" class=\"primary\" data-action=\"open-guide\">开始读引导 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button></div></li></ol>",
  "scene": null
 }
};
window.HOU_DEMO = {
 "check": "<svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m4 10 4 4 8-8\"></path></svg>",
 "knowledgePoints": [
  {
   "kept": "<div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"移除知识点：以行动为中心\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><p>换一个情境，想想怎样让读者自然地开始一次考察。</p><div class=\"caption\">原文出处 · 产品定位</div><div class=\"relevance-row\"><div class=\"od-field\"><span class=\"caption\">直接对应“考察、判断、计划怎么配合”。</span></div><div class=\"rel-picker\" role=\"group\" aria-label=\"与目标的相关程度：以行动为中心\"><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"high\" aria-pressed=\"true\">高</button><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"mid\" aria-pressed=\"false\">中</button><button type=\"button\" class=\"\" data-action=\"set-relevance\" data-index=\"0\" data-value=\"low\" aria-pressed=\"false\">低</button></div></div>",
   "removed": "<div class=\"od-row spaced\"><h3>以行动为中心</h3><button type=\"button\" class=\"icon-button\" data-action=\"toggle-point\" data-index=\"0\" aria-label=\"恢复知识点：以行动为中心\">恢复</button></div><p>已移除，不会加入考察。</p>"
  }
 ],
 "importForms": {
  "file": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"quota-block\"><span class=\"caption\">书的在读名额 · 1 / 1</span><h3>《厚》产品方案 · 还没读完</h3><p class=\"muted\">没有待读列表：导入就是开始读。先把这本读完，或者写下理由放弃，才能导入新的书。</p><div class=\"form-actions\"><button type=\"button\" class=\"text-button\" data-action=\"abandon\" data-id=\"prd\">放弃这本</button><button type=\"button\" class=\"primary\" data-action=\"quota-read\" data-id=\"prd\">继续读 <svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10h12m-5-5 5 5-5 5\"></path></svg></button></div></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>",
  "web": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">正文</button></div><div class=\"form-field\"><label for=\"import-url\">网页链接</label><input id=\"import-url\" type=\"url\" placeholder=\"https://…\"></div><p class=\"caption\">原型不抓取外部网页。尝试导入后可以改为粘贴正文。</p><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-web\">导入网页</button></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>",
  "text": "<div class=\"dialog-header\"><h2>导入内容</h2><button type=\"button\" class=\"icon-button\" data-action=\"close-modal\" aria-label=\"关闭\"><svg class=\"od-icon icon \" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m5 5 10 10M5 15 15 5\"></path></svg></button></div><div class=\"tabs\" role=\"tablist\" aria-label=\"导入方式\"><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"file\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">文件</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"web\" role=\"tab\" aria-selected=\"false\" tabindex=\"-1\">网页</button><button type=\"button\" class=\"\" data-action=\"import-tab\" data-value=\"text\" role=\"tab\" aria-selected=\"true\" tabindex=\"0\">正文</button></div><div class=\"form-field\"><label for=\"import-title\">内容标题</label><input id=\"import-title\" placeholder=\"为这份内容起一个名字\" maxlength=\"120\"></div><div class=\"form-field\"><label for=\"import-text\">正文</label><textarea id=\"import-text\" placeholder=\"粘贴你准备阅读的正文…\" rows=\"8\"></textarea><span class=\"caption\">整篇作为一个章节保留，仅用于当前会话。</span></div><div class=\"form-actions\"><button type=\"button\" class=\"primary\" data-action=\"import-text\">导入并阅读</button></div><div id=\"import-error\" class=\"error\" role=\"alert\" hidden=\"\"></div>"
 }
};
