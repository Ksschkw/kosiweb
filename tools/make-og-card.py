#!/usr/bin/env python3
"""Generate the social preview card (Open Graph / Twitter) from the portrait.

Link previews are cropped to roughly 1.91:1 by every major platform, so a
vertical portrait loses the subject's face. This composes a 1200x630 card
instead: the site's near-black surface, the name set in the same monospace
voice as the page, and the portrait on the right, cropped to keep the face in
frame.

Re-run it whenever imagesnshii/kosi.jpeg changes:

    python3 tools/make-og-card.py

Writes imagesnshii/og-card.jpg.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "imagesnshii" / "kosi.jpeg"
TARGET = ROOT / "imagesnshii" / "og-card.jpg"

W, H = 1200, 630
BG = (8, 9, 10)
TEXT = (231, 234, 237)
DIM = (151, 160, 170)
FAINT = (107, 116, 126)
ACCENT = (255, 45, 32)
LINE = (28, 33, 38)

MONO_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

# The portrait panel. 472x630 keeps the source's own proportions closely enough
# that nothing is squashed.
PANEL_W = 472
PANEL_X = W - PANEL_W - 48

# Crop window into the 756x1008 portrait: trims the empty wall above and to the
# left so the subject fills the panel rather than sitting in a corner.
CROP = (60, 380, 530, 1008)


def main():
    card = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(card)

    # --- portrait panel ---
    portrait = Image.open(SOURCE).convert("RGB").crop(CROP)
    portrait = portrait.resize((PANEL_W, H), Image.LANCZOS)
    card.paste(portrait, (PANEL_X, 0))
    draw.rectangle([PANEL_X - 1, 0, PANEL_X + PANEL_W, H - 1], outline=LINE)

    # --- text block ---
    name = ImageFont.truetype(MONO_BOLD, 46)
    role = ImageFont.truetype(MONO_BOLD, 24)
    tagline = ImageFont.truetype(MONO, 22)
    small = ImageFont.truetype(MONO, 20)

    x = 72
    draw.rectangle([x, 150, x + 16, 166], fill=ACCENT)
    draw.text((x, 200), "SOFTWARE ENGINEER", font=role, fill=ACCENT)
    draw.text((x, 248), "KOSISOCHUKWU", font=name, fill=TEXT)
    draw.text((x, 304), "OKAFOR", font=name, fill=TEXT)
    draw.text((x + 2, 380), "Backend \u00b7 Infrastructure \u00b7 Applied AI",
              font=tagline, fill=DIM)

    draw.line([x, 448, PANEL_X - 48, 448], fill=LINE, width=1)
    draw.text((x + 2, 476), "kss-venv.onrender.com", font=small, fill=FAINT)

    card.save(TARGET, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {TARGET.relative_to(ROOT)} ({TARGET.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
