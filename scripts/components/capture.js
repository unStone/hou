// 在原型首页逐页操作，采集各通用组件实际渲染出的 HTML；由 build.py 通过 Playwright 执行，返回采集结果
async () => {
  const cap = {};
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const $ = selector => {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`采集失败：找不到 ${selector}`);
    return el;
  };
  const grab = (label, selector, pick) => {
    const els = [...document.querySelectorAll(selector)];
    const el = pick ? els.find(pick) : els[0];
    if (!el) throw new Error(`采集失败：${label} 找不到 ${selector}`);
    cap[label] = el.outerHTML;
  };
  const click = async (selector, wait, pick) => {
    const els = [...document.querySelectorAll(selector)];
    const el = pick ? els.find(pick) : els[0];
    if (!el) throw new Error(`采集失败：找不到可点击的 ${selector}`);
    el.click();
    await sleep(wait);
  };
  const byText = text => el => el.textContent.includes(text);
  // 在阅读正文中选中一段文字，并像松开鼠标一样触发划词功能栏
  const selectText = async (paragraph, start, end) => {
    const node = $(`[data-paragraph="${paragraph}"]`).firstChild;
    const range = document.createRange();
    range.setStart(node, start); range.setEnd(node, end);
    getSelection().removeAllRanges(); getSelection().addRange(range);
    $('#reader-text').dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    await sleep(200);
  };
  // 划词功能栏在原型中按选区绝对定位；展示窗口里改为居中显示
  const grabToolbar = label => {
    cap[label] = $('#sel-toolbar').outerHTML.replace(/style="[^"]*"/, 'style="position:relative;top:0;left:50%;width:max-content"');
  };
  // 逐题作答直到结束：选择题选第一项，判断题另写理由，解释题和应用题写一句回答；遇到指定题型时采集
  const answerAll = async (grabs = {}) => {
    for (let guard = 0; document.querySelector('[data-action=game-next]'); guard++) {
      if (guard >= 8) throw new Error('采集失败：考察超过 8 题仍未结束');
      const type = [...document.querySelectorAll('.eyebrow')].map(el => el.textContent).find(text => text.includes('题 · '));
      for (const [name, label] of Object.entries(grabs)) if (type?.includes(name) && !cap[label]) grab(label, '.question');
      const options = [...document.querySelectorAll('[data-action=choose]')];
      if (options.length && !options.some(o => o.getAttribute('aria-checked') === 'true')) { options[0].click(); await sleep(150); }
      const textarea = document.querySelector('#explanation');
      if (textarea && (!options.length || type?.includes('判断'))) textarea.value = '用自己的话写下的回答。';
      await click('[data-action=game-next]', 400);
    }
  };

  // 今天
  grab('page-head', '.page-head'); grab('calendar-stamp', '.calendar-stamp'); grab('section-heading', '.section-heading');
  grab('action-card', '.action-card'); grab('pending-row', '.pending-row'); grab('schedule-item', '.schedule-item');
  grab('number-tag', '.number-tag'); grab('nav-item-active', '.nav-item[aria-current]'); grab('nav-item', '.nav-item:not([aria-current])');
  grab('settings-nav', '.settings-nav'); grab('reading-mini', '.reading-mini'); grab('crumb', '.crumb');
  grab('claim-button', '[data-action=claim]'); grab('icon-button', '.icon-button'); grab('kbd', '.kbd');
  grab('text-button', '.text-button'); grab('primary', '.primary'); grab('mastery-row', '.mastery-row'); grab('status-dot', '.status-dot');
  grab('slot-card', '.slot-card');

  // 还没有考察时的运行记录：空状态
  await click('[data-nav=records]', 400); grab('empty', '.empty');

  // 菜单栏面板、内容库（在读与归档）
  await click('[data-nav=today]', 300);
  await click('[data-action=queue]', 300); grab('menu-panel', '.menu-panel');
  await click('[data-action=queue]', 200);
  await click('[data-nav=library]', 400); grab('tabs', '.tabs'); grab('library-row', '.library-row');
  await click('[data-action=filter]', 300, byText('归档')); grab('library-row-archived', '.library-row');
  await click('[data-action=filter]', 300, byText('在读'));

  // 导入对话框：书和文章的在读名额都满时，显示名额已满
  const forms = {};
  await click('.page-head [data-action=import]', 400); grab('dialog-quota', 'dialog[open]'); forms.file = $('#dialog-body').innerHTML;
  await click('[data-action=close-modal]', 300);

  // 放弃在读的文章，空出文章名额
  await click('[data-action=book-menu][data-id=design]', 300);
  await click('dialog[open] [data-action=abandon]', 300); grab('abandon-dialog', 'dialog[open]');
  const abandonReason = $('#abandon-reason'); abandonReason.value = '内容已经在设计规范里看过。';
  await click('dialog[open] [data-action=abandon-confirm]', 400);
  await click('[data-nav=today]', 300); grab('slot-card-empty', '.slot-card.empty-slot');

  // 文章名额空出后，网页与正文表单可用
  await click('[data-nav=library]', 300);
  await click('.page-head [data-action=import]', 400);
  await click('[data-action=import-tab]', 300, byText('网页')); forms.web = $('#dialog-body').innerHTML;
  await click('dialog[open] [data-action=import-web]', 400); grab('dialog-web-error', 'dialog[open]');
  await click('[data-action=import-tab]', 300, byText('正文')); grab('dialog-text', 'dialog[open]'); forms.text = $('#dialog-body').innerHTML;
  await click('[data-action=close-modal]', 300);

  // 阅读器：阅读目标、划词功能栏、划词高亮、问 AI
  await click('[data-action=continue-reading]', 400);
  grab('toc', '.toc'); grab('reader-tools', '.reader-tools'); grab('reader-bottom', '.reader-bottom'); grab('goal-panel', '.goal-panel');
  await click('.goal-panel [data-action=goal]', 300); grab('goal-dialog', 'dialog[open]');
  await click('[data-action=close-modal]', 300);
  await selectText(1, 0, 12); grabToolbar('sel-toolbar');
  await click('[data-action=sel-highlight]', 300);
  $('mark.hl').dispatchEvent(new MouseEvent('mouseup', { bubbles: true })); await sleep(200); grabToolbar('sel-toolbar-mark');
  await click('[data-action=sel-ask]', 300);
  await click('[data-action=ask-preset]', 1000);
  // 问答栏在原型中贴在阅读器右侧、最大高度随窗口；展示窗口里按内容高度完整显示
  cap['ask-panel'] = $('.ask-panel').outerHTML.replace('<aside class="ask-panel"', '<aside class="ask-panel" style="position:relative;max-height:none"');
  await click('[data-action=ask-save]', 300);
  grab('reader-marks', '#reader-text'); grab('mark-list', '.mark-list');
  await click('[data-action=ask-close]', 300);

  // 知识点提取：逐个移除再恢复，记录每张知识点卡片的两种状态
  await click('[data-action=extract-start]', 150); grab('loading-extract', '.loading-state');
  await sleep(2500); grab('extraction-list', '.extraction-list'); grab('notice', '.notice');
  const points = [];
  const cards = () => [...document.querySelectorAll('.knowledge-card')];
  for (let i = 0; i < cards().length; i++) {
    const kept = cards()[i].innerHTML;
    cards()[i].querySelector('[data-action=toggle-point]').click(); await sleep(150);
    if (!cards()[i].classList.contains('removed')) throw new Error(`采集失败：第 ${i + 1} 个知识点没有进入已移除状态`);
    points.push({ kept, removed: cards()[i].innerHTML });
    cards()[i].querySelector('[data-action=toggle-point]').click(); await sleep(150);
  }
  await click('[data-action=toggle-point]', 200); grab('extraction-list-removed', '.extraction-list');
  await click('[data-action=confirm-extraction]', 400);

  // 考察：情境选择与用自己的话解释
  await click('[data-nav=today]', 300);
  await click('[data-action=claim]', 120); grab('loading-game', '.loading-state');
  await sleep(2000); grab('assessment-top', '.assessment-top'); grab('game-options', '.game-options'); grab('step-track', '.step-track');
  grab('form-field-reason', '.form-field', el => el.querySelector('textarea')); grab('game-bottom-disabled', '.game-bottom');
  grab('question-choice', '.question');
  await click('[data-action=choose][data-index="1"]', 200);
  grab('game-options-selected', '.game-options'); grab('game-bottom', '.game-bottom');
  const check = $('.game-choice[aria-checked=true] .choice-check svg').outerHTML;
  const typeGrabs = { 判断并说明理由: 'question-judge', 用自己的话解释: 'question-explain', 情境应用: 'question-apply' };
  await answerAll(typeGrabs);

  // 反馈与异议
  grab('result-card', '.result-card'); grab('result-details', '.result-details');
  grab('result-details-pending', '.result-details', byText('待模型判分'));
  await click('[data-action=dispute]', 300); grab('dispute-dialog', 'dialog[open]');
  const reason = $('dialog[open] textarea');
  reason.value = '第二题的情境里，计划也会决定考察的时机';
  reason.dispatchEvent(new Event('input', { bubbles: true }));
  await click('dialog[open] [data-action=review-dispute]', 1800); grab('dispute-review', 'dialog[open]');
  await click('dialog[open] [data-action=close-modal]', 300);

  // 其余题型：依次做几道示例考察（品牌规范含判断题，视觉规范含应用题，产品方案含解释题），直到四种题型都采集到
  for (const id of ['t5', 't2', 't1']) {
    if (Object.values(typeGrabs).every(label => cap[label])) break;
    Hou.start(id); await sleep(1500); await answerAll(typeGrabs);
  }
  for (const label of Object.values(typeGrabs)) if (!cap[label]) throw new Error(`采集失败：没有遇到 ${label}`);

  // 运行记录、回顾页
  await click('[data-nav=records]', 400); grab('log-row', '.log-row');
  await click('[data-nav=library]', 300); await click('[data-action=filter]', 300, byText('归档'));
  await click('[data-action=review][data-id=brand]', 400); grab('goal-summary', '.goal-summary');

  // 设置
  await click('[data-nav=settings]', 400);
  grab('settings-section', '.settings-section'); grab('settings-row-switch', '.settings-row', el => el.querySelector('.switch'));
  await click('[data-action=save-config]', 300);
  grab('settings-section-error', '.settings-section', el => el.querySelector('.field-error'));
  grab('toast', '.toast');

  // 今天：安排理由
  await click('[data-nav=today]', 400);
  await click('[data-action=reason]', 400); grab('reason-dialog', 'dialog[open]');
  await click('[data-action=close-modal]', 300);

  // 首次使用：清空本次会话，回到欢迎页（放在最后，之后不再采集其他页面）
  await click('[data-nav=settings]', 400);
  await click('[data-action=first-run-confirm]', 300); await click('dialog[open] [data-action=first-run]', 500);
  grab('welcome-steps', '.welcome-steps');

  return { components: cap, demo: { check, knowledgePoints: points, importForms: forms } };
}
