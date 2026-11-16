"""Gera o áudio do "Podcast da Ana" (src/games/data/podcasts.json) com a Kokoro.

Cada episódio vira public/audio/podcast/<id>.mp3: as falas em sequência, com pausas naturais,
na voz feminina ou masculina de cada personagem. O tempo de início e fim de cada fala vai para
public/audio/podcast/index.json, para a transcrição acompanhar o áudio no site.
Só refaz o episódio cujo roteiro mudou.

Uso: igual ao scripts/gen-audio.py (KOKORO_DIR com o modelo) e depois
  python scripts/gen-podcasts.py
"""
import hashlib, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'audio', 'podcast')
VOICE_ID = {'f': 'af_heart', 'm': 'am_michael'}
SR = 24000

G = json.load(open(os.path.join(ROOT, 'src/lib/voices.json'), encoding='utf-8'))
GENDER = {n: 'f' for n in G['f']} | {n: 'm' for n in G['m']}
cast = json.load(open(os.path.join(ROOT, 'src/games/data/cast.json'), encoding='utf-8'))
def gender(who):
    w = who.lower()
    return GENDER.get(w) or GENDER.get(cast.get(who, {}).get('name', '').lower(), 'f')

data = json.load(open(os.path.join(ROOT, 'src/games/data/podcasts.json'), encoding='utf-8'))
os.makedirs(OUT, exist_ok=True)
idx_path = os.path.join(OUT, 'index.json')
index = json.load(open(idx_path, encoding='utf-8')) if os.path.exists(idx_path) else {}

def sig(ep):
    return hashlib.sha1(json.dumps([[l['who'], l['en']] for l in ep['lines']], ensure_ascii=False).encode()).hexdigest()[:12]

todo = [ep for ep in data['episodes'] if index.get(ep['id'], {}).get('sig') != sig(ep) or not os.path.exists(os.path.join(OUT, ep['id'] + '.mp3'))]
print(f"{len(data['episodes'])} episódios, {len(todo)} para gerar", flush=True)
if todo:
    import numpy as np, soundfile as sf
    from kokoro_onnx import Kokoro
    d = os.environ.get('KOKORO_DIR') or sys.exit('Defina KOKORO_DIR com a pasta do modelo Kokoro.')
    k = Kokoro(os.path.join(d, 'kokoro-v1.0.onnx'), os.path.join(d, 'voices-v1.0.bin'))
    for ep in todo:
        parts, times, t, prev = [np.zeros(int(SR * 0.6), dtype=np.float32)], [], 0.6, None
        for l in ep['lines']:
            if prev is not None:
                gap = 0.45 if l['who'] == prev else 0.7  # pausa maior quando muda quem fala
                parts.append(np.zeros(int(SR * gap), dtype=np.float32)); t += gap
            audio, sr = k.create(l['en'], voice=VOICE_ID[gender(l['who'])], speed=0.92, lang='en-us')
            dur = len(audio) / sr
            times.append([round(t, 2), round(t + dur, 2)])
            parts.append(audio.astype(np.float32)); t += dur; prev = l['who']
        parts.append(np.zeros(int(SR * 0.8), dtype=np.float32)); t += 0.8
        sf.write(os.path.join(OUT, ep['id'] + '.mp3'), np.concatenate(parts), SR, format='MP3', compression_level=0.9)
        index[ep['id']] = {'sig': sig(ep), 'duration': round(t, 2), 'times': times}
        print(f"{ep['id']}: {t:.0f}s", flush=True)
ids = {ep['id'] for ep in data['episodes']}
index = {k2: v for k2, v in index.items() if k2 in ids}
json.dump(index, open(idx_path, 'w'), separators=(',', ':'))
print('pronto', flush=True)
