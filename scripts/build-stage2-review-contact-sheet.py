#!/usr/bin/env python3
"""Compare R21 reference PNGs against Stage 2 frames without altering baselines."""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT=Path("test-results")
BASE=Path("tests/visual-regression.spec.ts-snapshots")
OUT=ROOT/"stage2-comparisons"
OUT.mkdir(parents=True,exist_ok=True)
CASES=[
("Hero 1440 Light","hero-desktop-light","home-desktop-1440-light"),
("Hero 1440 Dark","hero-desktop-dark","home-desktop-1440-dark"),
("Hero 390 Light","hero-mobile-light","home-mobile-390-light"),
("Hero 390 Dark","hero-mobile-dark","home-mobile-390-dark"),
("Pricing Light","pricing-desktop-light","pricing-desktop-1440-light"),
("Pricing Dark","pricing-desktop-dark","pricing-desktop-1440-dark"),
]
cards=[]
for label,prior,current in CASES:
    original=BASE/(prior+"-chromium-linux.png")
    candidates=list(ROOT.glob("**/"+current+".png"))
    if not original.exists() or not candidates:
        print("Missing comparison:",label);continue
    with Image.open(original) as prev, Image.open(candidates[0]) as nxt:
        old=prev.convert("RGB")
        new=nxt.convert("RGB")
        w=480
        reference_h=min(old.height,900)
        target_h=round(w*reference_h/old.width)
        old=old.crop((0,0,old.width,reference_h)).resize((w,target_h))
        after_h=min(new.height,round(new.width*reference_h/old.width))
        new=new.crop((0,0,new.width,after_h)).resize((w,target_h))
        board=Image.new("RGB",(1010,target_h+80),"#eef2f3")
        draw=ImageDraw.Draw(board)
        draw.text((20,12),label+" | R21 LEFT | STAGE 2 RIGHT",fill="#15282e")
        draw.text((20,34),"Reference comparison - designer approval required.",fill="#64777e")
        board.paste(old,(15,67));board.paste(new,(515,67))
        board.save(OUT/(current+"-comparison.jpg"),quality=87)
        cards.append(board)
if cards:
    sheet=Image.new("RGB",(1010,sum(c.height+12 for c in cards)),"white")
    y=0
    for board in cards:
        sheet.paste(board,(0,y));y+=board.height+12
    sheet.save(OUT/"r21-stage2-contact-sheet.jpg",quality=86)
print("Comparison pairs:",len(cards))
