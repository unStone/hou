(() => {
 const H=window.Hou,e=H.e,b=H.button,icon=H.icon;
 H.state={books:structuredClone(HouData.books),tasks:structuredClone(HouData.tasks),route:'today',bookId:'prd',filter:'active',completed:[],marks:{},notes:{},records:[],theme:'light',reduceMotion:false,sourceReturn:false,recordId:null,config:{url:'',model:'',shortcut:'⌘ ⇧ H',scheduled:false,time:'09:30'}};
 const $=id=>document.getElementById(id);
 const content=$('content'),dialog=$('dialog');
 let timer=null,toastTimer=null,lastFocus=null,importMode='file',generation=0;
 H.toast=message=>{clearTimeout(toastTimer);$('toast-text').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,6000)};
 H.render=(focus=false)=>{
  const s=H.state,views={today:H.today,library:H.library,reader:H.reader,extract:H.extract,game:H.game,result:H.result,settings:H.settings,records:H.records,log:H.log,schedule:H.schedule,'book-detail':H.bookDetail};
  if(!views[s.route])throw new Error(`无法显示页面：${s.route}`);
  content.innerHTML=views[s.route]();
  document.documentElement.dataset.theme=s.theme;
  document.documentElement.dataset.reduce=s.reduceMotion?'true':'false';
  $('app').classList.toggle('focus-mode',['game','result'].includes(s.route));
  $('brand-icon').src=`../brand/icon/hou-icon-master${s.theme==='dark'?'-dark':''}.png`;
  $('theme-label').textContent=s.theme==='dark'?'浅色外观':'深色外观';
  $('theme-glyph').innerHTML=icon(s.theme==='dark'?'sun':'moon');
  const names={today:'今天',library:'内容库',reader:'阅读',extract:'知识点',game:'考察',result:'理解反馈',settings:'设置',records:'运行记录',log:'记录详情',schedule:'接下来的安排','book-detail':'掌握程度'};
  $('crumb-current').textContent=names[s.route];document.title=`${names[s.route]} · 厚 Hou`;$('queue-count').textContent=H.pending().length;$('nav-count').textContent=String(H.pending().length).padStart(2,'0');
  document.querySelectorAll('[data-nav]').forEach(node=>{const key=node.dataset.nav,active=key===s.route||(key==='library'&&['reader','extract','book-detail'].includes(s.route))||(key==='records'&&s.route==='log');if(active)node.setAttribute('aria-current','page');else node.removeAttribute('aria-current')});
  const current=H.book(s.bookId);$('mini-title').textContent=current.title;$('mini-chapter').textContent=current.sections[current.chapter].title;$('mini-progress').style.width=`${((current.chapter+1)/current.sections.length)*100}%`;
  if(focus){window.scrollTo(0,0);requestAnimationFrame(()=>{const target=content.querySelector('h1');if(target)target.focus({preventScroll:true})})}
 };
 H.go=route=>{H.closePanel();H.state.route=route;H.render(true)};
 H.modal=html=>{lastFocus=document.activeElement;$('dialog-body').innerHTML=html;dialog.showModal();requestAnimationFrame(()=>{const target=dialog.querySelector('input,textarea,button');target?.focus()})};
 H.closeModal=()=>{dialog.close();if(lastFocus?.isConnected)lastFocus.focus();else $('home-nav').focus()};
 H.closePanel=()=>{$('queue-overlay').hidden=true;$('queue-button').setAttribute('aria-expanded','false')};
 const modalHead=title=>`<div class="dialog-header"><h2>${e(title)}</h2>${b(icon('close'),'close-modal','icon-button','aria-label="关闭"')}</div>`;
 const task=id=>{const t=H.state.tasks.find(x=>x.id===id);if(!t)throw new Error('找不到考察：'+id);return t};
 const timestamp=()=>{const d=new Date();return {date:d.toLocaleDateString('zh-CN',{month:'2-digit',day:'2-digit'}),time:d.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})}};
 const addRecord=values=>{const r={id:crypto.randomUUID(),...timestamp(),...values};H.state.records.push(r);H.state.recordId=r.id;return r};
 const saveGameNote=()=>{const textarea=$('explanation');if(textarea&&H.state.game&&!H.state.game.readonly)H.state.game.notes[H.state.game.step]=textarea.value};
 H.start=(id,trigger='从今天页开始')=>{
  const t=task(id);if(H.book(t.book).paused||H.book(t.book).archived){H.toast('这份内容的考察已暂停，请先恢复。');return}
  const section=H.book(t.book).sections[t.section];
  let questions;
  if(t.id==='t3')questions=[{question:'小游戏结束时，哪一项是判断理解程度所必需的？',choices:['用户的操作过程与最终作答','动画播放次数','游戏的视觉丰富程度'],correct:0,explanation:'游戏必须产出操作过程、最终作答和完成状态，才能为后续判断提供依据。'},{question:'替换游戏生成方式时，什么应该保持稳定？',choices:['所有游戏使用同一视觉样式','固定输入与作答输出的约定','每次游戏的具体题目'],correct:1,explanation:'生成方式可插拔，组件通过固定的输入输出交互，不影响判断和计划。'}];
  else if(!t.custom&&((t.book==='prd'&&t.section===0)||(t.book==='design'&&t.section===0)||t.book==='brand'))questions=structuredClone(HouData.questions[t.book]);
  else questions=[{question:'回忆刚读过的内容，哪一项与原文一致？',choices:[section.text[0],'原文没有提出任何观点。','这份内容没有可供理解的信息。'],correct:0,explanation:'本地示例将所选表述与导入原文直接核对，只检测识别，不分析自由文本理由。'}];
  H.state.game={taskId:id,trigger,phase:'loading',step:0,questions,answers:[],notes:[],operations:[],readonly:false};H.go('game');
  const token=++generation;clearTimeout(timer);timer=setTimeout(()=>{if(token!==generation||H.state.route!=='game')return;H.state.game.phase='playing';H.render(true)},1000);
 };
 const claim=()=>{const t=H.pending()[0]||H.scheduled()[0];if(t)H.start(t.id,'主动领取');else H.modal(modalHead('还没有可考察的内容')+'<p class="muted">读完一个章节并保留知识点后，就可以领取一次考察。</p><div class="form-actions">'+b('去阅读','claim-library','primary')+'</div>')};
 const queue=()=>{const list=H.pending();$('queue-body').innerHTML=`<div class="od-row spaced"><h2>待完成的考察</h2>${b(icon('close'),'close-panel','icon-button','aria-label="关闭待完成面板"')}</div><p class="caption" style="margin-top:8px">有空的时候，做一件就好。</p>${list.length?list.map(H.row).join(''):'<div class="notice" style="margin-top:24px">现在没有待完成的考察。新的安排会留在“今天”。</div>'}${b('主动领取一项 '+icon('arrow'),'claim','primary')}<p class="footnote">菜单栏面板的页面内预览</p>`;$('queue-overlay').hidden=false;$('queue-button').setAttribute('aria-expanded','true');requestAnimationFrame(()=>$('queue-body').querySelector('button')?.focus())};
 const showImport=mode=>{
  importMode=mode;
  const tabs=`<div class="tabs" role="tablist" aria-label="导入方式">${['file','web','text'].map((v,i)=>b(['文件','网页','正文'][i],'import-tab','',`data-value="${v}" role="tab" aria-selected="${mode===v}"`)).join('')}</div>`;
  const forms={file:`<div class="dropzone" id="dropzone">${icon('upload')}<div class="od-field"><strong>拖入一本书，慢慢读。</strong><span class="caption">PDF / EPUB</span></div><label for="file-input" class="caption">或选择本地文件</label><input id="file-input" type="file" accept=".pdf,.epub" aria-describedby="file-note"></div><p class="caption" id="file-note">当前原型未接入 PDF / EPUB 正文解析。选择文件可查看导入状态；使用“正文”可完整体验阅读流程。</p>`,web:`<div class="form-field"><label for="import-url">网页链接</label><input id="import-url" type="url" placeholder="https://…"></div><p class="caption">原型不抓取外部网页。尝试导入后可以改为粘贴正文。</p><div class="form-actions">${b('导入网页','import-web','primary')}</div>`,text:`<div class="form-field"><label for="import-title">内容标题</label><input id="import-title" placeholder="为这份内容起一个名字" maxlength="120"></div><div class="form-field"><label for="import-text">正文</label><textarea id="import-text" placeholder="粘贴你准备阅读的正文…" rows="8"></textarea><span class="caption">整篇作为一个章节保留，仅用于当前会话。</span></div><div class="form-actions">${b('导入并阅读','import-text','primary')}</div>`};
  const html=modalHead('导入内容')+tabs+forms[mode]+'<div id="import-error" class="error" role="alert" hidden></div>';
  if(dialog.open){$('dialog-body').innerHTML=html;requestAnimationFrame(()=>dialog.querySelector('input,button')?.focus())}else H.modal(html);
 };
 const importError=message=>{const target=$('import-error');target.textContent=message;target.hidden=false};
 const fileSelected=file=>{if(!file)return;const allowed=/\.(pdf|epub)$/i.test(file.name);importError(allowed?`已选择“${file.name}”。当前原型尚未接入 ${file.name.split('.').pop().toUpperCase()} 正文解析，文件未导入。请切换到“正文”完成阅读体验。`:'文件格式不支持，请选择 PDF 或 EPUB，或使用正文导入。')};
 const dateOption=(label,timeValue)=>b(label,'apply-delay','secondary',`data-value="${timeValue}"`);
 const showDelay=id=>{H.state.delayId=id;const t=task(id);H.modal(modalHead('稍后，再继续。')+`<p class="muted">${e(t.title)}</p><div class="od-stack gap-16" style="margin-top:24px">${dateOption('一小时后','一小时后')}${dateOption('今天晚上 · 20:00','今天 · 20:00')}${dateOption('明天早上 · 09:30','明天 · 09:30')}</div><p class="footnote">本地示例仅更新安排，不触发系统通知。</p>`) };
 const extract=()=>{
  const book=H.book(H.state.bookId),section=book.sections[book.chapter],key=`${book.id}:${book.chapter}`;
  H.state.extraction={book:book.id,section:book.chapter,loading:true,points:[]};H.go('extract');const token=++generation;
  clearTimeout(timer);timer=setTimeout(()=>{if(token!==generation||H.state.route!=='extract')return;const existing=H.state.tasks.filter(t=>t.book===book.id&&t.section===book.chapter);H.state.extraction.points=existing.length?existing.map(t=>({title:t.title,text:t.description,removed:false})):section.text.slice(0,3).map((p,i)=>({title:section.text.length===1?section.title:`${section.title} · 要点 ${i+1}`,text:p,removed:false}));H.state.extraction.loading=false;H.render(true)},900);
 };
 const confirmExtraction=()=>{
  const x=H.state.extraction,kept=x.points.filter(p=>!p.removed),key=`${x.book}:${x.section}`;
  if(!H.state.completed.includes(key))H.state.completed.push(key);
  x.points.forEach(p=>{const existing=H.state.tasks.find(t=>t.book===x.book&&t.section===x.section&&t.title===p.title);if(existing&&p.removed)existing.status='excluded';else if(existing&&existing.status==='excluded')existing.status='pending';else if(!existing&&!p.removed)H.state.tasks.push({id:crypto.randomUUID(),book:x.book,section:x.section,title:p.title,description:p.text,level:'理解',minutes:3,status:'pending',mastery:1,reason:'章节读完后，首次从基础识别开始考察。',custom:true})});
  H.go('today');H.toast(kept.length?`已保留 ${kept.length} 个知识点。首次示例考察已加入待完成。`:'未保留知识点，本章节已标记读完。');
 };
 const finishGame=()=>{
  const g=H.state.game,t=task(g.taskId);if(g.answers.length!==g.questions.length||g.answers.some(a=>a===undefined))throw new Error('作答不完整，不能提交考察');
  const correct=g.answers.filter((a,i)=>a===g.questions[i].correct).length,level=correct===g.questions.length?2:1;
  const next=level===2?'明天 · 09:30':'今天 · 20:00';
  addRecord({taskId:t.id,trigger:g.trigger,status:'complete',questions:structuredClone(g.questions),answers:[...g.answers],notes:[...g.notes],operations:[...g.operations,{action:'submit',at:new Date().toISOString()}],level,next});
  t.mastery=level;t.status='scheduled';t.when=next;t.reason='依据本地示例选择结果，先巩固识别，再进入新的情境。';H.go('result');
 };
 const dispute=()=>{
  const r=H.state.records.find(x=>x.id===H.state.recordId);
  H.modal(modalHead(r.override?'查看结论记录':'说说你的不同理解')+`<p class="muted">可以指出评分依据的问题。原示例结果会保留。</p><div class="form-field"><label for="dispute-reason">异议理由</label><textarea id="dispute-reason" placeholder="你认为哪一处判断需要重新考虑？" ${r.override?'readonly':''}>${e(r.dispute||'')}</textarea></div><p id="dispute-error" class="field-error" role="alert" hidden></p>${r.override?`<div class="notice">原示例结论：${HouData.levels[r.level-1]}<br>你的结论：${HouData.levels[r.override-1]}</div>`:r.reviewed?`<div class="review-note">示例复核保留原结论。此处未运行模型；你仍可以自己的结论为准。</div><div class="segmented-label">你的结论</div><div class="level-picker" role="group" aria-label="你的掌握程度">${HouData.levels.map((v,i)=>b(e(v),'pick-level','',`data-index="${i+1}" aria-pressed="${(H.overrideLevel||r.level)===i+1}"`)).join('')}</div><div class="form-actions">${b('采用我的结论','override-result','primary')}</div>`:`<div class="notice">真实复核需要模型服务。这里可以体验一次示例复核及采用自己结论的流程。</div><div class="form-actions">${b('查看示例复核','review-dispute','primary')}</div>`}`);
 };
 const actions={
  today:()=>H.go('today'),library:()=>H.go('library'),settings:()=>H.go('settings'),records:()=>H.go('records'),schedule:()=>H.go('schedule'),reader:()=>H.go('reader'),
  start:el=>{H.closePanel();H.start(el.dataset.id)},claim,'queue':queue,'close-panel':()=>{H.closePanel();$('queue-button').focus()},'close-toast':()=>$('toast').hidden=true,'close-modal':H.closeModal,
  'claim-library':()=>{H.closeModal();H.go('library')},filter:el=>{H.state.filter=el.dataset.value;H.render()},
  read:el=>{if(el.dataset.id)H.state.bookId=el.dataset.id;H.state.sourceReturn=false;H.go('reader')},'continue-reading':()=>{H.state.sourceReturn=false;H.go('reader')},
  chapter:el=>{H.book(H.state.bookId).chapter=Number(el.dataset.index);H.state.sourceReturn=false;H.render(true)},
  'book-detail':el=>{H.state.bookId=el.dataset.id;H.go('book-detail')},
  'book-menu':el=>{const book=H.book(el.dataset.id);H.modal(modalHead(book.title)+`<div class="od-stack gap-16">${b('查看章节与掌握程度','modal-book-detail','secondary',`data-id="${e(book.id)}"`)}${b(book.paused?'恢复考察':'暂停考察','pause-book','secondary',`data-id="${e(book.id)}"`)}${b('归档这份内容','archive-confirm','text-button',`data-id="${e(book.id)}"`)}</div>`)},
  'modal-book-detail':el=>{H.closeModal();actions['book-detail'](el)},
  'pause-book':el=>{const book=H.book(el.dataset.id);book.paused=!book.paused;if(dialog.open)H.closeModal();H.render();H.toast(book.paused?'考察已暂停。阅读与历史记录会保留。':'已恢复这份内容的考察安排。')},
  'archive-confirm':el=>{const book=H.book(el.dataset.id);$('dialog-body').innerHTML=modalHead('归档这份内容？')+`<p class="archive-name">${e(book.title)}</p><p class="muted">将停止相关考察。内容、批注和历史作答记录都会保留，可以从“已归档”恢复。</p><div class="form-actions">${b('取消','close-modal','text-button')}${b('确认归档','archive-book','primary',`data-id="${e(book.id)}"`)}</div>`},
  'archive-book':el=>{const book=H.book(el.dataset.id);book.archived=true;H.closeModal();H.render();H.toast('已归档，历史记录已保留。')},unarchive:el=>{H.book(el.dataset.id).archived=false;H.render();H.toast('已恢复到阅读中。')},
  import:()=>showImport('file'),'import-tab':el=>showImport(el.dataset.value),
  'import-web':()=>{const input=$('import-url'),value=input.value.trim();let url;try{url=new URL(value)}catch{importError('请填写完整的网页链接，例如 https://example.com/article。');return}if(!['https:','http:'].includes(url.protocol)){importError('网页链接必须使用 http 或 https。');return}importError('当前原型没有接入网页正文提取，无法抓取这个链接。请切换到“正文”，粘贴文章内容后导入。')},
  'import-text':()=>{const title=$('import-title').value.trim(),text=$('import-text').value.trim();if(!title||!text){importError(!title?'请填写内容标题。':'请粘贴正文后再导入。');return}const id=crypto.randomUUID();H.state.books.push({id,title,type:'正文',author:'你导入的内容',description:'来自粘贴的正文。',chapter:0,paused:false,archived:false,sections:[{title:'全文',text:text.split(/\n\s*\n|\n/).filter(Boolean)}]});H.state.bookId=id;H.closeModal();H.state.sourceReturn=false;H.go('reader');H.toast('正文已导入本次会话，可以开始阅读。')},
  highlight:()=>{const selection=window.getSelection(),key=`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;let node=selection?.anchorNode;if(node?.nodeType===Node.TEXT_NODE)node=node.parentElement;const p=node?.closest?.('[data-paragraph]');if(!p||!$('reader-text').contains(p)||!selection.toString().trim()){H.toast('请先用鼠标选中阅读正文中的一段文字。');return}const index=Number(p.dataset.paragraph),marks=H.state.marks[key]||[];H.state.marks[key]=marks.includes(index)?marks.filter(n=>n!==index):[...marks,index];selection.removeAllRanges();H.render();H.toast(marks.includes(index)?'已取消该段高亮。':'已高亮整段原文，作为考察侧重的参考。')},
  annotation:()=>{const key=`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;H.modal(modalHead('留下一点想法')+`<div class="form-field"><label for="note-text">本章批注</label><textarea id="note-text" placeholder="写下联系、疑问，或自己的理解。">${e(H.state.notes[key]||'')}</textarea></div><div class="form-actions">${b('保存批注','save-note','primary')}</div>`)},
  'save-note':()=>{const key=`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;H.state.notes[key]=$('note-text').value.trim();H.closeModal();H.render();H.toast('批注已保存在本次会话。')},
  'extract-start':extract,'toggle-point':el=>{const p=H.state.extraction.points[Number(el.dataset.index)];p.removed=!p.removed;H.render()},'confirm-extraction':confirmExtraction,
  delay:el=>showDelay(el.dataset.id),'apply-delay':el=>{const t=task(H.state.delayId);t.status='scheduled';t.when=el.dataset.value;t.reason='由你主动延后，按自己的节奏继续。';H.closeModal();H.render();H.toast(`已延后到${t.when}。`)},
  reason:el=>{const t=task(el.dataset.id);H.modal(modalHead('为什么是这个安排？')+`<h3>${e(t.title)}</h3><p class="footnote">${e(t.when)} · ${t.level} · 约 ${t.minutes} 分钟</p><p style="margin-top:24px">${e(t.reason)}</p><div class="notice" style="margin-top:24px">这是预设的示例安排，真实计划器尚未连接。</div><div class="form-actions">${b('调整时间','modal-delay','secondary',`data-id="${e(t.id)}"`)}</div>`)},'modal-delay':el=>{H.closeModal();showDelay(el.dataset.id)},
  choose:el=>{const g=H.state.game;if(g.readonly)return;saveGameNote();g.answers[g.step]=Number(el.dataset.index);g.operations.push({action:'choose',step:g.step,value:Number(el.dataset.index),at:new Date().toISOString()});H.render();content.querySelector(`[data-action="choose"][data-index="${el.dataset.index}"]`)?.focus()},
  'game-next':()=>{const g=H.state.game;saveGameNote();if(g.step<g.questions.length-1){g.step++;H.render(true)}else if(g.readonly)H.go('log');else finishGame()},
  'game-prev':()=>{saveGameNote();H.state.game.step--;H.render(true)},'retry-game':()=>H.start(H.state.game.taskId,H.state.game.trigger),
  'exit-game':()=>{const g=H.state.game;clearTimeout(timer);generation++;if(g.readonly){H.go('log');return}saveGameNote();addRecord({taskId:g.taskId,trigger:g.trigger,status:'interrupted',operations:g.operations,answers:g.answers,notes:g.notes});task(g.taskId).status='pending';H.go('today');H.toast('考察已回到待完成列表，本次不计入掌握程度。')},
  source:el=>{const t=task(el.dataset.id);H.state.bookId=t.book;H.book(t.book).chapter=t.section;H.state.sourceReturn=true;H.go('reader')},'return-result':()=>{H.state.sourceReturn=false;H.go('result')},
  dispute,'review-dispute':()=>{const reason=$('dispute-reason').value.trim();if(!reason){$('dispute-error').textContent='请说明你不同意的具体依据。';$('dispute-error').hidden=false;return}const r=H.state.records.find(x=>x.id===H.state.recordId);r.dispute=reason;r.reviewed=true;H.overrideLevel=r.level;H.closeModal();dispute()},
  'pick-level':el=>{H.overrideLevel=Number(el.dataset.index);dialog.querySelectorAll('[data-action="pick-level"]').forEach(n=>n.setAttribute('aria-pressed',n===el?'true':'false'))},
  'override-result':()=>{const r=H.state.records.find(x=>x.id===H.state.recordId),reason=$('dispute-reason').value.trim();if(!reason){$('dispute-error').textContent='请保留具体的异议理由。';$('dispute-error').hidden=false;return}r.dispute=reason;r.override=H.overrideLevel||r.level;r.next=r.override<=2?'今天 · 20:00':'明天 · 09:30';const t=task(r.taskId);t.mastery=r.override;t.when=r.next;t.reason='按你确认的掌握程度调整示例安排。';H.closeModal();H.render();H.toast('已采用你的结论。原结果与复核记录一并保留。')},
  log:el=>{H.state.recordId=el.dataset.id;H.go('log')},'record-result':el=>{H.state.recordId=el.dataset.id;H.go('result')},
  replay:el=>{const r=H.state.records.find(x=>x.id===el.dataset.id);H.state.game={taskId:r.taskId,phase:'playing',step:0,readonly:true,questions:r.questions,answers:r.answers,notes:r.notes};H.go('game')},
  theme:el=>{H.state.theme=el.dataset.value;H.render()},'toggle-theme':()=>{H.state.theme=H.state.theme==='light'?'dark':'light';H.render()},'reduce-motion':()=>{H.state.reduceMotion=!H.state.reduceMotion;H.render()},
  'save-config':()=>{const url=$('model-url').value.trim(),model=$('model-name').value.trim(),secret=$('model-key').value.trim(),error=$('config-error');let parsed;try{parsed=new URL(url)}catch{error.textContent='请填写完整的模型服务地址。';error.hidden=false;return}if(!['http:','https:'].includes(parsed.protocol)||!model||!secret){error.textContent='请使用 http 或 https 地址，并填写模型名称与密钥。';error.hidden=false;return}H.state.config.url=url;H.state.config.model=model;H.secret=secret;error.hidden=true;H.toast('配置已暂存到本次会话。原型不会发起模型请求。')},
  shortcut:()=>H.modal(modalHead('主动领取快捷键')+`<div class="form-field"><label for="shortcut-input">按下新的组合键</label><input id="shortcut-input" readonly value="${e(H.state.config.shortcut)}"><span class="caption">至少包含 Command 或 Control 加一个字母。本页面内生效。</span></div><div class="form-actions">${b('保存快捷键','save-shortcut','primary')}</div>`),
  'save-shortcut':()=>{const value=$('shortcut-input').value;if(!/(⌘|Ctrl)/.test(value)){H.toast('请使用 Command 或 Control 加一个字母。');return}H.state.config.shortcut=value;H.closeModal();H.render();H.toast('快捷键已更新，仅在本页面生效。')},
  'toggle-schedule':()=>{H.state.config.scheduled=!H.state.config.scheduled;H.render()},
  notification:()=>H.modal(modalHead('有一份理解，值得再看看。')+`<p class="muted">${H.pending().length?'一项考察已准备好，约需几分钟。':'当前没有到期的考察，也可以主动领取。'}</p><p class="footnote">这是通知样式预览，不会发送系统通知。</p><div class="form-actions">${b('稍后再做','close-modal','text-button')}${b('领取考察','notification-start','primary')}</div>`),'notification-start':()=>{H.closeModal();claim()}
 };
 document.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el||el.disabled)return;const handler=actions[el.dataset.action];if(!handler)throw new Error('未实现的操作：'+el.dataset.action);handler(el)});
 document.addEventListener('change',event=>{if(event.target.id==='file-input')fileSelected(event.target.files[0]);if(event.target.id==='schedule-time')H.state.config.time=event.target.value});
 document.addEventListener('focusout',event=>{if(event.target.id==='import-title'&&!event.target.value.trim()){importError('请填写内容标题。')}if(event.target.id==='import-text'&&!event.target.value.trim()){importError('请粘贴正文后再导入。')}});
 document.addEventListener('keydown',event=>{
  if(event.target.id==='shortcut-input'){event.preventDefault();if((event.metaKey||event.ctrlKey)&&/^[a-z]$/i.test(event.key))event.target.value=[event.metaKey?'⌘':'Ctrl',event.shiftKey?'⇧':'',event.altKey?'⌥':'',event.key.toUpperCase()].filter(Boolean).join(' ');return}
  if(event.key==='Escape'){if(dialog.open){event.preventDefault();H.closeModal();return}if(!$('queue-overlay').hidden){H.closePanel();$('queue-button').focus();return}if(H.state.route==='game')actions['exit-game']();return}
  if(event.key==='Enter'&&event.target.id==='import-title'){event.preventDefault();actions['import-text']();return}
  if(event.key==='Enter'&&event.target.id==='import-url'){event.preventDefault();actions['import-web']();return}
  if((event.metaKey||event.ctrlKey)&&!dialog.open&&!['INPUT','TEXTAREA'].includes(event.target.tagName)){const c=H.state.config.shortcut,match=c.endsWith(event.key.toUpperCase())&&c.includes('⇧')===event.shiftKey&&c.includes('⌥')===event.altKey;if(match){event.preventDefault();if(H.state.route!=='game')claim()}}
  const radio=event.target.closest('[role="radio"]');if(radio&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();const options=[...content.querySelectorAll('[role="radio"]')],i=options.indexOf(radio),direction=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;options[(i+direction+options.length)%options.length].click()}
  const tab=event.target.closest('[role="tab"]');if(tab&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();const options=[...tab.parentElement.querySelectorAll('[role="tab"]')],i=options.indexOf(tab),n=(i+(event.key==='ArrowLeft'?-1:1)+options.length)%options.length;options[n].click();(dialog.open?dialog:content).querySelectorAll('[role="tab"]')[n]?.focus()}
 });
 document.addEventListener('dragover',event=>{if(event.target.closest('#dropzone')){event.preventDefault();$('dropzone').classList.add('dragging')}});
 document.addEventListener('dragleave',event=>{if(event.target.closest('#dropzone'))$('dropzone')?.classList.remove('dragging')});
 document.addEventListener('drop',event=>{if(event.target.closest('#dropzone')){event.preventDefault();$('dropzone').classList.remove('dragging');fileSelected(event.dataTransfer.files[0])}});
 dialog.addEventListener('cancel',event=>{event.preventDefault();H.closeModal()});
 $('queue-overlay').addEventListener('click',event=>{if(event.target===$('queue-overlay')){H.closePanel();$('queue-button').focus()}});
 $('queue-overlay').addEventListener('keydown',event=>{if(event.key!=='Tab')return;const nodes=[...$('queue-body').querySelectorAll('button')],first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
 let touchY=null;$('queue-body').addEventListener('touchstart',ev=>{touchY=ev.touches[0].clientY},{passive:true});$('queue-body').addEventListener('touchend',ev=>{if(touchY!==null&&ev.changedTouches[0].clientY-touchY>80&&$('queue-body').scrollTop===0)H.closePanel();touchY=null},{passive:true});
 H.render();
})();
