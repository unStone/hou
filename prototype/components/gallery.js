// 通用组件目录页：展示窗口进入视口附近才加载，按列宽缩放，加载失败显示原因并可重试；外观与设备筛选、目录高亮
(() => {
  const TIMEOUT = 15000;
  const MAX_HEIGHT = 20000;
  const toolbar = document.querySelector('.cmp-toolbar');
  const frames = new Map();
  const byView = new Map();
  document.querySelectorAll('.cmp-viewport').forEach(view => {
    const iframe = view.querySelector('iframe');
    // 初始高度是生成时实测的内容高度，页面一开始就按最终尺寸排布，滚动和锚点不会因加载而漂移
    const entry = { view, iframe, width: Number(view.dataset.width), height: Number(iframe.getAttribute('height')), attempt: 0, timer: null };
    frames.set(iframe.dataset.frame, entry);
    byView.set(view, entry);
  });

  const fit = entry => {
    const scale = Math.min(1, entry.view.clientWidth / entry.width);
    entry.iframe.style.transform = `scale(${scale})`;
    entry.iframe.height = entry.height;
    entry.view.style.height = `${Math.ceil(entry.height * scale)}px`;
  };
  const fitAll = () => frames.forEach(fit);

  // 加载：以窗口发来的就绪消息为准（iframe 的 load 事件在内容出错时也会触发，不能作为成功依据）
  const fail = (entry, reason) => {
    clearTimeout(entry.timer);
    entry.view.dataset.state = 'failed';
    let box = entry.view.querySelector('.cmp-failure');
    if (!box) {
      box = document.createElement('div');
      box.className = 'cmp-failure';
      box.innerHTML = '<p></p><button type="button" class="text-button">重试</button>';
      box.querySelector('button').addEventListener('click', () => load(entry));
      entry.view.appendChild(box);
    }
    box.querySelector('p').textContent = `加载失败：${reason}`;
  };
  const load = entry => {
    entry.attempt += 1;
    entry.view.querySelector('.cmp-failure')?.remove();
    entry.view.dataset.state = 'loading';
    clearTimeout(entry.timer);
    entry.timer = setTimeout(() => fail(entry, `${TIMEOUT / 1000} 秒内没有收到窗口的就绪消息`), TIMEOUT);
    entry.iframe.src = entry.iframe.dataset.src + (entry.attempt > 1 ? `&attempt=${entry.attempt}` : '');
  };
  const observer = new IntersectionObserver(items => items.forEach(item => {
    if (!item.isIntersecting) return;
    observer.unobserve(item.target);
    load(byView.get(item.target));
  }), { rootMargin: '800px 0px' });
  byView.forEach((_, view) => observer.observe(view));

  addEventListener('message', event => {
    if (event.origin !== location.origin || event.data?.type !== 'hou-frame') return;
    const entry = frames.get(event.data.frame);
    if (!entry || event.source !== entry.iframe.contentWindow) return;
    if (event.data.error) { fail(entry, event.data.error); return; }
    const { height } = event.data;
    if (!Number.isFinite(height) || height <= 0 || height > MAX_HEIGHT) { fail(entry, `窗口回报的高度无效：${height}`); return; }
    clearTimeout(entry.timer);
    entry.view.dataset.state = 'ready';
    if (height !== entry.height) { entry.height = height; fit(entry); }
  });
  addEventListener('resize', fitAll);

  // 吸顶工具栏的实际高度，供卡片的锚点留白使用；窄窗口下工具栏会换行变高
  new ResizeObserver(() => document.documentElement.style.setProperty('--cmp-toolbar', `${toolbar.offsetHeight}px`)).observe(toolbar);

  // 外观与设备筛选：写入地址栏，刷新或分享链接后保留；方向键在组内切换，组内只有选中项可用 Tab 到达
  const datasetKey = { theme: 'showTheme', device: 'showDevice' };
  const narrow = matchMedia('(max-width: 767px)');
  const applyFilter = (kind, value, updateUrl) => {
    const buttons = [...document.querySelectorAll(`[data-show=${kind}]`)];
    const target = buttons.find(button => button.dataset.value === value);
    if (!target) throw new Error(`未知的筛选值：${kind}=${value}`);
    buttons.forEach(button => {
      button.setAttribute('aria-selected', String(button === target));
      button.tabIndex = button === target ? 0 : -1;
    });
    document.body.dataset[datasetKey[kind]] = value;
    if (updateUrl) {
      const url = new URL(location.href);
      if (value === 'all') url.searchParams.delete(kind); else url.searchParams.set(kind, value);
      history.replaceState(null, '', url);
    }
    fitAll();
  };
  const query = new URLSearchParams(location.search);
  applyFilter('theme', query.get('theme') || 'all', false);
  // 手机上默认只看手机窗口，桌面窗口缩到三成宽时无法阅读
  applyFilter('device', query.get('device') || (narrow.matches ? 'mobile' : 'all'), false);
  toolbar.addEventListener('click', event => {
    const button = event.target.closest('[data-show]');
    if (button) applyFilter(button.dataset.show, button.dataset.value, true);
  });
  toolbar.addEventListener('keydown', event => {
    const tab = event.target.closest('[role=tab]');
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!tab || !step) return;
    event.preventDefault();
    const tabs = [...tab.parentElement.querySelectorAll('[role=tab]')];
    const next = tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length];
    next.click();
    next.focus();
  });

  // 目录：宽屏常驻展开；手机上收起，点选后自动收起
  const index = document.querySelector('.cmp-index-list');
  const syncIndex = () => { index.open = !narrow.matches; };
  narrow.addEventListener('change', syncIndex);
  syncIndex();
  index.addEventListener('click', event => { if (event.target.closest('a') && narrow.matches) index.open = false; });

  // 目录高亮：标出工具栏下方第一张卡片
  const cards = [...document.querySelectorAll('.cmp-card')];
  const links = new Map([...index.querySelectorAll('a')].map(link => [link.hash.slice(1), link]));
  let current = null;
  let pending = false;
  const spy = () => {
    pending = false;
    const line = toolbar.getBoundingClientRect().bottom + 24;
    let active = cards[0];
    for (const card of cards) {
      if (card.getBoundingClientRect().top > line) break;
      active = card;
    }
    const link = links.get(active.id);
    if (link === current) return;
    current?.removeAttribute('aria-current');
    link.setAttribute('aria-current', 'true');
    current = link;
    if (!narrow.matches) link.scrollIntoView({ block: 'nearest' });
  };
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();

  // 字体加载完成后标题高度会微调，带锚点打开时重新对准目标卡片
  document.fonts.ready.then(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  });
})();
