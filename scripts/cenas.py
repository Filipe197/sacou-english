"""Prepara as cenas ilustradas da trilha (elenco do Sacou, geradas no ChatGPT).

Coloque o PNG com fundo transparente em arte-fonte/cenas/<unidade>.png
(por exemplo a1-u6.png) e rode:  python scripts/cenas.py
Cada imagem é recortada nas bordas vazias, reduzida para 640 px de largura e salva em
src/art/cenas/<unidade>.webp. A trilha (src/components/TrailScene.jsx) encontra as
cenas sozinha: não precisa mudar código.
"""
import glob, os
from collections import deque
from PIL import Image


def tira_fundo_claro(im):
    """Quando o ChatGPT entrega o "xadrez" desenhado (sem transparência de verdade):
    apaga o fundo claro a partir das bordas. O contorno escuro das personagens segura o
    preenchimento, então o branco de dentro (balão, tênis) continua."""
    im = im.convert('RGBA')
    w, h = im.size
    px = im.load()
    claro = lambda p: min(p[0], p[1], p[2]) >= 225 and max(p[0], p[1], p[2]) - min(p[0], p[1], p[2]) <= 18
    fora = bytearray(w * h)
    q = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
    while q:
        x, y = q.popleft()
        i = y * w + x
        if fora[i] or not claro(px[x, y]):
            continue
        fora[i] = 1
        if x > 0: q.append((x - 1, y))
        if x < w - 1: q.append((x + 1, y))
        if y > 0: q.append((x, y - 1))
        if y < h - 1: q.append((x, y + 1))
    # bolsões de fundo presos entre as personagens (o preenchimento pelas bordas não chega lá).
    # O xadrez tem dois tons: o claro e um cinza (ex.: 254 e 249). Medimos o cinza no fundo de fora
    # e apagamos o bolsão GRANDE com bastante desse cinza. Olhos são pequenos; balão e solas
    # brancas quase não têm o cinza.
    from collections import Counter
    tons = Counter(px[x, y][0] for y in range(0, h, 2) for x in range(0, w, 2) if fora[y * w + x])
    claro_bg = tons.most_common(1)[0][0] if tons else 254
    cinza_bg = max((t for t in tons if t <= claro_bg - 3), key=lambda t: tons[t], default=claro_bg - 4)
    def segue_grade(pts):
        cinza = sum(1 for x, y in pts if abs(px[x, y][0] - cinza_bg) <= 1)
        return cinza / len(pts) > 0.18
    visto = bytearray(fora)
    for y0 in range(h):
        for x0 in range(w):
            if visto[y0 * w + x0] or not claro(px[x0, y0]):
                continue
            q = deque([(x0, y0)]); visto[y0 * w + x0] = 1; pts = []
            while q:
                x, y = q.popleft(); pts.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx] and claro(px[nx, ny]):
                        visto[ny * w + nx] = 1; q.append((nx, ny))
            if len(pts) > 1500 and segue_grade(pts):  # olhos e detalhes brancos são bem menores
                for x, y in pts:
                    fora[y * w + x] = 1
    # borda suave: pixels claros encostados no fundo ficam meio transparentes
    for y in range(h):
        for x in range(w):
            i = y * w + x
            if fora[i]:
                px[x, y] = (0, 0, 0, 0)
            elif any(0 <= x + dx < w and 0 <= y + dy < h and fora[(y + dy) * w + x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                p = px[x, y]
                lum = (p[0] + p[1] + p[2]) / 3
                if lum > 150:
                    px[x, y] = (p[0], p[1], p[2], max(0, int(255 * (255 - lum) / 105)))
    return im

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'arte-fonte', 'cenas')
OUT = os.path.join(ROOT, 'src', 'art', 'cenas')
os.makedirs(OUT, exist_ok=True)
for f in sorted(glob.glob(os.path.join(SRC, '*.png'))):
    name = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f)
    sem_alfa = 'A' not in im.getbands() or im.getchannel('A').getextrema()[0] > 200
    im = tira_fundo_claro(im) if sem_alfa else im.convert('RGBA')
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
