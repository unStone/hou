(() => {
 const H=window.Hou,e=H.e,b=H.button,icon=H.icon;
 H.state={books:structuredClone(HouData.books),tasks:structuredClone(HouData.tasks),route:'today',bookId:'prd',filter:'active',completed:[],marks:{},notes:{},records:[],theme:'light',reduceMotion:false,sourceReturn:false,recordId:null,goalOpen:false,skipped:[],asks:{},providers:[],config:{chat:null,ocr:null,shortcut:'⌘ ⇧ H',oldReview:true,autoStart:true}};
 const $=id=>document.getElementById(id);
 const content=$('content'),dialog=$('dialog');
 let timer=null,toastTimer=null,lastFocus=null,importMode='file',generation=0,renderedRoute=null;
 H.toast=(message,action)=>{clearTimeout(toastTimer);const toast=$('toast'),button=$('toast-action');enter(toast);$('toast-text').textContent=message;button.hidden=!action;if(action){button.textContent=action.label;button.dataset.action=action.action;button.dataset.id=action.id||''}toast.hidden=false;toastTimer=setTimeout(()=>leave(toast,()=>{toast.hidden=true}),action?8000:6000)};
 H.render=(focus=false)=>{
  const s=H.state,views={today:H.today,library:H.library,reader:H.reader,extract:H.extract,game:H.game,result:H.result,settings:H.settings,records:H.records,log:H.log,schedule:H.schedule,'book-detail':H.bookDetail,review:H.review,welcome:H.welcome};
  if(!views[s.route])throw new Error(`无法显示页面：${s.route}`);
  // 同一页面内的状态变化用 morph 保留原有节点，选中、开关等过渡动画才能播放；切换页面时整页替换以播放页面淡入
  if(s.route===renderedRoute)Idiomorph.morph(content,views[s.route](),{morphStyle:'innerHTML'});
  else content.innerHTML=views[s.route]();
  renderedRoute=s.route;
  document.documentElement.dataset.theme=s.theme;
  document.documentElement.dataset.reduce=s.reduceMotion?'true':'false';
  $('app').classList.toggle('focus-mode',['game','result','welcome'].includes(s.route));
  $('brand-icon').src=`../brand/icon/hou-icon-master${s.theme==='dark'?'-dark':''}.png`;
  $('theme-label').textContent=s.theme==='dark'?'浅色外观':'深色外观';
  $('theme-glyph').innerHTML=icon(s.theme==='dark'?'sun':'moon');
  const names={today:'今天',library:'内容库',reader:'阅读',extract:'知识点',game:'考察',result:'理解反馈',settings:'设置',records:'运行记录',log:'记录详情',schedule:'接下来的安排','book-detail':'掌握程度',review:'回顾',welcome:'欢迎'};
  $('crumb-current').textContent=names[s.route];document.title=`${names[s.route]} · 厚 Hou`;$('queue-count').textContent=H.pending().length;$('nav-count').textContent=String(H.pending().length).padStart(2,'0');
  document.querySelectorAll('[data-nav]').forEach(node=>{const key=node.dataset.nav,active=key===s.route||(key==='library'&&['reader','extract','book-detail','review'].includes(s.route))||(key==='records'&&s.route==='log');if(active)node.setAttribute('aria-current','page');else node.removeAttribute('aria-current')});
  // 侧栏只显示在读的内容：当前打开的若已归档，改显示在读的书或文章
  const opened=H.book(s.bookId),current=opened?.status==='reading'?opened:H.slot('book')||H.slot('article');$('mini-title').textContent=current?current.title:'现在没有在读的内容';$('mini-title').dataset.id=current?.id||'';$('mini-chapter').textContent=current?current.sections[current.chapter].title:'导入一本书或一篇文章';$('mini-progress').style.width=current?`${((current.chapter+1)/current.sections.length)*100}%`:'0';
  if(focus){window.scrollTo(0,0);requestAnimationFrame(()=>{const target=content.querySelector('h1');if(target)target.focus({preventScroll:true})})}
 };
 H.go=route=>{H.closePanel();H.state.route=route;H.render(true)};
 // 退场：按 DESIGN.md 淡出 160ms 后再隐藏（淡出只改透明度，减少动态效果时同样保留）。退场中途重新打开会取消这次隐藏
 const leave=(node,done)=>{clearTimeout(node.leaveTimer);node.dataset.leaving='true';node.leaveTimer=setTimeout(()=>{delete node.dataset.leaving;done()},160)};
 const enter=node=>{clearTimeout(node.leaveTimer);delete node.dataset.leaving};
 H.modal=html=>{enter(dialog);lastFocus=document.activeElement;$('dialog-body').innerHTML=html;if(!dialog.open)dialog.showModal();requestAnimationFrame(()=>{const target=dialog.querySelector('input,textarea,button');target?.focus()})};
 H.closeModal=()=>leave(dialog,()=>{dialog.close();if(lastFocus?.isConnected)lastFocus.focus();else $('home-nav').focus()});
 H.closePanel=()=>{const overlay=$('queue-overlay');$('queue-button').setAttribute('aria-expanded','false');if(overlay.hidden)return;leave(overlay,()=>{overlay.hidden=true})};
 const modalHead=title=>`<div class="dialog-header"><h2>${e(title)}</h2>${b(icon('close'),'close-modal','icon-button','aria-label="关闭"')}</div>`;
 const task=id=>{const t=H.state.tasks.find(x=>x.id===id);if(!t)throw new Error('找不到考察：'+id);return t};
 const timestamp=()=>{const d=new Date();return {date:d.toLocaleDateString('zh-CN',{month:'2-digit',day:'2-digit'}),time:d.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})}};
 const addRecord=values=>{const r={id:crypto.randomUUID(),...timestamp(),...values};H.state.records.push(r);H.state.recordId=r.id;return r};
 // 选择题、判断题的文字框是理由，存进 notes；解释题、应用题的文字框就是作答，存进 answers
 const saveGameNote=()=>{const textarea=$('explanation'),g=H.state.game;if(!textarea||!g||g.readonly)return;if(H.auto(g.questions[g.step]))g.notes[g.step]=textarea.value;else g.answers[g.step]=textarea.value};
 H.start=(id,trigger='从今天页开始')=>{
  const t=task(id),owner=H.book(t.book);if(!H.active(owner)){H.toast(owner.paused?'这份内容的考察已暂停，请先恢复。':'“旧书复习”已关闭，归档内容不再出题。');return}
  const section=H.book(t.book).sections[t.section];
  let questions;
  if(t.id==='t3')questions=[{question:'用户刚读完一章，想先确认自己能不能认出正确的说法。哪种题型最合适？',choices:['情境选择','用自己的话解释','情境应用'],correct:0,explanation:'能识别、能理解这一层用情境选择，按标准答案在本地判分。'},{type:'judge',statement:'取消小游戏后，所有题目都必须由模型判分。',correct:1,explanation:'不对。情境选择和判断题的对错在本地按标准答案判分，只有理由、解释和应用需要模型按评分细则判。',rubric:['判断为不对','理由指出选择题、判断题对错可以本地判分']}];
  else if(t.demo)questions=structuredClone(t.questions);
  else if(!t.custom&&((t.book==='prd'&&t.section===0)||(t.book==='design'&&t.section===0)||t.book==='brand'))questions=structuredClone(HouData.questions[t.book]);
  else questions=[{question:'回忆刚读过的内容，哪一项与原文一致？',choices:[section.text[0],'原文没有提出任何观点。','这份内容没有可供理解的信息。'],correct:0,explanation:'本地示例将所选表述与导入原文直接核对，只检测识别。'},{type:'explain',prompt:`用自己的话解释「${t.title}」说的是什么。`,reference:t.description,rubric:['意思与原文一致','用自己的话，不照抄原文']}];
  questions=questions.map(q=>({type:'choice',...q}));
  if(t.draft&&Date.now()-t.draft.at<DAY){
   const d=t.draft,step=d.questions.findIndex((q,i)=>H.auto(q)?d.answers[i]===undefined:!String(d.answers[i]??'').trim());
   H.state.game={taskId:id,trigger,phase:'playing',step:step<0?d.questions.length-1:step,questions:d.questions,answers:d.answers,notes:d.notes,operations:d.operations,readonly:false};H.go('game');H.toast('接着上次没做完的那一题。');return;
  }
  t.draft=null;
  H.state.game={taskId:id,trigger,phase:'loading',step:0,questions,answers:[],notes:[],operations:[],readonly:false};H.go('game');
  const token=++generation;clearTimeout(timer);timer=setTimeout(()=>{if(token!==generation||H.state.route!=='game')return;H.state.game.phase='playing';H.render(true)},1000);
 };
 const claim=()=>{const t=H.pending()[0]||H.scheduled()[0];if(t)H.start(t.id,'主动领取');else H.modal(modalHead('还没有可考察的内容')+'<p class="muted">读完一个章节并保留知识点后，就可以领取一次考察。</p><div class="form-actions">'+b('去阅读','claim-library','primary')+'</div>')};
 const queue=()=>{const list=H.pending();$('queue-body').innerHTML=`<div class="od-row spaced"><h2>待完成的考察</h2>${b(icon('close'),'close-panel','icon-button','aria-label="关闭待完成面板"')}</div><p class="caption" style="margin-top:8px">有空的时候，做一件就好。</p>${list.length?list.map(H.row).join(''):'<div class="notice" style="margin-top:24px">现在没有待完成的考察。新的安排会留在“今天”。</div>'}${b('主动领取一项 '+icon('arrow'),'claim','primary')}<p class="footnote">菜单栏面板的页面内预览</p>`;enter($('queue-overlay'));$('queue-overlay').hidden=false;$('queue-button').setAttribute('aria-expanded','true');requestAnimationFrame(()=>$('queue-body').querySelector('button')?.focus())};
 const showImport=mode=>{
  importMode=mode;
  const tabs=`<div class="tabs" role="tablist" aria-label="导入方式">${['file','web','text'].map((v,i)=>b(['文件','网页','正文'][i],'import-tab','',`data-value="${v}" role="tab" aria-selected="${mode===v}" tabindex="${mode===v?0:-1}"`)).join('')}</div>`;
  const forms={file:`<div class="dropzone" id="dropzone">${icon('upload')}<div class="od-field"><strong>拖入一本书，慢慢读。</strong><span class="caption">PDF / EPUB</span></div><input id="file-input" class="sr-only" type="file" accept=".pdf,.epub" aria-describedby="file-note"><label for="file-input" class="secondary">选择本地文件</label></div><p class="caption" id="file-note">当前原型未接入 PDF / EPUB 正文解析。选择文件可查看导入状态；使用“正文”可完整体验阅读流程。</p>`,web:`<div class="form-field"><label for="import-url">网页链接</label><input id="import-url" type="url" placeholder="https://…"></div><p class="caption">原型不抓取外部网页。尝试导入后可以改为粘贴正文。</p><div class="form-actions">${b('导入网页','import-web','primary')}</div>`,text:`<div class="form-field"><label for="import-title">内容标题</label><input id="import-title" placeholder="为这份内容起一个名字" maxlength="120"></div><div class="form-field"><label for="import-text">正文</label><textarea id="import-text" placeholder="粘贴你准备阅读的正文…" rows="8"></textarea><span class="caption">整篇作为一个章节保留，仅用于当前会话。</span></div><div class="form-actions">${b('导入并阅读','import-text','primary')}</div>`};
  // 导入即在读：同类的在读名额已占用时，不显示导入表单
  const kind=mode==='file'?'book':'article',held=H.slot(kind),name=H.kinds[kind].name;
  const blocked=held&&`<div class="quota-block"><span class="caption">${name}的在读名额 · 1 / 1</span><h3>${e(held.title)} · 还没读完</h3><p class="muted">没有待读列表：导入就是开始读。先把这${kind==='book'?'本':'篇'}读完，或者写下理由放弃，才能导入新的${name}。</p><div class="form-actions">${b('放弃这'+(kind==='book'?'本':'篇'),'abandon','text-button',`data-id="${e(held.id)}"`)}${b('继续读 '+icon('arrow'),'quota-read','primary',`data-id="${e(held.id)}"`)}</div></div>`;
  const html=modalHead('导入内容')+tabs+(blocked||forms[mode])+'<div id="import-error" class="error" role="alert" hidden></div>';
  if(dialog.open){$('dialog-body').innerHTML=html;dialog.querySelector('[role="tab"][aria-selected="true"]').focus()}else H.modal(html);
 };
 const importError=message=>{const target=$('import-error');target.textContent=message;target.hidden=false};
 const fileSelected=file=>{if(file)importError(HouImport.fileMessage(file.name))};
 const dateOption=(label,timeValue)=>b(label,'apply-delay','secondary',`data-value="${timeValue}"`);
 const showDelay=id=>{H.state.delayId=id;const t=task(id);H.modal(modalHead('稍后，再继续。')+`<p class="muted">${e(t.title)}</p><div class="od-stack gap-16" style="margin-top:24px">${dateOption('一小时后','一小时后')}${dateOption('今天晚上 · 20:00','今天 · 20:00')}${dateOption('明天早上 · 09:30','明天 · 09:30')}</div><p class="footnote">本地示例仅更新安排，不触发系统通知。</p>`) };
 const today=()=>{const d=new Date();return `${d.getMonth()+1} 月 ${d.getDate()} 日`};
 // 本地示例的相关程度：知识点里出现"想学会"中的词为高，只出现词的前两个字为中，否则为低。真实版本由模型判断
 const relevanceOf=(goal,title,text)=>{
  const words=(goal.learn||goal.gain).split(/[，,、。；;\s“”"'·/]+/).filter(w=>w.length>=2),all=title+text;
  const hit=words.find(w=>all.includes(w));if(hit)return {relevance:'high',relevanceReason:`目标里写了“${hit}”。`};
  const near=words.find(w=>all.includes(w.slice(0,2)));if(near)return {relevance:'mid',relevanceReason:`与目标中的“${near}”有关。`};
  return {relevance:'low',relevanceReason:'没有直接对应目标，仍会保留复习。'};
 };
 const goalModal=(id,first)=>{
  const book=H.book(id),g=book.goal||{gain:'',learn:''},unit=book.kind==='book'?'本书':'篇文章';
  H.modal(modalHead(first?'开始读之前':'阅读目标')+`<p class="muted">${first?`${e(book.title)} 已导入，现在就是在读。`:''}想清楚要从这${unit}里拿走什么，知识点会按目标排序，考察也会从目标场景出题。可以只写一项。</p><div class="form-field"><label for="goal-gain">想从这${unit}得到什么</label><textarea id="goal-gain" rows="2" placeholder="例如：弄清楚好界面背后的原则，能说出为什么好。">${e(g.gain)}</textarea></div><div class="form-field"><label for="goal-learn">想学会哪些内容</label><textarea id="goal-learn" rows="2" placeholder="例如：信息层次、留白、一屏只突出一件事">${e(g.learn)}</textarea><span class="caption">用顿号或逗号分开。</span></div>${book.goalHistory.length?`<details><summary>之前的目标 · ${book.goalHistory.length} 条</summary>${book.goalHistory.map(h=>`<p class="caption">截至 ${e(h.until)}：${e(h.learn||h.gain)}</p>`).join('')}</details>`:''}<p id="goal-error" class="field-error" role="alert" hidden></p><div class="form-actions">${b(first?'先跳过':'取消',first?'skip-goal':'close-modal','text-button')}${b('保存目标','save-goal','primary',`data-id="${e(id)}" data-first="${first}"`)}</div>`);
 };
 const saveGoal=(id,first)=>{
  const book=H.book(id),gain=$('goal-gain').value.trim(),learn=$('goal-learn').value.trim();
  if(!gain&&!learn){$('goal-error').textContent='至少写一项；不想写可以先跳过。';$('goal-error').hidden=false;return}
  const had=!!book.goal;if(book.goal&&(book.goal.gain!==gain||book.goal.learn!==learn))book.goalHistory.push({...book.goal,until:today()});
  book.goal={gain,learn};
  H.state.tasks.filter(t=>t.book===id&&!t.relevanceManual).forEach(t=>Object.assign(t,relevanceOf(book.goal,t.title,t.description)));
  H.closeModal();H.render();H.toast(first?'阅读目标已保存，开始读吧。':had?'阅读目标已更新。知识点的相关程度已重新评估，已有考察记录不变。':'阅读目标已保存。已有知识点按目标标注了相关程度。');
 };
 // —— 划词：选区换算成"段落编号 + 字符位置"，与统一阅读格式的原文定位一致 ——
 const chapterKey=()=>`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;
 const offsetIn=(p,node,off)=>{const r=document.createRange();r.selectNodeContents(p);r.setEnd(node,off);return r.toString().length};
 const toolbarAt=rect=>{const box=content.querySelector('.reader-content').getBoundingClientRect();return {top:Math.max(0,Math.round(rect.top-box.top-48)),left:Math.round(Math.min(Math.max(rect.left-box.left+rect.width/2,150),box.width-150))}};
 const readSelection=()=>{
  const sel=getSelection(),root=$('reader-text');if(!root||!sel?.rangeCount||sel.isCollapsed)return null;
  const range=sel.getRangeAt(0);if(!range.intersectsNode(root))return null;
  const segments=[...root.querySelectorAll('[data-paragraph]')].filter(p=>range.intersectsNode(p)).map(p=>({p:Number(p.dataset.paragraph),start:p.contains(range.startContainer)?offsetIn(p,range.startContainer,range.startOffset):0,end:p.contains(range.endContainer)?offsetIn(p,range.endContainer,range.endOffset):p.textContent.length})).filter(g=>g.end>g.start);
  const section=H.book(H.state.bookId).sections[H.book(H.state.bookId).chapter],quote=segments.map(g=>section.text[g.p].slice(g.start,g.end)).join('\n');
  return quote.trim()?{segments,quote,rect:range.getBoundingClientRect()}:null;
 };
 const findMark=id=>{for(const [key,list] of Object.entries(H.state.marks)){const m=list.find(x=>x.id===id);if(m)return {key,m}}throw new Error('找不到高亮：'+id)};
 const markQuote=(key,m)=>{const [id,ch]=key.split(':');return H.book(id).sections[Number(ch)].text[m.p].slice(m.start,m.end)};
 // 新高亮与同段已有高亮重叠时合并为一处，批注合并保留；跨段选区每段各记一处，批注挂在第一段
 const addMarks=(key,segments,note)=>{
  let list=H.state.marks[key]||[];
  segments.forEach((g,i)=>{const hit=list.filter(m=>m.p===g.p&&m.start<g.end&&g.start<m.end);list=list.filter(m=>!hit.includes(m));list.push({id:crypto.randomUUID(),p:g.p,start:Math.min(g.start,...hit.map(m=>m.start)),end:Math.max(g.end,...hit.map(m=>m.end)),note:[...hit.map(m=>m.note),i===0?note:''].filter(Boolean).join('\n\n')})});
  H.state.marks[key]=list;
 };
 // 渲染后量一下功能栏，超出窗口时往里挪，离边缘至少 8px
 const fitToolbar=()=>{const tb=$('sel-toolbar');if(!tb)return;const r=tb.getBoundingClientRect(),vw=document.documentElement.clientWidth,dx=r.right>vw-8?vw-8-r.right:r.left<8?8-r.left:0;if(dx){H.state.selTool.left+=Math.round(dx);tb.style.left=`${H.state.selTool.left}px`}};
 const selectionEnd=event=>{
  if(H.state.route!=='reader'||event.target.closest?.('#sel-toolbar,.ask-panel,dialog'))return;
  const found=readSelection();
  if(found){H.state.selTool={mode:'new',segments:found.segments,quote:found.quote,...toolbarAt(found.rect)};getSelection().removeAllRanges();H.render();fitToolbar();return}
  const asked=event.target.closest?.('mark.asked');
  if(asked&&getSelection().isCollapsed){openAsk(asked.dataset.ask);return}
  const el=event.target.closest?.('mark.hl');
  if(el){const {key,m}=findMark(el.dataset.mark);H.state.selTool={mode:'mark',id:m.id,note:m.note,segments:[{p:m.p,start:m.start,end:m.end}],quote:markQuote(key,m),...toolbarAt(el.getBoundingClientRect())};H.render();fitToolbar();return}
  if(H.state.selTool){H.state.selTool=null;H.render()}
 };
 // 本地示例回答：按问题类型套用模板，"和阅读目标的关系"按目标里的词是否出现在选中文字中判断。真实回答由模型基于原文生成
 const answer=q=>{
  const a=H.state.ask,book=H.book(a.bookId),section=book.sections[Number(a.key.split(':')[1])],para=section.text[a.segments[0].p];
  const target=book.goal?(book.goal.learn||book.goal.gain):'';
  if(q==='解释这段')return `这段出自「${section.title}」。它所在的段落是：“${para.length>90?para.slice(0,90)+'…':para}” 真实回答会由模型用更直白的话重述这段，并说明它在本章里起什么作用。`;
  if(q==='举个例子')return `真实回答会由模型结合原文构造一个具体场景${target?`，优先贴近你的阅读目标“${target}”`:''}，并标明哪些内容是原文之外的补充。`;
  if(q==='和我的阅读目标有什么关系'){const words=target.split(/[，,、。；;\s]+/).filter(w=>w.length>=2),hits=words.filter(w=>a.quote.includes(w));return hits.length?`有直接关系。你想学会的「${hits.join('、')}」就在这段里，建议细读；读完本章后，相关知识点会优先考察。`:`关系不大。这段没有直接写到你想学会的「${target}」，可以先读过去，不影响理解目标相关的部分。`}
  return `原型无法回答自由提问。连接模型后，会结合这段文字、所在段落、本章原文和你的阅读目标，回答：“${q}”`;
 };
 const askSend=text=>{
  const a=H.state.ask;if(!text||a.loading)return;
  a.messages.push({role:'user',text});a.loading=true;a.draft='';H.render();
  setTimeout(()=>{if(H.state.ask!==a)return;a.messages.push({role:'ai',text:answer(text)});a.loading=false;H.render();const log=$('ask-log');if(log)log.scrollTop=log.scrollHeight},700);
 };
 // —— 首次使用：引导是一篇内置的 Markdown 文章，作为第一篇在读文章打开 ——
 // 原型里的简易解析：# 为标题，## 切分章节，空行分段；去掉行内的 Markdown 记号
 const parseGuide=md=>{
  const plain=t=>t.replace(/\*\*(.+?)\*\*/g,'$1').replace(/`(.+?)`/g,'$1').trim();
  const title=plain((md.match(/^# (.+)$/m)||[])[1]||'怎样用厚');
  const sections=md.split(/^## /m).slice(1).map(part=>{const [head,...rest]=part.split('\n');return {title:plain(head),text:rest.join('\n').split(/\n\s*\n/).map(p=>plain(p.replace(/\n/g,''))).filter(Boolean)}});
  if(!sections.length)throw new Error('引导文章没有章节');
  return {title,sections};
 };
 const openGuide=async()=>{
  let guide;
  try{const response=await fetch('guide.md');if(!response.ok)throw new Error(`HTTP ${response.status}`);guide=parseGuide(await response.text())}catch(error){H.toast(`无法读取引导：${error.message}。请通过本地服务器打开原型。`);return}
  const id=`guide-${H.state.books.filter(x=>x.guide).length+1}`;
  H.state.books.push({id,title:guide.title,type:'引导',kind:'article',status:'reading',guide:true,author:'《厚》内置',description:'第一次使用《厚》，从这里开始。',goal:null,goalHistory:[],chapter:0,paused:false,archived:false,sections:guide.sections});
  H.state.bookId=id;H.state.firstRun=false;H.state.sourceReturn=false;H.go('reader');
 };
 const resetToFirstRun=()=>{
  Object.assign(H.state,{books:[],tasks:[],records:[],marks:{},notes:{},completed:[],skipped:[],asks:{},ask:null,selTool:null,extraction:null,game:null,firstRun:true,bookId:null});
  H.state.providers=[];Object.assign(H.state.config,{chat:null,ocr:null});
  H.go('welcome');
 };
 const providerModal=type=>{
  const anthropic=type==='anthropic';
  const html=modalHead('添加模型服务')+`<div class="tabs" role="tablist" aria-label="服务类型">${Object.entries(H.providerTypes).map(([v,label])=>b(label,'provider-type','',`data-value="${v}" role="tab" aria-selected="${type===v}" tabindex="${type===v?0:-1}"`)).join('')}</div><p class="caption" style="margin-top:12px">${anthropic?'使用 Anthropic 官方接口。':'大多数云端服务，以及本机运行的模型（Ollama、vLLM、LM Studio 等）都支持这个协议。'}</p><div class="form-field"><label for="provider-name">名称</label><input id="provider-name" value="${anthropic?'Claude':'本机 Ollama'}" autocomplete="off"></div><div class="form-field"><label for="provider-url">服务地址</label><input id="provider-url" type="url" value="${anthropic?'https://api.anthropic.com':'http://localhost:11434/v1'}" autocomplete="off"></div><div class="form-cols"><div class="form-field"><label for="provider-model">模型名</label><input id="provider-model" placeholder="${anthropic?'例如 claude-opus-5-5':'例如 glm-ocr'}" autocomplete="off"></div><div class="form-field"><label for="provider-key">密钥${anthropic?'':'（本机服务可留空）'}</label><input id="provider-key" type="password" autocomplete="new-password" placeholder="本次会话内暂存"></div></div><p id="provider-error" class="field-error" role="alert" hidden></p><div class="form-actions">${b('取消','close-modal','text-button')}${b('添加','save-provider','primary',`data-value="${type}"`)}</div>`;
  if(dialog.open){$('dialog-body').innerHTML=html;dialog.querySelector('[role="tab"][aria-selected="true"]').focus()}else H.modal(html);
 };
 // 引导只在讲"标记读完"的那一章生成一次示例考察，其余章节标记读完不提取
 const GUIDE_DEMO=()=>({points:[HouData.guide.points[1][0],HouData.guide.points[4][0],HouData.guide.points[5][0]],questions:[HouData.guide.questions[1][0],HouData.guide.questions[4][0],HouData.guide.questions[5][1]]});
 const guideDemoChapter=book=>book.sections.findIndex(s=>s.title.includes('标记读完'));
 // 来源标注：本地示例按段落判断，知识点所在段落有高亮或问过 AI 时标注
 const sourcesOf=(book,chapter,paragraph)=>{const key=`${book.id}:${chapter}`,out=[];if((H.state.marks[key]||[]).some(m=>m.p===paragraph))out.push('你高亮过');if((H.state.asks[key]||[]).some(a=>a.segments.some(g=>g.p===paragraph)))out.push('你问过');return out};
 // 粘贴正文导入：导入即在读，然后填写阅读目标
 const importText=(title,text)=>{const id=crypto.randomUUID();H.state.books.push({id,title,type:'正文',kind:'article',status:'reading',goal:null,goalHistory:[],author:'你导入的内容',description:'来自粘贴的正文。',chapter:0,paused:false,archived:false,sections:[{title:'全文',text:text.split(/\n\s*\n|\n/).filter(Boolean)}]});H.state.bookId=id;H.state.sourceReturn=false;H.go('reader');goalModal(id,true)};
 // 重新打开一段问答：问过的文字和本章划线列表都可以点开
 const openAsk=id=>{const entry=Object.values(H.state.asks).flat().find(a=>a.id===id);if(!entry)throw new Error('找不到问答：'+id);H.state.ask=entry;H.state.selTool=null;H.render();requestAnimationFrame(()=>$('ask-input')?.focus())};
 const extract=()=>{
  const book=H.book(H.state.bookId),section=book.sections[book.chapter],key=`${book.id}:${book.chapter}`;
  if(book.guide&&book.chapter!==guideDemoChapter(book)){if(!H.state.completed.includes(key))H.state.completed.push(key);H.render();H.toast('引导不逐章提取知识点。读到「标记读完，留下知识点」那一章，会生成一次示例考察。');return}
  const already=H.state.completed.includes(key)&&!book.guide;
  H.state.extraction={book:book.id,section:book.chapter,loading:true,points:[],more:already};H.go('extract');const token=++generation;
  clearTimeout(timer);timer=setTimeout(()=>{
   if(token!==generation||H.state.route!=='extract')return;
   const existing=H.state.tasks.filter(t=>t.book===book.id&&t.section===book.chapter);
   let points;
   if(already){points=existing.filter(t=>t.status==='excluded').map(t=>({title:t.title,text:t.description,removed:true,sources:t.sources}));H.state.extraction.kept=existing.length-points.length}
   else if(book.guide)points=GUIDE_DEMO().points.map(p=>({title:p.title,text:p.text,removed:false}));
   else if(existing.length)points=existing.map(t=>({title:t.title,text:t.description,removed:false,relevance:t.relevance,relevanceReason:t.relevanceReason,manual:t.relevanceManual,sources:t.sources}));
   else points=section.text.slice(0,3).map((p,i)=>({title:section.text.length===1?section.title:`${section.title} · 要点 ${i+1}`,text:p,removed:false,sources:sourcesOf(book,book.chapter,i)}));
   if(book.goal&&!already){const order={high:0,mid:1,low:2};points.forEach(p=>{if(!p.relevance)Object.assign(p,relevanceOf(book.goal,p.title,p.text))});points.sort((a,b)=>order[a.relevance]-order[b.relevance])}
   H.state.extraction.points=points;H.state.extraction.loading=false;H.render(true);
  },900);
 };
 const confirmExtraction=()=>{
  const x=H.state.extraction,kept=x.points.filter(p=>!p.removed),key=`${x.book}:${x.section}`;
  if(!H.state.completed.includes(key))H.state.completed.push(key);
  if(H.book(x.book).guide){const demo=GUIDE_DEMO();if(!H.state.tasks.some(t=>t.book===x.book&&t.demo))H.state.tasks.push({id:crypto.randomUUID(),book:x.book,section:x.section,title:'示例考察：怎样用厚',description:'用三道题体验一次考察，题目是写好的，不需要模型。',level:'理解',minutes:3,status:'pending',mastery:1,reason:'引导自带的示例考察。',guide:true,demo:true,questions:demo.questions});H.go('today');H.toast('示例考察已加入待完成。做完后，引导会自动归档。');return}
  x.points.forEach(p=>{const existing=H.state.tasks.find(t=>t.book===x.book&&t.section===x.section&&t.title===p.title);const rel=p.relevance?{relevance:p.relevance,relevanceReason:p.relevanceReason,relevanceManual:!!p.manual}:{};if(existing)Object.assign(existing,rel);if(existing&&p.removed)existing.status='excluded';else if(existing&&existing.status==='excluded')existing.status='pending';else if(!existing&&!p.removed)H.state.tasks.push({id:crypto.randomUUID(),book:x.book,section:x.section,title:p.title,description:p.text,level:'理解',minutes:3,status:'pending',mastery:1,reason:p.relevance==='high'?'与阅读目标高度相关，优先安排首次考察。':'章节读完后，首次从基础识别开始考察。',custom:true,sources:p.sources||[],...rel})});
  H.go('today');H.toast(kept.length?`已保留 ${kept.length} 个知识点。首次示例考察已加入待完成。`:'未保留知识点，本章节已标记读完。');
 };
 const DAY=24*60*60*1000;
 // 固定间隔：档位不降且没有误解时按 1、3、7、21 天拉长；出现误解或降档回到 1 天
 const INTERVALS=[1,3,7,21];
 const schedule=(t,before,level,mistake)=>{
  const reset=mistake||level<before;t.step=reset?0:Math.min((t.step??-1)+1,INTERVALS.length-1);const days=INTERVALS[t.step];
  return {next:days===1?'明天 · 20:00':`${days} 天后 · 20:00`,planReason:reset?'出现误解或档位下降，间隔回到 1 天，尽快换个角度再考。':days===1?'档位没有下降。从 1 天的间隔开始，之后逐步拉长到 3、7、21 天。':`档位没有下降，间隔拉长到 ${days} 天。`};
 };
 // 本地示例判断：选择题、判断题按标准答案；主观题写满 15 个字算要点到位。真实判断由模型综合本次与历次作答给出
 const TYPE_LEVEL={choice:2,judge:2,explain:3,apply:4};
 const judge=(g,before)=>{
  const subjective=g.questions.map((q,i)=>H.auto(q)?null:String(g.answers[i]).trim().length>=15);
  const passed=g.questions.map((q,i)=>H.auto(q)?g.answers[i]===q.correct:subjective[i]);
  const mistake=passed.includes(false),reached=Math.max(1,...g.questions.map((q,i)=>passed[i]?TYPE_LEVEL[q.type]:1));
  const level=mistake?Math.max(1,Math.min(reached,before)):Math.max(reached,before);
  return {level,mistake,subjective,reason:mistake?'（示例）有题目没有答到要点，掌握程度暂不提升。':'（示例）各题都答到了要点，掌握程度按最高的题型确认。'};
 };
 const afterJudge=t=>{if(!t.demo)return;const guide=H.book(t.book);if(guide.archived)return;Object.assign(guide,{status:'done',archived:true,endedAt:today()});H.toast('示例考察完成，引导已归档。现在可以导入你自己的书和文章了。')};
 const finishGame=()=>{
  const g=H.state.game,t=task(g.taskId);if(g.questions.some((q,i)=>H.auto(q)?g.answers[i]===undefined:!String(g.answers[i]??'').trim()))throw new Error('作答不完整，不能提交考察');
  const r=addRecord({taskId:t.id,trigger:g.trigger,status:'complete',questions:structuredClone(g.questions),answers:[...g.answers],notes:[...g.notes],operations:[...g.operations,{action:'submit',at:new Date().toISOString()}],judging:true});
  t.status='judging';t.draft=null;H.go('result');
  setTimeout(()=>{
   const before=t.mastery,res=judge(g,before),plan=schedule(t,before,res.level,res.mistake);
   Object.assign(r,{judging:false,level:res.level,reason:res.reason,subjective:res.subjective},plan);
   t.mastery=res.level;t.status='scheduled';t.when=plan.next;t.reason=plan.planReason;
   afterJudge(t);
   if(H.state.recordId===r.id&&H.state.route==='result')H.render();
  },1500);
 };
 // 异议：写下理由，模型结合理由复核一次，以复核结果为准；原判断、理由和复核结果都记录
 const dispute=()=>{
  const r=H.state.records.find(x=>x.id===H.state.recordId);
  if(r.dispute){H.modal(modalHead('复核记录')+`<div class="review-trail"><div><span class="caption">原判断</span><p>${HouData.levels[r.level-1]} · ${e(r.reason)}</p></div><div><span class="caption">你的理由</span><p>${e(r.dispute)}</p></div><div><span class="caption">复核结果（以此为准）</span><p>${r.reviewing?'正在复核':`${HouData.levels[r.reviewLevel-1]} · ${e(r.reviewReason)}`}</p></div></div>`);return}
  H.modal(modalHead('对结果有异议')+`<p class="muted">写下你的理由。模型会结合理由复核一次，以复核结果为准；原判断、你的理由和复核结果都会记录。</p><div class="form-field"><label for="dispute-reason">你的理由</label><textarea id="dispute-reason" rows="4" placeholder="例如：我理解这个概念，只是用词不严谨。"></textarea></div><p id="dispute-error" class="field-error" role="alert" hidden></p><div class="form-actions">${b('取消','close-modal','text-button')}${b('提交复核','submit-dispute','primary')}</div>`);
 };
 const actions={
  today:()=>H.go('today'),library:()=>H.go('library'),settings:()=>H.go('settings'),records:()=>H.go('records'),schedule:()=>H.go('schedule'),reader:()=>H.go('reader'),
  start:el=>{H.closePanel();H.start(el.dataset.id)},claim,'queue':queue,'close-panel':()=>{H.closePanel();$('queue-button').focus()},'close-toast':()=>{clearTimeout(toastTimer);leave($('toast'),()=>{$('toast').hidden=true})},'close-modal':H.closeModal,
  'claim-library':()=>{H.closeModal();H.go('library')},filter:el=>{H.state.filter=el.dataset.value;H.render()},
  read:el=>{if(el.dataset.id)H.state.bookId=el.dataset.id;H.state.sourceReturn=false;H.go('reader')},'continue-reading':()=>{const id=$('mini-title').dataset.id;if(!id){showImport('file');return}H.state.bookId=id;H.state.sourceReturn=false;H.go('reader')},
  chapter:el=>{H.book(H.state.bookId).chapter=Number(el.dataset.index);H.state.sourceReturn=false;H.state.selTool=null;H.render(true)},
  'sel-highlight':()=>{const t=H.state.selTool;addMarks(chapterKey(),t.segments,'');H.state.selTool=null;H.render();H.toast(t.segments.length>1?`已高亮，跨 ${t.segments.length} 段分别记录。`:'已高亮。')},
  'sel-unmark':()=>{const {key,m}=findMark(H.state.selTool.id);H.state.marks[key]=H.state.marks[key].filter(x=>x!==m);H.state.selTool=null;H.render();H.toast(m.note?'已取消高亮，批注一并删除。':'已取消高亮。')},
  'sel-note':()=>{const t=H.state.selTool;H.modal(modalHead(t.mode==='mark'&&t.note?'批注':'写批注')+`<blockquote class="ask-quote">${e(t.quote)}</blockquote><div class="form-field"><label for="mark-note">你的想法</label><textarea id="mark-note" rows="3" placeholder="写下联系、疑问，或自己的理解。">${e(t.note||'')}</textarea><span class="caption">批注会挂在这段文字的高亮上。</span></div><div class="form-actions">${b('保存批注','save-mark-note','primary')}</div>`)},
  'save-mark-note':()=>{const t=H.state.selTool,text=$('mark-note').value.trim();if(t.mode==='mark')findMark(t.id).m.note=text;else addMarks(chapterKey(),t.segments,text);H.state.selTool=null;H.closeModal();H.render();H.toast(text?'批注已保存，这段文字已高亮。':'已高亮，没有写批注。')},
  'sel-copy':()=>{const t=H.state.selTool;H.state.selTool=null;H.render();(navigator.clipboard?.writeText(t.quote)??Promise.reject()).then(()=>H.toast('已复制。'),()=>H.toast('浏览器不允许复制，请手动复制。'))},
  'sel-ask':()=>{const t=H.state.selTool,key=chapterKey(),entry={id:crypto.randomUUID(),bookId:H.state.bookId,key,segments:t.segments,quote:t.quote,messages:[],loading:false,draft:''};(H.state.asks[key]||=[]).push(entry);H.state.ask=entry;H.state.selTool=null;H.render();requestAnimationFrame(()=>$('ask-input')?.focus())},
  'open-ask':el=>openAsk(el.dataset.id),
  'ask-preset':el=>askSend(el.dataset.value),'ask-send':()=>askSend($('ask-input').value.trim()),'ask-close':()=>{H.state.ask=null;H.render()},
  'ask-save':el=>{const a=H.state.ask,i=Number(el.dataset.index);addMarks(a.key,a.segments,`问：${a.messages[i-1].text}\n答：${a.messages[i].text}`);a.messages[i].saved=true;H.render();H.toast('回答已存为批注。')},
  'goto-mark':el=>{const node=content.querySelector(`mark[data-mark="${CSS.escape(el.dataset.id)}"]`);if(!node)return;node.scrollIntoView({block:'center',behavior:H.state.reduceMotion?'auto':'smooth'});node.classList.add('flash');setTimeout(()=>node.classList.remove('flash'),1200)},
  'book-detail':el=>{H.state.bookId=el.dataset.id;H.go('book-detail')},
  'book-menu':el=>{const book=H.book(el.dataset.id);if(book.archived){const held=H.slot(book.kind);H.modal(modalHead(book.title)+`<div class="od-stack gap-16">${book.status==='done'?b('查看回顾','modal-review','secondary',`data-id="${e(book.id)}"`):''}${b('查看章节与掌握程度','modal-book-detail','secondary',`data-id="${e(book.id)}"`)}${b('重新开始读','restart-book','secondary',`data-id="${e(book.id)}" ${held?'disabled':''}`)}${held?`<p class="caption">${H.kinds[book.kind].name}的在读名额被占用，读完或放弃那一${book.kind==='book'?'本':'篇'}后才能重新开始。</p>`:''}${b('彻底删除','delete-confirm','text-button',`data-id="${e(book.id)}"`)}</div>`);return}H.modal(modalHead(book.title)+`<div class="od-stack gap-16">${b('查看章节与掌握程度','modal-book-detail','secondary',`data-id="${e(book.id)}"`)}${b(book.paused?'恢复考察':'暂停考察','pause-book','secondary',`data-id="${e(book.id)}"`)}${b(book.goal?'修改阅读目标':'写下阅读目标','modal-goal','secondary',`data-id="${e(book.id)}"`)}${b('放弃这'+(book.kind==='book'?'本':'篇'),'abandon','text-button',`data-id="${e(book.id)}"`)}</div>`)},'modal-goal':el=>goalModal(el.dataset.id,false),
  'modal-book-detail':el=>{H.closeModal();actions['book-detail'](el)},
  'pause-book':el=>{const book=H.book(el.dataset.id);book.paused=!book.paused;if(dialog.open)H.closeModal();H.render();H.toast(book.paused?'考察已暂停。阅读与历史记录会保留。':'已恢复这份内容的考察安排。')},
  abandon:el=>{const book=H.book(el.dataset.id),unit=book.kind==='book'?'本':'篇';H.modal(modalHead(`放弃这${unit}？`)+`<p class="archive-name">${e(book.title)}</p><p class="muted">放弃后归档，标记为“未读完”，空出${H.kinds[book.kind].name}的在读名额。归档后不能再继续读，只能回看；已提取的知识点按“旧书复习”设置处理。</p><div class="form-field"><label for="abandon-reason">为什么不读了</label><textarea id="abandon-reason" rows="3" placeholder="例如：内容和我的目标关系不大。"></textarea><span class="caption">必填。理由会一直留在归档里。</span></div><p id="abandon-error" class="field-error" role="alert" hidden></p><div class="form-actions">${b('继续读','close-modal','text-button')}${b('确认放弃','abandon-confirm','primary',`data-id="${e(book.id)}"`)}</div>`)},
  'abandon-confirm':el=>{const reason=$('abandon-reason').value.trim();if(!reason){$('abandon-error').textContent='请写下放弃的理由。';$('abandon-error').hidden=false;$('abandon-reason').focus();return}const book=H.book(el.dataset.id);book.status='abandoned';book.archived=true;book.abandonReason=reason;book.endedAt=today();H.closeModal();if(['reader','extract'].includes(H.state.route)&&H.state.bookId===book.id)H.go('library');else H.render();H.toast(`已放弃并归档，${H.kinds[book.kind].name}的在读名额空出来了。`,{label:'撤销',action:'undo-abandon',id:book.id})},
  'undo-abandon':el=>{const book=H.book(el.dataset.id);if(!book?.archived)return;if(H.slot(book.kind)){H.toast(`${H.kinds[book.kind].name}的在读名额已被占用，不能撤销。`);return}Object.assign(book,{status:'reading',archived:false,abandonReason:null,endedAt:null});clearTimeout(toastTimer);leave($('toast'),()=>{$('toast').hidden=true});H.render();H.toast('已撤销放弃，回到在读。')},
  'modal-review':el=>{H.closeModal();actions.review(el)},
  'restart-book':el=>{const book=H.book(el.dataset.id);if(H.slot(book.kind))return;Object.assign(book,{status:'reading',archived:false,abandonReason:null,endedAt:null});H.closeModal();H.state.filter='active';H.render();H.toast('已重新开始读，阅读位置、已读章节和知识点都保留。读完后会重新回顾。')},
  'delete-confirm':el=>{const book=H.book(el.dataset.id);$('dialog-body').innerHTML=modalHead('彻底删除？')+`<p class="archive-name">${e(book.title)}</p><p class="muted">会删除原文件、图片、高亮、问答、知识点和考察记录；运行记录里只保留"已删除的读物"占位。删除后不能恢复。</p><div class="form-actions">${b('取消','close-modal','text-button')}${b('彻底删除','delete-book','primary',`data-id="${e(book.id)}"`)}</div>`},
  'delete-book':el=>{const book=H.book(el.dataset.id),ids=new Set(H.state.tasks.filter(t=>t.book===book.id).map(t=>t.id));H.state.books=H.state.books.filter(x=>x!==book);H.state.tasks=H.state.tasks.filter(t=>!ids.has(t.id));for(const store of [H.state.marks,H.state.notes,H.state.asks])for(const key of Object.keys(store))if(key.startsWith(book.id+':'))delete store[key];H.state.completed=H.state.completed.filter(k=>!k.startsWith(book.id+':'));H.state.skipped=H.state.skipped.filter(k=>!k.startsWith(book.id+':'));H.state.records.forEach(r=>{if(ids.has(r.taskId))r.deleted=true});if(H.state.bookId===book.id)H.state.bookId=null;H.closeModal();H.render();H.toast('已彻底删除。')},
  'skip-chapter':()=>{const book=H.book(H.state.bookId),key=chapterKey();const on=!H.state.skipped.includes(key);H.state.skipped=on?[...H.state.skipped,key]:H.state.skipped.filter(k=>k!==key);H.render();H.toast(on?'本章已跳过，不提取、不考察。':'已取消跳过。')},
  'finish-guide':el=>{const book=H.book(el.dataset.id);Object.assign(book,{status:'done',archived:true,endedAt:today()});H.go('today');H.toast('引导已读完并归档。现在可以导入你自己的书和文章了。')},
  'import-anyway':()=>{const p=H.state.pendingImport;H.state.pendingImport=null;H.closeModal();importText(p.title,p.text)},
  'finish-confirm':el=>{const book=H.book(el.dataset.id);H.modal(modalHead('全书读完？')+`<p class="archive-name">${e(book.title)}</p><p class="muted">读完后归档，空出${H.kinds[book.kind].name}的在读名额，并对照阅读目标做一次回顾。</p><div class="form-actions">${b('再看看','close-modal','text-button')}${b('读完，去回顾','finish-book','primary',`data-id="${e(book.id)}"`)}</div>`)},
  'finish-book':el=>{const book=H.book(el.dataset.id);book.status='done';book.archived=true;book.endedAt=today();H.state.bookId=book.id;H.closeModal();H.go('review')},
  review:el=>{H.state.bookId=el.dataset.id;H.go('review')},
  'review-source':el=>{const t=task(el.dataset.id);H.state.bookId=t.book;H.book(t.book).chapter=t.section;H.state.sourceReturn=false;H.go('reader')},
  'save-reflection':el=>{H.book(el.dataset.id).reflection=$('reflection').value.trim();H.toast('观点已保存。')},
  goal:el=>goalModal(el.dataset.id,false),'save-goal':el=>saveGoal(el.dataset.id,el.dataset.first==='true'),'skip-goal':()=>{H.closeModal();H.toast('已导入，开始读吧。阅读器顶部随时可以写下阅读目标。')},
  'set-relevance':el=>{const p=H.state.extraction.points[Number(el.dataset.index)];p.relevance=el.dataset.value;p.relevanceReason='由你调整。';p.manual=true;H.render()},
  'open-guide':openGuide,'welcome-skip-config':()=>{H.state.configSkipped=true;H.render();H.toast('已跳过。引导不需要模型服务，读完后导入自己的内容前再配置。')},'welcome-config':()=>{H.state.configFromWelcome=true;H.go('settings')},'back-welcome':()=>H.go('welcome'),
  'first-run-confirm':()=>H.modal(modalHead('从头体验首次使用？')+'<p class="muted">会清空本次会话中的读物、高亮、考察和记录，回到第一次打开《厚》的样子。示例数据刷新页面即可恢复。</p><div class="form-actions">'+b('取消','close-modal','text-button')+b('清空并开始','first-run','primary')+'</div>'),'first-run':()=>{H.closeModal();resetToFirstRun()},
  'toggle-old-review':()=>{H.state.config.oldReview=!H.state.config.oldReview;H.render();H.toast(H.state.config.oldReview?'归档内容的知识点会继续按计划出题。':'归档内容不再出题，掌握程度和记录都保留。')},
  import:()=>showImport(H.slot('book')&&!H.slot('article')?'text':'file'),'import-kind':el=>showImport(el.dataset.value==='book'?'file':'text'),'quota-read':el=>{H.closeModal();actions.read(el)},'import-tab':el=>showImport(el.dataset.value),
  'import-web':()=>{const input=$('import-url'),value=input.value.trim();let url;try{url=new URL(value)}catch{importError('请填写完整的网页链接，例如 https://example.com/article。');return}if(!['https:','http:'].includes(url.protocol)){importError('网页链接必须使用 http 或 https。');return}importError('当前原型没有接入网页正文提取，无法抓取这个链接。请切换到“正文”，粘贴文章内容后导入。')},
  'import-text':()=>{const title=$('import-title').value.trim(),text=$('import-text').value.trim();if(!title||!text){importError(!title?'请填写内容标题。':'请粘贴正文后再导入。');return}if(H.slot('article')){showImport('text');return}const same=H.state.books.find(x=>x.title===title&&!x.guide);if(same){H.state.pendingImport={title,text};$('dialog-body').innerHTML=modalHead('书架里已经有这篇')+`<p class="archive-name">${e(same.title)}</p><p class="muted">${same.archived?`已归档 · ${H.ended(same)}`:'正在读'}。可以打开已有的那一份，也可以仍然导入为新的一份。</p><div class="form-actions">${b('仍然导入','import-anyway','text-button')}${b('打开已有的','quota-read','primary',`data-id="${e(same.id)}"`)}</div>`;return}importText(title,text)},
  annotation:()=>{const key=`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;H.modal(modalHead('留下一点想法')+`<div class="form-field"><label for="note-text">本章批注</label><textarea id="note-text" placeholder="写下联系、疑问，或自己的理解。">${e(H.state.notes[key]||'')}</textarea></div><div class="form-actions">${b('保存批注','save-note','primary')}</div>`)},
  'save-note':()=>{const key=`${H.state.bookId}:${H.book(H.state.bookId).chapter}`;H.state.notes[key]=$('note-text').value.trim();H.closeModal();H.render();H.toast('批注已保存在本次会话。')},
  'extract-start':extract,'toggle-point':el=>{const p=H.state.extraction.points[Number(el.dataset.index)];p.removed=!p.removed;H.render()},'confirm-extraction':confirmExtraction,
  delay:el=>showDelay(el.dataset.id),'apply-delay':el=>{const t=task(H.state.delayId);t.status='scheduled';t.when=el.dataset.value;t.reason='由你主动延后，按自己的节奏继续。';H.closeModal();H.render();H.toast(`已延后到${t.when}。`)},
  reason:el=>{const t=task(el.dataset.id);H.modal(modalHead('为什么是这个安排？')+`<h3>${e(t.title)}</h3><p class="footnote">${e(t.when)} · ${t.level} · 约 ${t.minutes} 分钟</p><p style="margin-top:24px">${e(t.reason)}</p><div class="notice" style="margin-top:24px">这是预设的示例安排，真实计划器尚未连接。</div><div class="form-actions">${b('调整时间','modal-delay','secondary',`data-id="${e(t.id)}"`)}</div>`)},'modal-delay':el=>{H.closeModal();showDelay(el.dataset.id)},
  choose:el=>{const g=H.state.game;if(g.readonly)return;saveGameNote();g.answers[g.step]=Number(el.dataset.index);g.operations.push({action:'choose',step:g.step,value:Number(el.dataset.index),at:new Date().toISOString()});H.render();content.querySelector(`[data-action="choose"][data-index="${el.dataset.index}"]`)?.focus()},
  'game-next':()=>{const g=H.state.game,q=g.questions[g.step];saveGameNote();if(!g.readonly){const missing=q.type==='judge'&&!String(g.notes[g.step]??'').trim()?'请写一句理由。':!H.auto(q)&&!String(g.answers[g.step]??'').trim()?'请先写下你的回答。':'';g.error=missing;if(missing){H.render();$('explanation')?.focus();return}}if(g.step<g.questions.length-1){g.step++;H.render(true)}else if(g.readonly)H.go('log');else finishGame()},
  'game-prev':()=>{saveGameNote();H.state.game.error='';H.state.game.step--;H.render(true)},'retry-game':()=>H.start(H.state.game.taskId,H.state.game.trigger),
  'exit-game':()=>{const g=H.state.game;clearTimeout(timer);generation++;if(g.readonly){H.go('log');return}saveGameNote();if(g.phase!=='playing'){task(g.taskId).status='pending';H.go('today');return}addRecord({taskId:g.taskId,trigger:g.trigger,status:'interrupted',operations:g.operations,answers:g.answers,notes:g.notes});const t=task(g.taskId);t.status='pending';t.draft={questions:g.questions,answers:[...g.answers],notes:[...g.notes],operations:[...g.operations],at:Date.now()};H.go('today');H.toast('考察已回到待完成列表。题目和作答已保存，24 小时内打开会接着做。')},
  source:el=>{const t=task(el.dataset.id);H.state.bookId=t.book;H.book(t.book).chapter=t.section;H.state.sourceReturn=true;H.go('reader')},'return-result':()=>{H.state.sourceReturn=false;H.go('result')},
  dispute,'submit-dispute':()=>{const reason=$('dispute-reason').value.trim();if(!reason){$('dispute-error').textContent='请写下你不同意的理由。';$('dispute-error').hidden=false;return}const r=H.state.records.find(x=>x.id===H.state.recordId),t=task(r.taskId);r.dispute=reason;r.reviewing=true;H.closeModal();H.render();setTimeout(()=>{const up=reason.length>=10;r.reviewing=false;r.reviewLevel=Math.min(5,r.level+(up?1:0));r.reviewReason=up?'（示例）结合你的理由，你的回答抓住了要点，只是表述不严谨，调高一档。':'（示例）理由不足以改变判断，维持原档位。';if(up){Object.assign(r,schedule(t,r.level,r.reviewLevel,false));t.mastery=r.reviewLevel;t.when=r.next;t.reason=r.planReason}if(H.state.recordId===r.id&&H.state.route==='result')H.render();H.toast('复核完成，以复核结果为准。')},1500)},
  log:el=>{H.state.recordId=el.dataset.id;H.go('log')},'record-result':el=>{H.state.recordId=el.dataset.id;H.go('result')},
  replay:el=>{const r=H.state.records.find(x=>x.id===el.dataset.id);H.state.game={taskId:r.taskId,phase:'playing',step:0,readonly:true,questions:r.questions,answers:r.answers,notes:r.notes};H.go('game')},
  theme:el=>{H.state.theme=el.dataset.value;H.render()},'toggle-theme':()=>{H.state.theme=H.state.theme==='light'?'dark':'light';H.render()},'reduce-motion':()=>{H.state.reduceMotion=!H.state.reduceMotion;H.render()},
  shortcut:()=>H.modal(modalHead('主动领取快捷键')+`<div class="form-field"><label for="shortcut-input">按下新的组合键</label><input id="shortcut-input" readonly value="${e(H.state.config.shortcut)}"><span class="caption">至少包含 Command 或 Control 加一个字母。本页面内生效。</span></div><div class="form-actions">${b('保存快捷键','save-shortcut','primary')}</div>`),
  'save-shortcut':()=>{const value=$('shortcut-input').value;if(!/(⌘|Ctrl)/.test(value)){H.toast('请使用 Command 或 Control 加一个字母。');return}H.state.config.shortcut=value;H.closeModal();H.render();H.toast('快捷键已更新，仅在本页面生效。')},
  'toggle-autostart':()=>{H.state.config.autoStart=!H.state.config.autoStart;H.render();H.toast(H.state.config.autoStart?'开机后会自动在菜单栏启动。':'已关闭开机自启；关闭窗口后仍会留在菜单栏。')},
  'add-provider':()=>providerModal('anthropic'),'provider-type':el=>providerModal(el.dataset.value),
  'save-provider':el=>{
   const type=el.dataset.value,name=$('provider-name').value.trim(),url=$('provider-url').value.trim(),model=$('provider-model').value.trim(),key=$('provider-key').value.trim(),error=$('provider-error');
   let parsed;try{parsed=new URL(url)}catch{error.textContent='请填写完整的服务地址。';error.hidden=false;return}
   if(!['http:','https:'].includes(parsed.protocol)||!model||!name){error.textContent='请填写名称、模型名，并使用 http 或 https 地址。';error.hidden=false;return}
   if(type==='anthropic'&&!key){error.textContent='Anthropic 服务需要密钥。';error.hidden=false;return}
   const p={id:crypto.randomUUID(),name,type,url,model,tested:false};H.state.providers.push(p);if(!H.state.config.chat)H.state.config.chat=p.id;H.closeModal();
   if(H.state.configFromWelcome&&H.state.firstRun){H.state.configFromWelcome=false;H.go('welcome');H.toast('模型服务已添加，并指定为对话服务。接下来开始读引导。');return}
   H.render();H.toast(H.state.config.chat===p.id?'已添加，并指定为对话服务。':'已添加。可以在下方为对话或 OCR 指定它。')},
  'test-provider':el=>{const p=H.provider(el.dataset.id);p.testing=true;H.render();setTimeout(()=>{p.testing=false;p.tested=true;H.render();H.toast(`${p.name}：模拟连接成功（原型不发送请求）。`)},800)},
  'remove-provider':el=>{const p=H.provider(el.dataset.id);H.state.providers=H.state.providers.filter(x=>x!==p);for(const k of ['chat','ocr'])if(H.state.config[k]===p.id)H.state.config[k]=null;H.render();H.toast(`已删除 ${p.name}。`)},
  notification:()=>H.modal(modalHead('有一份理解，值得再看看。')+`<p class="muted">${H.pending().length?`有 ${H.pending().length} 次考察待完成，做一次只要几分钟。`:'当前没有到期的考察，也可以主动领取。'}</p><p class="footnote">这是通知样式预览，不会发送系统通知。</p><div class="form-actions">${b('稍后再做','close-modal','text-button')}${b('领取考察','notification-start','primary')}</div>`),'notification-start':()=>{H.closeModal();claim()}
 };
 document.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el||el.disabled)return;const handler=actions[el.dataset.action];if(!handler)throw new Error('未实现的操作：'+el.dataset.action);handler(el)});
 document.addEventListener('change',event=>{if(event.target.id==='file-input')fileSelected(event.target.files[0]);if(event.target.id==='use-chat'||event.target.id==='use-ocr'){H.state.config[event.target.id==='use-chat'?'chat':'ocr']=event.target.value||null;H.render()}});
 document.addEventListener('focusout',event=>{if(event.target.id==='import-title'&&!event.target.value.trim()){importError('请填写内容标题。')}if(event.target.id==='import-text'&&!event.target.value.trim()){importError('请粘贴正文后再导入。')}});
 document.addEventListener('keydown',event=>{
  if(event.target.id==='shortcut-input'){event.preventDefault();if((event.metaKey||event.ctrlKey)&&/^[a-z]$/i.test(event.key))event.target.value=[event.metaKey?'⌘':'Ctrl',event.shiftKey?'⇧':'',event.altKey?'⌥':'',event.key.toUpperCase()].filter(Boolean).join(' ');return}
  if(event.key==='Enter'&&!event.shiftKey&&event.target.id==='ask-input'&&!event.isComposing){event.preventDefault();actions['ask-send']();return}
  if(event.key==='Escape'){if(dialog.open){event.preventDefault();H.closeModal();return}if(H.state.selTool){H.state.selTool=null;H.render();return}if(!$('queue-overlay').hidden){H.closePanel();$('queue-button').focus();return}if(H.state.route==='game')actions['exit-game']();return}
  if(event.key==='Enter'&&event.target.id==='import-title'){event.preventDefault();actions['import-text']();return}
  if(event.key==='Enter'&&event.target.id==='import-url'){event.preventDefault();actions['import-web']();return}
  if((event.metaKey||event.ctrlKey)&&!dialog.open&&!['INPUT','TEXTAREA'].includes(event.target.tagName)){const c=H.state.config.shortcut,match=c.endsWith(event.key.toUpperCase())&&c.includes('⇧')===event.shiftKey&&c.includes('⌥')===event.altKey;if(match){event.preventDefault();if(H.state.route!=='game')claim()}}
  // 单选组与标签组：方向键在组内移动并选中，焦点跟随新选中项；点击会重新渲染，按分组名称重新找到节点
  const item=event.target.closest('[role="radio"],[role="tab"]'),role=item?.getAttribute('role'),step={ArrowLeft:-1,ArrowRight:1,...(role==='radio'?{ArrowUp:-1,ArrowDown:1}:{})}[event.key];
  if(item&&step){event.preventDefault();const label=item.parentElement.getAttribute('aria-label'),options=[...item.parentElement.querySelectorAll(`[role="${role}"]`)],n=(options.indexOf(item)+step+options.length)%options.length;options[n].click();const group=document.querySelector(`[aria-label="${label}"]`);if(!group)throw new Error('方向键切换后找不到分组：'+label);group.querySelectorAll(`[role="${role}"]`)[n].focus()}
 });
 document.addEventListener('dragover',event=>{if(event.target.closest('#dropzone')){event.preventDefault();$('dropzone').classList.add('dragging')}});
 document.addEventListener('dragleave',event=>{if(event.target.closest('#dropzone'))$('dropzone')?.classList.remove('dragging')});
 document.addEventListener('drop',event=>{if(event.target.closest('#dropzone')){event.preventDefault();$('dropzone').classList.remove('dragging');fileSelected(event.dataTransfer.files[0])}});
 // 记住阅读目标面板的展开状态，同页重新渲染时不收起
 document.addEventListener('toggle',event=>{if(event.target.classList?.contains('goal-panel'))H.state.goalOpen=event.target.open},true);
 document.addEventListener('mouseup',selectionEnd);
 // 触屏上长按选字后没有 mouseup，等选区稳定后再读取
 document.addEventListener('touchend',event=>setTimeout(()=>selectionEnd(event),350));
 document.addEventListener('keyup',event=>{if(event.shiftKey&&event.key.startsWith('Arrow'))selectionEnd(event)});
 // 点功能栏按钮时不要让选区消失
 document.addEventListener('mousedown',event=>{if(event.target.closest('#sel-toolbar'))event.preventDefault()});
 document.addEventListener('input',event=>{if(event.target.id==='ask-input'&&H.state.ask)H.state.ask.draft=event.target.value});
 dialog.addEventListener('cancel',event=>{event.preventDefault();H.closeModal()});
 $('queue-overlay').addEventListener('click',event=>{if(event.target===$('queue-overlay')){H.closePanel();$('queue-button').focus()}});
 $('queue-overlay').addEventListener('keydown',event=>{if(event.key!=='Tab')return;const nodes=[...$('queue-body').querySelectorAll('button')],first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
 let touchY=null;$('queue-body').addEventListener('touchstart',ev=>{touchY=ev.touches[0].clientY},{passive:true});$('queue-body').addEventListener('touchend',ev=>{if(touchY!==null&&ev.changedTouches[0].clientY-touchY>80&&$('queue-body').scrollTop===0)H.closePanel();touchY=null},{passive:true});
 // 地址带 ?first 时从首次使用开始，否则加载示例数据
 if(new URLSearchParams(location.search).has('first'))resetToFirstRun();else H.render();
})();
