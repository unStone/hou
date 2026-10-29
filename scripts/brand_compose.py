"""用山形标志和思源宋体排版《厚》的横版组合、分享图和自媒体封面。

用法：python3 -I scripts/brand_compose.py <仓库根目录>
"""
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PAPER = (243, 234, 219)
NIGHT = (30, 32, 34)
INK = (51, 52, 53)
INK_MID = (95, 94, 92)
ON_NIGHT = (237, 229, 214)
ON_NIGHT_MID = (201, 194, 183)

NAME = "厚"
TAGLINE = "读厚，再读薄"
PUNCTUATION = "，。、；：！？"

root = Path(sys.argv[1])
brand = root / "brand"
font_bold = root / "fonts" / "SourceHanSerifCN-Bold.otf"
font_regular = root / "fonts" / "SourceHanSerifCN-Regular.otf"
for path in (font_bold, font_regular):
    if not path.exists():
        raise FileNotFoundError(f"缺少字体文件：{path}")


def load_mark(name):
    path = brand / "mark" / name
    if not path.exists():
        raise FileNotFoundError(f"缺少标志文件：{path}")
    mark = Image.open(path).convert("RGBA")
    bbox = mark.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if bbox is None:
        raise ValueError(f"标志文件没有可见内容：{path}")
    return mark.crop(bbox)


MARK_INK = load_mark("hou-mark-ink.png")
MARK_WHITE = load_mark("hou-mark-white.png")


def mark_at_height(mark, height):
    width = round(mark.width * height / mark.height)
    return mark.resize((width, height), Image.Resampling.LANCZOS)


class Text:
    """按字形实际墨迹排版的单行文字，支持字间距。"""

    def __init__(self, text, font_path, size, color, tracking=0.0):
        self.text = text
        self.font = ImageFont.truetype(str(font_path), size)
        self.color = color
        self.tracking = round(size * tracking)
        boxes = [self.font.getbbox(ch) for ch in text]
        self.top = min(b[1] for b in boxes)
        self.bottom = max(b[3] for b in boxes)
        # 全角标点按半宽排（标点挤压），其后不再加字间距
        self.advances = [
            self.font.getlength(ch) * 0.5 - self.tracking if ch in PUNCTUATION else self.font.getlength(ch)
            for ch in text
        ]
        self.width = round(sum(self.advances) + self.tracking * (len(text) - 1))
        self.height = self.bottom - self.top

    def draw(self, canvas, x, y):
        draw = ImageDraw.Draw(canvas)
        cursor = x
        for ch, advance in zip(self.text, self.advances):
            draw.text((cursor, y - self.top), ch, font=self.font, fill=self.color)
            cursor += advance + self.tracking


def lockup(mark, name_color, tagline_color, mark_height, with_tagline):
    """标志在左，"厚"在右；可选在"厚"下方加标语。返回透明底图层。"""
    m = mark_at_height(mark, mark_height)
    name = Text(NAME, font_bold, round(mark_height * 0.6), name_color)
    gap = round(mark_height * 0.26)
    tag = Text(TAGLINE, font_regular, round(mark_height * 0.13), tagline_color, tracking=0.16) if with_tagline else None
    text_width = max(name.width, tag.width if tag else 0)
    text_height = name.height + (round(mark_height * 0.16) + tag.height if tag else 0)
    width = m.width + gap + text_width
    height = max(m.height, text_height)
    layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    layer.alpha_composite(m, (0, (height - m.height) // 2))
    text_x = m.width + gap
    text_y = (height - text_height) // 2
    name.draw(layer, text_x, text_y)
    if tag:
        tag.draw(layer, text_x, text_y + name.height + round(mark_height * 0.16))
    return layer


def stacked(mark, name_color, tagline_color, mark_height):
    """标志在上，"厚"与标语依次居中排在下方。返回透明底图层。"""
    m = mark_at_height(mark, mark_height)
    name = Text(NAME, font_bold, round(mark_height * 0.36), name_color)
    tag = Text(TAGLINE, font_regular, round(mark_height * 0.09), tagline_color, tracking=0.16)
    gap1, gap2 = round(mark_height * 0.22), round(mark_height * 0.12)
    width = max(m.width, name.width, tag.width)
    height = m.height + gap1 + name.height + gap2 + tag.height
    layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    layer.alpha_composite(m, ((width - m.width) // 2, 0))
    name.draw(layer, (width - name.width) // 2, m.height + gap1)
    tag.draw(layer, (width - tag.width) // 2, m.height + gap1 + name.height + gap2)
    return layer


def pad(layer, ratio):
    border = round(max(layer.width, layer.height) * ratio)
    out = Image.new("RGBA", (layer.width + border * 2, layer.height + border * 2), (0, 0, 0, 0))
    out.alpha_composite(layer, (border, border))
    return out


def place(canvas_size, bg, layer, center):
    canvas = Image.new("RGBA", canvas_size, bg + (255,))
    x = round(center[0] - layer.width / 2)
    y = round(center[1] - layer.height / 2)
    if x < 0 or y < 0 or x + layer.width > canvas_size[0] or y + layer.height > canvas_size[1]:
        raise ValueError(f"内容超出画布：{canvas_size}，图层 {layer.size}，中心 {center}")
    canvas.alpha_composite(layer, (x, y))
    return canvas.convert("RGB")


def save(image, relative):
    path = brand / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, optimize=True)
    print(f"{relative}\t{image.width}x{image.height}")


# 横版组合（透明底）
save(pad(lockup(MARK_INK, INK, INK_MID, 400, False), 0.06), "lockup/hou-lockup-ink.png")
save(pad(lockup(MARK_WHITE, ON_NIGHT, ON_NIGHT_MID, 400, False), 0.06), "lockup/hou-lockup-white.png")
save(pad(lockup(MARK_INK, INK, INK_MID, 400, True), 0.06), "lockup/hou-lockup-tagline-ink.png")
save(pad(lockup(MARK_WHITE, ON_NIGHT, ON_NIGHT_MID, 400, True), 0.06), "lockup/hou-lockup-tagline-white.png")

# 网站分享图 1200x630
save(place((1200, 630), PAPER, lockup(MARK_INK, INK, INK_MID, 300, True), (600, 315)), "web/og-image.png")

# 公众号首条封面 900x383（2.35:1）与次条封面 500x500
save(place((900, 383), PAPER, lockup(MARK_INK, INK, INK_MID, 190, True), (450, 191)), "social/wechat-cover-900x383.png")
save(place((500, 500), PAPER, stacked(MARK_INK, INK, INK_MID, 220), (250, 250)), "social/wechat-cover-square-500.png")

# 小红书笔记封面 1080x1440（3:4）
save(place((1080, 1440), PAPER, stacked(MARK_INK, INK, INK_MID, 560), (540, 700)), "social/xiaohongshu-cover-1080x1440.png")

# X 头图 1500x500：头像压在左下角、上下可能各裁去约 60px，内容放在右侧中部
save(place((1500, 500), PAPER, lockup(MARK_INK, INK, INK_MID, 220, True), (1010, 250)), "social/x-header-1500x500.png")

# 同步设计系统包素材
for name in ("hou-lockup-ink.png", "hou-lockup-white.png", "hou-lockup-tagline-ink.png", "hou-lockup-tagline-white.png"):
    shutil.copy2(brand / "lockup" / name, root / "assets" / name)
print("已同步横版组合到 assets/")
