"""Gera os áudios com voz natural (Kokoro, Apache 2.0) para todas as frases em inglês do curso.

Cada frase vira public/audio/<hash>.mp3, com voz feminina ou masculina conforme o personagem
(src/lib/voices.json). O site toca o MP3 quando existe e usa a voz do aparelho quando não existe.
Só gera o que ainda não existe, então rodar de novo depois de criar conteúdo é rápido.

Uso (uma vez, no PC):
  pip install kokoro-onnx soundfile
  baixe kokoro-v1.0.onnx e voices-v1.0.bin (github.com/thewh1teagle/kokoro-onnx, releases)
  set KOKORO_DIR=pasta-dos-dois-arquivos
  python scripts/gen-audio.py
"""
import glob, json, os, re, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'audio')
VOICE_ID = {'f': 'af_heart', 'm': 'am_michael', 'jp': 'pm_santa', 'je': 'am_santa'}  # jp/je: Professor Juvenal (português/inglês)
VOICE_LANG = {'jp': 'pt-br'}
SPEED = 0.92

G = json.load(open(os.path.join(ROOT, 'src/lib/voices.json'), encoding='utf-8'))
GENDER = {n: 'f' for n in G['f']} | {n: 'm' for n in G['m']}
def gender(who):
    return GENDER.get(str(who or '').strip().lower(), 'f')

# mesma conta do site (src/lib/fx.js): FNV-1a 32 bits sobre "voz|texto normalizado"
def norm(t):
    return re.sub(r'\s+', ' ', str(t)).strip()
def key(v, t):
    h = 0x811c9dc5
    for ch in f'{v}|{norm(t)}':
        h ^= ord(ch)
        h = (h * 0x01000193) & 0xffffffff
    return format(h, '08x')

entries = {}  # hash -> (voz, texto)
def add(t, v='f'):
    t = norm(t or '')
    if not t or '___' in t or not re.search('[A-Za-z]', t) or len(t) > 220:
        return
    entries[key(v, t)] = (v, t)

def words_of(t):
    return [w for w in re.split(r'\s+', norm(t)) if w]

# ---------- lições ----------
for f in sorted(glob.glob(os.path.join(ROOT, 'src/content/*/*.json'))):
    u = json.load(open(f, encoding='utf-8'))
    for w in u.get('words', []):
        add(w[0])
    for p in (u.get('guide') or {}).get('points', []):
        if p.get('en'):
            add(p['en']); add(re.sub(r'\(.*?\)', '', p['en']))
    for l in u['lessons']:
        st = l.get('story')
        if st:
            for ln in st['lines']:
                if ln.get('ask') or not ln.get('en'):
                    continue
                v = gender(ln.get('who'))
                if ln.get('gap'):
                    add(ln['en'].replace('___', ln['gap']['answer']), v)
                else:
                    add(ln['en'], v)
        for it in l['items']:
            ty = it['type']
            if ty in ('meaning', 'listen', 'dictation', 'speak'):
                add(it['en'])
                if ty == 'speak':
                    for w in words_of(it['en']):
                        add(re.sub(r"[^A-Za-z'-]", '', w))
            if ty == 'choice':
                add(it['en'].replace('___', it['answer']))
                for o in it['options']:
                    add(o)
            if ty == 'build':
                add(it['answer']); add(it.get('display') or it['answer'])
                for w in it['answer'].split(' ') + it.get('extra', []):
                    add(w)
            if ty == 'type':
                add(it['answer'])
                for a in it.get('accept', []):
                    add(a)
            if ty == 'dictation':
                for a in it.get('accept', []):
                    add(a)
            if ty == 'match':
                for en, _ in it['pairs']:
                    add(en)
            if ty == 'dialogue':
                for who, t in it['lines']:
                    if t != '___':
                        add(t, gender(who))
                blank = next((who for who, t in it['lines'] if t == '___'), 'B')
                for o in it['options']:
                    add(o, gender(blank))

# ---------- jogos ----------
GD = os.path.join(ROOT, 'src/games/data')
cast = json.load(open(os.path.join(GD, 'cast.json'), encoding='utf-8'))
def cg(cid):
    return gender(cid) if cid.lower() in GENDER else gender(cast.get(cid, {}).get('name'))
def steps(lst):
    for s in lst:
        if s.get('ask'):
            continue
        if s.get('pick'):
            add(s['answer'], cg(s['who']))
        elif s.get('branch'):
            for o in s['options']:
                add(o['en'], cg(s['who'])); steps(o.get('then', []))
        else:
            add(s['en'], cg(s['who']))
for e in json.load(open(os.path.join(GD, 'episodes.json'), encoding='utf-8'))['episodes']:
    for sc in e['scenes']:
        steps(sc['steps'])
for c in json.load(open(os.path.join(GD, 'mysteries.json'), encoding='utf-8'))['cases']:
    for s in c['suspects']:
        add(s['en'], cg(s['id']))
    for k in c['clues']:
        add(k['en'])
for m in json.load(open(os.path.join(GD, 'city.json'), encoding='utf-8'))['missions']:
    for s in m['steps']:
        add(s['en'], cg(m['npc']))
        for o in s['options']:
            add(o)
for w in json.load(open(os.path.join(GD, 'pictures.json'), encoding='utf-8'))['words']:
    add(w[0])
for t in ['Great!', 'Nice!', 'Perfect!', 'Well done!', 'Again, slowly.']:
    add(t)

# ---------- falas prontas do Professor Juvenal (src/lib/aula.js) ----------
import subprocess
falas = json.loads(subprocess.run(
    ['node', '-e', "import('./src/lib/aula.js').then(m => console.log(JSON.stringify({ r: m.RETRY, g: m.GIVE_UP, i: m.INTRO })))"],
    cwd=ROOT, capture_output=True, text=True, encoding='utf-8', check=True).stdout)
for pt, en in falas['r'] + [falas['g'], falas['i']]:
    entries[key('jp', norm(pt))] = ('jp', norm(pt))
    entries[key('je', norm(en))] = ('je', norm(en))

# ---------- geração ----------
os.makedirs(OUT, exist_ok=True)
todo = [(h, v, t) for h, (v, t) in entries.items() if not os.path.exists(os.path.join(OUT, h + '.mp3'))]
print(f'{len(entries)} frases no total, {len(todo)} para gerar', flush=True)
if todo:
    import soundfile as sf
    from kokoro_onnx import Kokoro
    d = os.environ.get('KOKORO_DIR') or sys.exit('Defina KOKORO_DIR com a pasta do modelo Kokoro.')
    k = Kokoro(os.path.join(d, 'kokoro-v1.0.onnx'), os.path.join(d, 'voices-v1.0.bin'))
    t0 = time.time()
    for i, (h, v, t) in enumerate(todo):
        try:
            audio, sr = k.create(t, voice=VOICE_ID[v], speed=SPEED, lang=VOICE_LANG.get(v, 'en-us'))
            sf.write(os.path.join(OUT, h + '.mp3'), audio, sr, format='MP3', compression_level=0.9)
        except Exception as e:  # uma frase com problema não para as outras
            print('falhou:', t, e, flush=True)
        if i % 200 == 0:
            print(f'{i}/{len(todo)} ({time.time() - t0:.0f}s)', flush=True)

# índice: só os hashes que existem (o site baixa esta lista uma vez)
have = sorted(h for h in entries if os.path.exists(os.path.join(OUT, h + '.mp3')))
for f in glob.glob(os.path.join(OUT, '*.mp3')):  # áudios de frases que saíram do curso
    if os.path.basename(f)[:-4] not in entries:
        os.remove(f)
json.dump(have, open(os.path.join(OUT, 'index.json'), 'w'), separators=(',', ':'))
print(f'pronto: {len(have)} áudios', flush=True)

# ---------- palavras soltas (modo lento, "palavra por palavra") ----------
# Mesma separação de palavras do site (src/lib/fx.js → wordsOf).
def split_words(t):
    out = []
    for raw in norm(t).replace('\u2019', "'").split(' '):
        w = re.sub(r"^[^A-Za-z0-9']+|[^A-Za-z0-9']+$", '', raw).strip("'")
        if w:
            out.append(w.lower())
    return out

WOUT = os.path.join(OUT, 'w')
os.makedirs(WOUT, exist_ok=True)
wentries = {}
for v, t in entries.values():
    if v in ('jp', 'je'):  # falas do professor não precisam do modo lento
        continue
    for w in split_words(t):
        wentries[key('w' + v, w)] = (v, w)
wtodo = [(h, v, w) for h, (v, w) in wentries.items() if not os.path.exists(os.path.join(WOUT, h + '.mp3'))]
print(f'{len(wentries)} palavras, {len(wtodo)} para gerar', flush=True)
if wtodo:
    import soundfile as sf
    from kokoro_onnx import Kokoro
    d = os.environ.get('KOKORO_DIR') or sys.exit('Defina KOKORO_DIR com a pasta do modelo Kokoro.')
    k = Kokoro(os.path.join(d, 'kokoro-v1.0.onnx'), os.path.join(d, 'voices-v1.0.bin'))
    t0 = time.time()
    for i, (h, v, w) in enumerate(wtodo):
        try:
            # "I" sozinho e palavras curtas soam melhor com a primeira letra maiúscula
            say = 'I' if w == 'i' else w
            audio, sr = k.create(say, voice=VOICE_ID[v], speed=0.85, lang='en-us')
            sf.write(os.path.join(WOUT, h + '.mp3'), audio, sr, format='MP3', compression_level=0.9)
        except Exception as e:
            print('falhou:', w, e, flush=True)
        if i % 500 == 0:
            print(f'palavras {i}/{len(wtodo)} ({time.time() - t0:.0f}s)', flush=True)
whave = sorted(h for h in wentries if os.path.exists(os.path.join(WOUT, h + '.mp3')))
for f in glob.glob(os.path.join(WOUT, '*.mp3')):
    if os.path.basename(f)[:-4] not in wentries:
        os.remove(f)
json.dump(whave, open(os.path.join(OUT, 'words.json'), 'w'), separators=(',', ':'))
print(f'pronto: {len(whave)} palavras', flush=True)
