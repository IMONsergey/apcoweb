"""Create designer-facing contact sheets from unmasked browser screenshots."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path("test-results/real-visual-contact-sheets")
ROOT = Path("test-results")
ROUTES = [
    "home",
    "platform--search-investigation",
    "platform--data-methodology",
    "platform--monitoring",
    "use-cases--bug-bounty",
    "use-cases--vulnerability-research",
    "use-cases--osint-threat-investigation",
    "teams",
    "developers--api",
    "pricing",
    "about",
    "responsible-scanning",
    "contact",
]

def find_image(directory, filename):
    images = list(ROOT.glob(f"**/{directory}/{filename}"))
    return images[0] if images else None

def make_sheet(device, theme):
    frame = (432, 287) if device == "desktop" else (244, 384)
    cols = 3 if device == "desktop" else 4
    cell_w, cell_h = frame[0] + 28, frame[1] + 55
    rows = (len(ROUTES) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_w * cols, cell_h * rows), "#e8edf0")
    draw = ImageDraw.Draw(sheet)
    for index, route in enumerate(ROUTES):
        path = find_image("stage2-real-first-fold", f"{route}-{device}-{theme}.png")
        x = (index % cols) * cell_w
        y = (index // cols) * cell_h
        if path:
            with Image.open(path) as full:
                image = full.convert("RGB")
                image.thumbnail(frame, Image.Resampling.LANCZOS)
                sheet.paste(image, (x + 12, y + 12))
        else:
            draw.text((x + 12, y + 30), "MISSING SCREENSHOT", fill="#d92222")
        draw.text((x + 12, y + frame[1] + 20), route, fill="#17242c")
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"real-{device}-{theme}.jpg"
    sheet.save(dest, quality=89, optimize=True)
    print(dest)

for screen in ("desktop", "mobile"):
    for scheme in ("light", "dark"):
        make_sheet(screen, scheme)
