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
    # bolsões de fundo presos entre as personagens. O xadrez tem casas de ~14 px, mas irregulares
    # (a imagem é gerada com pequenas distorções), então uma grade única não encaixa. Teste local:
    # no xadrez, um pixel e o vizinho a uma casa de distância quase sempre têm tons opostos;
    # no branco de verdade (olhos, solas, balão) têm o mesmo tom.
    def tom(x, y):
        v = px[x, y][0]
        return 1 if v >= 253 else 0 if v <= 251 else None
    def casa():
        y = next((y for y in range(2, h // 4) if all(fora[y * w + x] for x in range(w))), 2)
        trocas, ant = [], None
        for x in range(w):
            t = tom(x, y)
            if t is None:
                continue
            if ant is not None and t != ant:
                trocas.append(x)
            ant = t
        return round((trocas[-1] - trocas[0]) / (len(trocas) - 1)) if len(trocas) > 3 else 14
    D = casa()
    def segue_grade(pts):
        dentro = set(pts)
        # o xadrez alterna nas DUAS direções; listras (sola do tênis) só numa
        def alterna(dx, dy):
            melhor = 0
            for d in range(max(3, D - 2), D + 3):
                opostos = tot = 0
                for x, y in pts[::2]:
                    t = tom(x, y)
                    v = (x + dx * d, y + dy * d)
                    if t is None or v not in dentro:
                        continue
                    u = tom(*v)
                    if u is not None:
                        tot += 1
                        opostos += (u != t)
                if tot > 20:
                    melhor = max(melhor, opostos / tot)
            return melhor
        return min(alterna(1, 0), alterna(0, 1)) > 0.55
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
            if len(pts) > 150 and segue_grade(pts):
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
