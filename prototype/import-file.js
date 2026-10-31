// 导入文件的格式判断与提示文案，原型主流程（app.js）与组件展示窗口（components/demo.js）共用
window.HouImport = {
  fileMessage: name => /\.(pdf|epub)$/i.test(name)
    ? `已选择“${name}”。当前原型尚未接入 ${name.split('.').pop().toUpperCase()} 正文解析，文件未导入。请切换到“正文”完成阅读体验。`
    : '文件格式不支持，请选择 PDF 或 EPUB，或使用正文导入。',
};
