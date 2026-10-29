#!/bin/bash
# 从浅色图标母版中提取墨迹，生成透明底标志、深色母版和 Icon Composer 图层，并同步到设计系统包的 assets/
# 用法：scripts/extract_mark.sh <仓库根目录>
set -euo pipefail
root="$1"
brand="$root/brand"
master="$brand/icon/hou-icon-master.png"
[ -f "$master" ] || { echo "缺少图标母版：$master" >&2; exit 1; }
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir -p "$brand/mark" "$brand/icon/layers" "$root/assets"

# 墨迹浓度：纸面亮度约 0.92，最浓墨约 0.03；纸纹最暗处约 0.82
# 取反后，0.14 以下视为纸面（完全透明），0.85 以上视为满墨
magick "$master" -colorspace gray -negate -level 14%,85% -colorspace sRGB "$work/alpha.png"

# 用灰度作为透明度、指定颜色填充
shape() { magick "$work/alpha.png" -background "$1" -alpha shape "$2"; }

shape "#333435" "PNG32:$brand/icon/layers/foreground-ink.png"
shape "#EDE5D6" "$work/white-full.png"
magick -size 1024x1024 xc:"#F3EADB" "PNG24:$brand/icon/layers/background-paper.png"

# 墨色标志（浅色背景用）与白色标志（深色背景用），裁到墨迹边界并留 6% 边距
magick "$brand/icon/layers/foreground-ink.png" -trim +repage -bordercolor none -border 6% "PNG32:$brand/mark/hou-mark-ink.png"
magick "$work/white-full.png" -trim +repage -bordercolor none -border 6% "PNG32:$brand/mark/hou-mark-white.png"

# 深色母版：夜墨背景上用宣纸色按同一浓度叠出山形
magick -size 1024x1024 xc:"#1E2022" "$work/white-full.png" -compose Over -composite "PNG24:$brand/icon/hou-icon-master-dark.png"

# 同步设计系统包素材
cp "$master" "$root/assets/hou-icon.png"
cp "$brand/icon/hou-icon-master-dark.png" "$root/assets/hou-icon-dark.png"
cp "$brand/mark/hou-mark-ink.png" "$brand/mark/hou-mark-white.png" "$root/assets/"
echo "已生成标志、深色母版、图层，并同步到 assets/"
