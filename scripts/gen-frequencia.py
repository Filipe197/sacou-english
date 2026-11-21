"""Frequência de uso das palavras da lista oficial (CEFR-J), para o relatório de cobertura.

Para cada palavra da CEFR-J (A1 a B2), pega a frequência no inglês real pelo wordfreq
(escala Zipf: 7 = palavras como "the"; 3 = palavras que aparecem ~1 vez por milhão) e grava
content/sources/frequencia-cefrj.json, do mais usado para o menos usado. O build só lê esse
arquivo (não precisa de Python). Rodar de novo só quando a lista oficial mudar.

Fonte: wordfreq (Robyn Speer), código Apache-2.0, dados CC BY-SA 4.0
(https://github.com/rspeer/wordfreq). Créditos em src/pages/Credits.jsx.

Uso: python -m pip install wordfreq  e depois  python scripts/gen-frequencia.py
"""
import csv, json, os
from wordfreq import zipf_frequency

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, 'content', 'sources', 'cefrj-vocabulary-profile-1.5.csv')
OUT = os.path.join(ROOT, 'content', 'sources', 'frequencia-cefrj.json')
ORDER = ['A1', 'A2', 'B1', 'B2']

best = {}  # palavra -> {w, lv, zipf}
with open(CSV, encoding='utf-8') as f:
    for row in csv.DictReader(f):
        lv = row['CEFR']
        if lv not in ORDER:
            continue
        head = row['headword'].strip()
        forms = [x.strip().lower().rstrip('.') for x in head.split('/') if x.strip()]
        if not forms:
            continue
        z = max(zipf_frequency(x, 'en') for x in forms)
        key = forms[0]
        old = best.get(key)
        if not old or ORDER.index(lv) < ORDER.index(old['lv']):
            best[key] = {'w': head, 'lv': lv, 'zipf': round(z, 2)}
        elif old:
            old['zipf'] = max(old['zipf'], round(z, 2))

out = sorted(best.values(), key=lambda e: -e['zipf'])
json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(f'{len(out)} palavras com frequência -> {os.path.relpath(OUT, ROOT)}')
print('mais usadas:', ', '.join(e['w'] for e in out[:15]))
