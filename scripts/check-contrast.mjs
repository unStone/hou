// 检查 tokens.css 中浅色、深色两套颜色的对比度，不达标时以非零状态退出。
// 用法（仓库根目录）：node scripts/check-contrast.mjs
// 要求见 DESIGN.md 的 Accessibility：正文与标题 ≥ 7:1，其余文字 ≥ 4.5:1，不承载文字的界面元素 ≥ 3:1。
// --meta（淡墨）只用于纯装饰、不传达信息的线条，不参与检查。
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../tokens.css', import.meta.url)), 'utf8');

function block(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`tokens.css 中找不到 ${selector}`);
  const body = css.slice(start, css.indexOf('}', start));
  const vars = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) vars[name] = value.trim();
  return vars;
}

function hex(value) {
  const m = /^#([0-9a-f]{6})$/i.exec(value);
  if (!m) return undefined;
  return [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16));
}

// 解析 rgba(r, g, b, a)，用于叠在背景上的半透明颜色（例如划词高亮）
function rgba(value) {
  const m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/.exec(value);
  return m ? { rgb: [+m[1], +m[2], +m[3]], alpha: +m[4] } : undefined;
}

function resolve(vars, name, seen = new Set()) {
  const value = vars[name];
  if (value === undefined) throw new Error(`缺少颜色变量 --${name}`);
  const ref = /^var\(--([\w-]+)\)$/.exec(value);
  if (ref) {
    if (seen.has(name)) throw new Error(`颜色变量循环引用：--${name}`);
    return resolve(vars, ref[1], seen.add(name));
  }
  return value;
}

function color(vars, name, background) {
  const value = resolve(vars, name);
  const solid = hex(value);
  if (solid) return solid;
  const translucent = rgba(value);
  if (translucent && background) return translucent.rgb.map((c, i) => Math.round(c * translucent.alpha + background[i] * (1 - translucent.alpha)));
  throw new Error(`无法计算 --${name}：${value}`);
}

function luminance([r, g, b]) {
  const lin = c => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [前景, 背景, 最低对比度, 用途]；背景可以是"半透明颜色@底色"，表示先叠加再计算
const PAIRS = [
  ['fg', 'bg', 7, '正文与标题'],
  ['fg', 'surface', 7, '卡片上的正文'],
  ['fg-2', 'bg', 4.5, '次级文字'],
  ['fg-2', 'surface', 4.5, '卡片上的次级文字'],
  ['accent-on', 'accent', 4.5, '主按钮文字'],
  ['danger', 'bg', 4.5, '误解、错误提示文字'],
  ['danger', 'surface', 4.5, '卡片上的误解、错误提示文字'],
  ['danger-on', 'danger', 4.5, '提醒标记（待完成数量）文字'],
  ['success', 'surface', 4.5, '"已掌握"文字'],
  ['warn', 'surface', 4.5, '"部分掌握"文字'],
  ['fg', 'mark-highlight@bg', 7, '高亮下的阅读正文'],
  ['fg', 'mark-highlight@surface', 7, '卡片上高亮下的文字'],
  ['seal', 'bg', 3, '印章、小圆点（非文字）'],
  ['focus', 'bg', 3, '焦点框（非文字）'],
  ['focus', 'surface', 3, '卡片上的焦点框（非文字）'],
];

const themes = { 浅色: block(':root'), 深色: { ...block(':root'), ...block('[data-theme="dark"]') } };
let failed = 0;
for (const [theme, vars] of Object.entries(themes)) {
  console.log(`\n${theme}`);
  for (const [fgName, bgSpec, min, usage] of PAIRS) {
    const [overlay, base] = bgSpec.split('@');
    const bg = base ? color(vars, overlay, color(vars, base)) : color(vars, overlay);
    const value = ratio(color(vars, fgName), bg);
    const ok = value >= min;
    if (!ok) failed++;
    console.log(`${ok ? '通过' : '不足'}  ${value.toFixed(2).padStart(5)} : 1（要求 ≥ ${min}）  --${fgName} 在 --${bgSpec.replace('@', ' 叠在 --')} 上 · ${usage}`);
  }
}
console.log(failed ? `\n${failed} 组不达标。` : '\n全部达标。');
process.exitCode = failed ? 1 : 0;
