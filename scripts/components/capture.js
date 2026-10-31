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

  // 今天
  grab('page-head', '.page-head'); grab('calendar-stamp', '.calendar-stamp'); grab('section-heading', '.section-heading');
  grab('action-card', '.action-card'); grab('pending-row', '.pending-row'); grab('schedule-item', '.schedule-item');
  grab('number-tag', '.number-tag'); grab('nav-item-active', '.nav-item[aria-current]'); grab('nav-item', '.nav-item:not([aria-current])');
  grab('settings-nav', '.settings-nav'); grab('reading-mini', '.reading-mini'); grab('crumb', '.crumb');
  grab('claim-button', '[data-action=claim]'); grab('icon-button', '.icon-button'); grab('kbd', '.kbd');
  grab('text-button', '.text-button'); grab('primary', '.primary'); grab('mastery-row', '.mastery-row'); grab('status-dot', '.status-dot');

  // 菜单栏面板、内容库、空状态
  await click('[data-action=queue]', 300); grab('menu-panel', '.menu-panel');
  await click('[data-action=queue]', 200);
  await click('[data-nav=library]', 400); grab('tabs', '.tabs'); grab('library-row', '.library-row');
  await click('[data-action=filter]', 300, byText('已归档')); grab('empty', '.empty');

  // 导入对话框：三种表单（供标签切换）与网页链接校验失败
  const forms = {};
  await click('[data-action=import]', 400); grab('dialog-file', 'dialog[open]'); forms.file = $('#dialog-body').innerHTML;
  await click('[data-action=import-tab]', 300, byText('网页')); forms.web = $('#dialog-body').innerHTML;
  await click('dialog[open] [data-action=import-web]', 400); grab('dialog-web-error', 'dialog[open]');
  await click('[data-action=import-tab]', 300, byText('正文')); grab('dialog-text', 'dialog[open]'); forms.text = $('#dialog-body').innerHTML;
  await click('[data-action=close-modal]', 300);

  // 阅读器与知识点提取：逐个移除再恢复，记录每张知识点卡片的两种状态
  await click('[data-action=continue-reading]', 400);
  grab('toc', '.toc'); grab('reader-tools', '.reader-tools'); grab('reader-bottom', '.reader-bottom');
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

  // 考察
  await click('[data-nav=today]', 300);
  await click('[data-action=claim]', 120); grab('loading-game', '.loading-state');
  await sleep(2000); grab('assessment-top', '.assessment-top'); grab('game-options', '.game-options'); grab('step-track', '.step-track');
  grab('form-field-reason', '.form-field', el => el.querySelector('textarea')); grab('game-bottom-disabled', '.game-bottom');
  await click('[data-action=choose][data-index="1"]', 200);
  grab('game-options-selected', '.game-options'); grab('game-bottom', '.game-bottom');
  const check = $('.game-choice[aria-checked=true] .choice-check svg').outerHTML;

  // 反馈与异议
  for (let guard = 0; document.querySelector('[data-action=game-next]'); guard++) {
    if (guard >= 6) throw new Error('采集失败：考察超过 6 个情境仍未结束');
    const options = [...document.querySelectorAll('[data-action=choose]')];
    if (options.length && !options.some(o => o.getAttribute('aria-checked') === 'true')) options[0].click();
    await sleep(150); await click('[data-action=game-next]', 400);
  }
  grab('result-card', '.result-card'); grab('result-details', '.result-details');
  await click('[data-action=dispute]', 300); grab('dispute-dialog', 'dialog[open]');
  const reason = $('dialog[open] textarea');
  reason.value = '第二题的情境里，计划也会决定考察的时机';
  reason.dispatchEvent(new Event('input', { bubbles: true }));
  await click('dialog[open] [data-action=review-dispute]', 1800); grab('dispute-review', 'dialog[open]');
  await click('dialog[open] [data-action=close-modal]', 300);

  // 运行记录与设置
  await click('[data-nav=records]', 400); grab('log-row', '.log-row');
  await click('[data-nav=settings]', 400);
  grab('settings-section', '.settings-section'); grab('settings-row-switch', '.settings-row', el => el.querySelector('.switch'));
  await click('[data-action=save-config]', 300);
  grab('settings-section-error', '.settings-section', el => el.querySelector('.field-error'));
  grab('toast', '.toast');

  // 今天：安排理由
  await click('[data-nav=today]', 400);
  await click('[data-action=reason]', 400); grab('reason-dialog', 'dialog[open]');

  return { components: cap, demo: { check, knowledgePoints: points, importForms: forms } };
}
