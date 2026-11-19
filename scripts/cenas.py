"""Prepara as cenas ilustradas da trilha (elenco do Sacou, geradas no ChatGPT).

Coloque o PNG com fundo transparente em arte-fonte/cenas/<unidade>.png
(por exemplo a1-u6.png) e rode:  python scripts/cenas.py
Cada imagem é recortada nas bordas vazias, reduzida para 640 px de largura e salva em
src/art/cenas/<unidade>.webp. A trilha (src/components/TrailScene.jsx) encontra as
cenas sozinha: não precisa mudar código.
"""
import glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'arte-fonte', 'cenas')
OUT = os.path.join(ROOT, 'src', 'art', 'cenas')
os.makedirs(OUT, exist_ok=True)
for f in sorted(glob.glob(os.path.join(SRC, '*.png'))):
    name = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f).convert('RGBA')
    # limpa o "brilho" quase invisível e recorta as bordas vazias
    a = im.getchannel('A').point(lambda v: 0 if v < 24 else v)
    im.putalpha(a)
    box = a.getbbox()
    if box:
        im = im.crop(box)
    w, h = im.size
    if w > 640:
        im = im.resize((640, round(h * 640 / w)), Image.LANCZOS)
    dest = os.path.join(OUT, name + '.webp')
    im.save(dest, 'WEBP', quality=86, method=6)
    print(f'{name}: {im.size[0]}x{im.size[1]}, {os.path.getsize(dest) // 1024} KB')
