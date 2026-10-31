// 组件展示窗口：渲染一个组件变体，只模拟组件自身的状态变化（选中、开关、标签、移除恢复、关闭与重新显示）；业务按钮只提示、不执行
(() => {
  const params = new URLSearchParams(location.search);
  const key = params.get('key');
  const frame = params.get('frame');
  const item = window.HOU_COMPONENTS?.[key];
  const demo = window.HOU_DEMO;
  if (!item || !demo) throw new Error(`找不到组件 ${key}`);
  if (!getComputedStyle(document.documentElement).getPropertyValue('--paper')) throw new Error('样式表 styles.css 未加载');

  document.documentElement.dataset.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
  const stage = document.getElementById('stage');
  const note = document.getElementById('demo-note');

  // 场景：给组件补上它在原型里所处的容器，浮层组件带上遮罩，样式与动画才与原型一致
  const scenes = {
    topbar: html => `<div class="top-actions">${html}</div>`,
    sidebar: html => `<div class="sidebar cmp-sidebar"><nav>${html}</nav></div>`,
    dialog: html => `<div class="cmp-backdrop">${html}</div>`,
    sheet: html => `<div class="sheet-overlay">${html}</div>`,
    toast: html => html,
  };
  if (item.scene && !scenes[item.scene]) throw new Error(`未定义的场景：${item.scene}`);
  stage.innerHTML = item.scene ? scenes[item.scene](item.html) : item.html;
  stage.querySelectorAll('[data-action=toggle-point]').forEach(button => {
    if (!demo.knowledgePoints[button.dataset.index]) throw new Error(`缺少第 ${button.dataset.index} 个知识点的采集内容`);
  });

  // fixed 定位的元素不占文档流，按它们的实际尺寸撑开舞台，展示窗口才放得下：
  // 菜单栏面板（手机弹层上方留出遮罩）、轻提示，以及手机上贴底的主按钮（原型页面用底部留白避让，这里同样留出）
  const fitFixedLayer = () => {
    const bars = [...stage.querySelectorAll('.primary')].filter(el => getComputedStyle(el).position === 'fixed');
    stage.style.paddingBottom = bars.length ? `${24 + Math.max(...bars.map(el => el.offsetHeight))}px` : '';
    const sheet = stage.querySelector('.sheet-overlay:not([hidden])');
    const toast = stage.querySelector('.toast:not([hidden])');
    if (sheet) {
      const style = getComputedStyle(sheet);
      stage.style.minHeight = `${sheet.querySelector('.menu-panel').offsetHeight + Math.max(parseFloat(style.paddingTop), 96) + parseFloat(style.paddingBottom)}px`;
    }
    if (toast) stage.style.minHeight = `${toast.offsetHeight + parseFloat(getComputedStyle(toast).bottom) + 24}px`;
  };
  const fixedLayer = stage.querySelector('.sheet-overlay .menu-panel, .toast');
  if (fixedLayer) new ResizeObserver(fitFixedLayer).observe(fixedLayer);
  addEventListener('resize', fitFixedLayer);
  fitFixedLayer();

  // 关闭类操作：按 DESIGN.md 淡出 160ms 后隐藏，并提供"重新显示"以重放入场动画；淡出期间重复关闭不再排队
  const closeLayer = (layer, hide, show) => {
    if (layer.dataset.leaving) return;
    layer.dataset.leaving = 'true';
    setTimeout(() => {
      delete layer.dataset.leaving;
      hide();
      const replay = document.createElement('button');
      replay.type = 'button';
      replay.className = 'text-button cmp-replay';
      replay.textContent = '重新显示';
      replay.addEventListener('click', () => { replay.remove(); show(); });
      stage.appendChild(replay);
      replay.focus();
    }, 160);
  };
  const closeDialog = () => {
    const backdrop = stage.querySelector('.cmp-backdrop'), dialog = backdrop.querySelector('dialog');
    closeLayer(backdrop,
      () => { backdrop.hidden = true; dialog.removeAttribute('open'); },
      () => { backdrop.hidden = false; dialog.setAttribute('open', ''); dialog.querySelector('input,textarea,button').focus(); });
  };
  const closeSheet = () => {
    const overlay = stage.querySelector('.sheet-overlay');
    closeLayer(overlay, () => { overlay.hidden = true; }, () => { overlay.hidden = false; overlay.querySelector('button').focus(); });
  };
  const closeToast = () => {
    const toast = stage.querySelector('.toast');
    closeLayer(toast, () => { toast.hidden = true; }, () => { toast.hidden = false; });
  };

  // 业务按钮：提示在原型中会执行操作，避免被当成无响应
  let noteTimer = null;
  const showNote = button => {
    const name = (button.getAttribute('aria-label') || button.textContent).trim().replace(/\s+/g, ' ');
    note.textContent = `演示窗口：“${name}”在原型中会执行操作，这里不执行`;
    clearTimeout(noteTimer);
    delete note.dataset.leaving;
    note.hidden = false;
    noteTimer = setTimeout(() => {
      note.dataset.leaving = 'true';
      noteTimer = setTimeout(() => { note.hidden = true; delete note.dataset.leaving; }, 160);
    }, 2400);
  };

  // 单选组与标签组：选中项是组内唯一的 Tab 停留点
  const select = (el, attr) => el.parentElement.querySelectorAll(`[${attr}]`).forEach(node => {
    node.setAttribute(attr, String(node === el));
    if (node.hasAttribute('tabindex')) node.tabIndex = node === el ? 0 : -1;
  });
  const importMessage = text => {
    const target = stage.querySelector('#import-error');
    target.textContent = text;
    target.hidden = false;
  };

  const handlers = {
    choose: el => {
      el.closest('[role=radiogroup]').querySelectorAll('[role=radio]').forEach(option => {
        const on = option === el;
        option.setAttribute('aria-checked', String(on));
        option.tabIndex = on ? 0 : -1;
        option.querySelector('.choice-check').innerHTML = on ? demo.check : String.fromCharCode(65 + Number(option.dataset.index));
      });
      const next = stage.querySelector('[data-action=game-next]');
      if (next) { next.disabled = false; next.removeAttribute('aria-describedby'); }
      stage.querySelector('#choice-hint')?.remove();
    },
    filter: el => select(el, 'aria-selected'),
    // 与原型一致：切换标签整体替换表单，错误提示随之清除，焦点留在新选中的标签上
    'import-tab': el => {
      const body = el.closest('#dialog-body'), form = demo.importForms[el.dataset.value];
      if (!form) throw new Error(`缺少导入表单：${el.dataset.value}`);
      body.innerHTML = form;
      body.querySelector('[role=tab][aria-selected=true]').focus();
    },
    'pick-level': el => select(el, 'aria-pressed'),
    'toggle-point': el => {
      const card = el.closest('.knowledge-card'), point = demo.knowledgePoints[el.dataset.index];
      const removed = !card.classList.contains('removed');
      card.classList.toggle('removed', removed);
      card.innerHTML = removed ? point.removed : point.kept;
      card.querySelector('[data-action=toggle-point]').focus();
    },
    chapter: el => select(el, 'aria-current'),
    'close-modal': closeDialog,
    'close-panel': closeSheet,
    'close-toast': closeToast,
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !stage.contains(button) || button.classList.contains('cmp-replay')) return;
    const action = button.dataset.action;
    if (button.getAttribute('role') === 'switch') {
      button.setAttribute('aria-checked', String(button.getAttribute('aria-checked') !== 'true'));
    } else if (button.classList.contains('nav-item')) {
      button.closest('nav').querySelectorAll('.nav-item').forEach(node => {
        if (node === button) node.setAttribute('aria-current', 'page'); else node.removeAttribute('aria-current');
      });
    } else if (handlers[action]) {
      handlers[action](button);
    } else {
      showNote(button);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (stage.querySelector('.cmp-backdrop:not([hidden])')) { event.preventDefault(); closeDialog(); }
      else if (stage.querySelector('.sheet-overlay:not([hidden])')) { event.preventDefault(); closeSheet(); }
      return;
    }
    const option = event.target.closest('[role=radio],[role=tab]');
    if (!option || !stage.contains(option)) return;
    const role = option.getAttribute('role');
    const step = { ArrowLeft: -1, ArrowRight: 1, ...(role === 'radio' ? { ArrowUp: -1, ArrowDown: 1 } : {}) }[event.key];
    if (!step) return;
    event.preventDefault();
    const options = [...option.parentElement.querySelectorAll(`[role=${role}]`)].filter(node => !node.disabled);
    const next = options[(options.indexOf(option) + step + options.length) % options.length];
    next.click();
    if (next.isConnected) next.focus();
  });

  // 与原型一致：选择或拖入文件后显示格式与导入状态
  document.addEventListener('change', event => {
    if (event.target.id === 'file-input' && event.target.files[0]) importMessage(HouImport.fileMessage(event.target.files[0].name));
  });
  document.addEventListener('dragover', event => {
    const zone = event.target.closest('#dropzone');
    if (zone) { event.preventDefault(); zone.classList.add('dragging'); }
  });
  document.addEventListener('dragleave', event => event.target.closest('#dropzone')?.classList.remove('dragging'));
  document.addEventListener('drop', event => {
    const zone = event.target.closest('#dropzone');
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove('dragging');
    if (event.dataTransfer.files[0]) importMessage(HouImport.fileMessage(event.dataTransfer.files[0].name));
  });

  // 就绪与高度回报给目录页：只发往同源父页面，目录页据此缩放窗口、判定加载成功
  const height = () => stage.offsetHeight;
  const report = () => parent.postMessage({ type: 'hou-frame', frame, height: height() }, location.origin);
  window.houFrame = { ready: true, height };
  new ResizeObserver(report).observe(stage);
})();
