// Reforço de vocabulário do A2: uma lição "Palavras essenciais" (l11) em cada unidade, com as
// palavras mais usadas do inglês que o curso ainda não ensinava até o A2 (relatório por frequência
// em docs/cobertura-vocabulario.md). Lições "bonus": aparecem como novas, dão XP e não contam para
// concluir a unidade.
// Uso: node scripts/content-add/reforco-a2.mjs  (rodar DEPOIS dos scripts das unidades, que reescrevem
// as unidades 9 a 16; pode rodar de novo sem duplicar)
import { addLessons } from './lib.mjs';

const after = (n) => `a2-u${n}-l${n <= 8 ? 8 : 4}`;
function R(n, words, items) {
  addLessons(`a2/unit-${String(n).padStart(2, '0')}.json`, {
    words,
    lessons: [{ after: after(n), lesson: { id: `a2-u${n}-l11`, title: 'Palavras essenciais', bonus: true, items: items.map((it, k) => ({ id: `a2u${n}l11-${k + 1}`, ...it })) } }],
  });
}

R(1, [['actually', 'na verdade'], ['quite', 'bem, bastante'], ['especially', 'principalmente, especialmente'], ['several', 'vários(as)']], [
  { type: 'match', pairs: [['actually', 'na verdade'], ['quite', 'bastante'], ['especially', 'principalmente'], ['several', 'vários']], why: 'Cuidado: "actually" NÃO é "atualmente". Quer dizer "na verdade".' },
  { type: 'choice', prompt: 'Complete:', en: 'I thought it was boring, but it was ___ fun.', pt: 'Achei que seria chato, mas na verdade foi divertido.', options: ['actually', 'nowadays', 'already'], answer: 'actually', why: '"Actually" corrige uma ideia: na verdade.', wrong: { nowadays: '"Nowadays" = hoje em dia (e não "atualmente" no sentido de agora).', already: '"Already" = já.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The hotel was ___ good, but the food was awful.', pt: 'O hotel era bem bom, mas a comida era horrível.', options: ['quite', 'several', 'especially'], answer: 'quite', why: '"Quite" + adjetivo = bem, bastante.', wrong: { several: '"Several" vem antes de plural: several days.', especially: '"Especially" = principalmente.' } },
  { type: 'meaning', en: 'I love the beach, especially in summer.', options: ['Adoro praia, principalmente no verão.', 'Adoro praia, mas só no verão.', 'Não gosto de praia no verão.'], answer: 'Adoro praia, principalmente no verão.', why: '"Especially" = principalmente.' },
  { type: 'build', pt: 'Eu estive lá várias vezes.', answer: 'I was there several times', extra: ['were', 'quite'], display: 'I was there several times.', why: '"Several" = vários, mais de dois.' },
  { type: 'listen', en: 'Actually, I was at home all day.', options: ['Na verdade, fiquei em casa o dia todo.', 'Atualmente, fico em casa o dia todo.', 'Eu nunca fico em casa.'], answer: 'Na verdade, fiquei em casa o dia todo.', why: '"Actually" = na verdade.' },
]);

R(2, [['decide', 'decidir'], ['explain', 'explicar'], ['return', 'voltar, devolver'], ['receive', 'receber']], [
  { type: 'match', pairs: [['decide', 'decidir'], ['explain', 'explicar'], ['return', 'devolver'], ['receive', 'receber']], why: '"Return" = voltar (return home) e devolver (return the book).' },
  { type: 'choice', prompt: 'Complete:', en: 'We ___ to stay at home.', pt: 'Decidimos ficar em casa.', options: ['decided', 'decide to', 'decides'], answer: 'decided', why: '"Decide" + to + verbo. No passado: decided.', wrong: { 'decide to': 'Ficaria "decide to to stay". E precisa do passado.', decides: 'Precisa do passado, e com "we" não tem -s.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Can you ___ this word to me?', pt: 'Você pode me explicar esta palavra?', options: ['explain', 'explain me', 'say me'], answer: 'explain', why: '"Explain something TO someone". Nunca "explain me".', wrong: { 'explain me': 'Em inglês é "explain it to me".', 'say me': '"Say" não leva a pessoa logo depois.' } },
  { type: 'meaning', en: 'I returned the book to the library.', options: ['Devolvi o livro para a biblioteca.', 'Peguei um livro na biblioteca.', 'Voltei para a biblioteca para ler.'], answer: 'Devolvi o livro para a biblioteca.', why: '"Return something" = devolver.' },
  { type: 'build', pt: 'Ela recebeu uma carta da avó.', answer: 'She received a letter from her grandma', extra: ['receive', 'of'], display: 'She received a letter from her grandma.', why: '"Receive" = receber. "From" = de (quem mandou).' },
  { type: 'listen', en: 'When did you return from your trip?', options: ['Quando você voltou da viagem?', 'Quando você vai viajar?', 'Como foi a viagem?'], answer: 'Quando você voltou da viagem?', why: '"Return from" = voltar de.' },
]);

R(3, [['hold', 'segurar'], ['cut', 'cortar'], ['follow', 'seguir'], ['save', 'economizar, guardar, salvar']], [
  { type: 'match', pairs: [['hold', 'segurar'], ['cut', 'cortar'], ['follow', 'seguir'], ['save', 'economizar']], why: 'Passado: hold → held, cut → cut (igual), follow → followed, save → saved.' },
  { type: 'choice', prompt: 'Complete:', en: 'We ___ money for the trip all year.', pt: 'A gente economizou dinheiro para a viagem o ano todo.', options: ['saved', 'spent', 'cut'], answer: 'saved', why: '"Save money" = economizar.', wrong: { spent: '"Spent" = gastou, o contrário.', cut: '"Cut" = cortar.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Can you ___ my bag for a minute?', pt: 'Você pode segurar minha bolsa um minutinho?', options: ['hold', 'follow', 'save'], answer: 'hold', why: '"Hold" = segurar.', wrong: { follow: '"Follow" = seguir.', save: '"Save" = guardar (para depois) ou economizar.' } },
  { type: 'meaning', en: 'Follow me. The hotel is this way.', options: ['Me siga. O hotel é por aqui.', 'Espere aqui. O hotel é longe.', 'Me ligue quando chegar no hotel.'], answer: 'Me siga. O hotel é por aqui.', why: '"Follow" = seguir. "This way" = por aqui.' },
  { type: 'build', pt: 'Ela cortou o cabelo ontem.', answer: 'She cut her hair yesterday', extra: ['cutted', 'his'], display: 'She cut her hair yesterday.', why: '"Cut" no passado é igual: cut.' },
  { type: 'listen', en: "Don't forget to save the file.", options: ['Não esqueça de salvar o arquivo.', 'Não esqueça de apagar o arquivo.', 'Não esqueça de mandar o arquivo.'], answer: 'Não esqueça de salvar o arquivo.', why: 'No computador, "save" = salvar.' },
]);

R(4, [['continue', 'continuar'], ['wonder', 'imaginar, se perguntar'], ['join', 'entrar (num grupo), juntar-se'], ['agree', 'concordar']], [
  { type: 'match', pairs: [['continue', 'continuar'], ['wonder', 'se perguntar'], ['join', 'juntar-se'], ['agree', 'concordar']], why: '"I agree" = concordo. Nunca "I am agree".' },
  { type: 'choice', prompt: 'Complete:', en: 'I ___ with you.', pt: 'Eu concordo com você.', options: ['agree', 'am agree', 'agreed with'], answer: 'agree', why: '"Agree" já é verbo: I agree.', wrong: { 'am agree': 'Erro clássico de brasileiro: não tem "am".', 'agreed with': 'Ficaria "agreed with with you".' } },
  { type: 'choice', prompt: 'Complete:', en: "We're going to the beach. Do you want to ___ us?", pt: 'Estamos indo à praia. Quer vir com a gente?', options: ['join', 'continue', 'follow'], answer: 'join', why: '"Join us" = venha com a gente, junte-se a nós.', wrong: { continue: '"Continue" = continuar.', follow: '"Follow us" = siga a gente (atrás).' } },
  { type: 'meaning', en: "I'm wondering what she is doing now.", options: ['Estou me perguntando o que ela está fazendo agora.', 'Estou vendo o que ela está fazendo.', 'Ela está pensando em mim.'], answer: 'Estou me perguntando o que ela está fazendo agora.', why: '"Wonder" = se perguntar, imaginar.' },
  { type: 'build', pt: 'Por favor, continue lendo.', answer: 'Please continue reading', extra: ['continues', 'read'], display: 'Please continue reading.', why: '"Continue + -ing" (ou "to read") = continuar fazendo.' },
  { type: 'listen', en: "It's still raining. Let's continue tomorrow.", options: ['Ainda está chovendo. Vamos continuar amanhã.', 'Parou de chover. Vamos continuar.', 'Amanhã vai chover.'], answer: 'Ainda está chovendo. Vamos continuar amanhã.', why: '"Still raining" = ainda chovendo.' },
]);

R(5, [['simple', 'simples'], ['clear', 'claro(a), limpo(a)'], ['less', 'menos'], ['least', 'o menos, o mínimo']], [
  { type: 'match', pairs: [['simple', 'simples'], ['clear', 'claro'], ['less', 'menos'], ['least', 'o menos']], why: '"Less" é o contrário de "more"; "the least" é o contrário de "the most".' },
  { type: 'choice', prompt: 'Complete:', en: 'This phone is ___ expensive than that one.', pt: 'Este celular é menos caro que aquele.', options: ['less', 'least', 'more less'], answer: 'less', why: '"Less + adjetivo + than" = menos ... que.', wrong: { least: '"The least" é superlativo (o menos de todos).', 'more less': 'Não existe.' } },
  { type: 'choice', prompt: 'Complete:', en: "It's the ___ expensive hotel in the city.", pt: 'É o hotel menos caro da cidade.', options: ['least', 'less', 'lesser'], answer: 'least', why: '"The least" = o menos (de todos).', wrong: { less: '"Less" compara duas coisas.', lesser: 'Não se usa assim.' } },
  { type: 'meaning', en: 'The rules are simple and clear.', options: ['As regras são simples e claras.', 'As regras são longas e difíceis.', 'Não tem regras.'], answer: 'As regras são simples e claras.', why: '"Simple" = simples. "Clear" = claro, fácil de entender.' },
  { type: 'build', pt: 'Hoje o céu está limpo.', answer: 'The sky is clear today', extra: ['clean', 'are'], display: 'The sky is clear today.', why: 'Céu sem nuvens = clear sky. "Clean" é limpo de sujeira.' },
  { type: 'listen', en: 'I want to spend less money this month.', options: ['Quero gastar menos dinheiro este mês.', 'Quero ganhar mais dinheiro este mês.', 'Gastei muito dinheiro este mês.'], answer: 'Quero gastar menos dinheiro este mês.', why: '"Less money" = menos dinheiro.' },
]);

R(6, [['expect', 'esperar (que aconteça)'], ['improve', 'melhorar'], ['chance', 'chance'], ['create', 'criar']], [
  { type: 'match', pairs: [['expect', 'esperar'], ['improve', 'melhorar'], ['chance', 'chance'], ['create', 'criar']], why: '"Expect" é esperar que algo aconteça. Esperar alguém é "wait for".' },
  { type: 'choice', prompt: 'Complete:', en: 'I want to ___ my English this year.', pt: 'Quero melhorar meu inglês este ano.', options: ['improve', 'expect', 'better'], answer: 'improve', why: '"Improve" = melhorar.', wrong: { expect: '"Expect" = esperar.', better: '"Better" é adjetivo (melhor), não verbo aqui.' } },
  { type: 'choice', prompt: 'Complete:', en: "I ___ it will rain tomorrow.", pt: 'Eu espero (acho) que vai chover amanhã.', options: ['expect', 'wait', 'hope for'], answer: 'expect', why: '"Expect" = achar que algo vai acontecer.', wrong: { wait: '"Wait" = esperar alguém ou algo chegar.', 'hope for': '"Hope for" + coisa (hope for rain).' } },
  { type: 'meaning', en: 'This is a great chance to travel.', options: ['Esta é uma ótima chance de viajar.', 'Não tenho chance de viajar.', 'Viajar é caro demais.'], answer: 'Esta é uma ótima chance de viajar.', why: '"Chance" = chance, oportunidade.' },
  { type: 'build', pt: 'Ela quer criar um jogo novo.', answer: 'She wants to create a new game', extra: ['creates', 'want'], display: 'She wants to create a new game.', why: '"Want to create" = quer criar.' },
  { type: 'listen', en: "I didn't expect to see you here!", options: ['Não esperava ver você aqui!', 'Eu estava esperando você aqui.', 'Você não me viu aqui?'], answer: 'Não esperava ver você aqui!', why: '"Didn\'t expect" = não esperava.' },
]);

R(7, [['business', 'negócio, empresa'], ['market', 'mercado, feira'], ['local', 'local, do bairro'], ['deal', 'acordo, negócio, oferta']], [
  { type: 'match', pairs: [['business', 'negócio'], ['market', 'feira'], ['local', 'do bairro'], ['deal', 'oferta']], why: '"Good deal" = bom negócio, boa oferta.' },
  { type: 'choice', prompt: 'Complete:', en: 'Three shirts for 50 reais? That\'s a good ___!', pt: 'Três camisas por 50 reais? É um ótimo negócio!', options: ['deal', 'market', 'business'], answer: 'deal', why: '"A good deal" = um bom negócio, uma boa oferta.', wrong: { market: '"Market" = mercado, feira.', business: '"Business" = negócio como empresa.' } },
  { type: 'choice', prompt: 'Complete:', en: 'We buy fruit at the ___ every Saturday.', pt: 'A gente compra fruta na feira todo sábado.', options: ['market', 'deal', 'business'], answer: 'market', why: '"Market" = feira, mercado.', wrong: { deal: '"Deal" = oferta.', business: '"Business" = empresa.' } },
  { type: 'meaning', en: 'My uncle has a small business.', options: ['Meu tio tem um pequeno negócio.', 'Meu tio trabalha num banco.', 'Meu tio é um homem ocupado.'], answer: 'Meu tio tem um pequeno negócio.', why: '"Business" = negócio, empresa. Soa como "BÍZ-nis".' },
  { type: 'build', pt: 'Eu gosto de comprar em lojas do bairro.', answer: 'I like buying in local shops', extra: ['likes', 'at'], display: 'I like buying in local shops.', why: '"Local shops" = lojas do bairro, da região.' },
  { type: 'listen', en: 'Is it a business trip?', options: ['É uma viagem de negócios?', 'É uma viagem de férias?', 'Você viaja muito?'], answer: 'É uma viagem de negócios?', why: '"Business trip" = viagem de trabalho.' },
]);

R(8, [['avoid', 'evitar'], ['public', 'público(a)'], ['social', 'social'], ['level', 'nível']], [
  { type: 'match', pairs: [['avoid', 'evitar'], ['public', 'público'], ['social', 'social'], ['level', 'nível']], why: '"Avoid" + -ing: avoid eating late.' },
  { type: 'choice', prompt: 'Complete:', en: 'You should avoid ___ late at night.', pt: 'Você deveria evitar comer tarde da noite.', options: ['eating', 'to eat', 'eat'], answer: 'eating', why: '"Avoid" + -ing.', wrong: { 'to eat': '"Avoid" não aceita "to".', eat: 'Precisa do -ing.' } },
  { type: 'choice', prompt: 'Complete:', en: 'You must not smoke in ___ places.', pt: 'Não pode fumar em lugares públicos.', options: ['public', 'social', 'local'], answer: 'public', why: '"Public places" = lugares públicos.', wrong: { social: '"Social" = social.', local: '"Local" = da região.' } },
  { type: 'meaning', en: 'What level is your English?', options: ['Qual é o nível do seu inglês?', 'Você fala inglês?', 'Onde você estuda inglês?'], answer: 'Qual é o nível do seu inglês?', why: '"Level" = nível: A1, A2, B1...' },
  { type: 'build', pt: 'Eu gosto de eventos sociais.', answer: 'I like social events', extra: ['public', 'likes'], display: 'I like social events.', why: '"Social" = social. Adjetivo vem antes: social events.' },
  { type: 'listen', en: 'Can I use this card on public buses?', options: ['Posso usar este cartão nos ônibus públicos?', 'Este cartão é de crédito?', 'Onde fica o ponto de ônibus?'], answer: 'Posso usar este cartão nos ônibus públicos?', why: '"Public" = público.' },
]);

R(9, [['although', 'embora'], ['however', 'porém, no entanto'], ['fact', 'fato'], ['cause', 'causa, causar']], [
  { type: 'match', pairs: [['although', 'embora'], ['however', 'porém'], ['fact', 'fato'], ['cause', 'causa']], why: '"Although" liga duas ideias numa frase. "However" começa uma frase nova.' },
  { type: 'choice', prompt: 'Complete:', en: "___ I was ill, I went to work.", pt: 'Embora eu estivesse doente, fui trabalhar.', options: ['Although', 'However', 'Because'], answer: 'Although', why: '"Although" = embora.', wrong: { However: '"However" vem depois de um ponto: I was ill. However, I went to work.', Because: '"Because" = porque.' } },
  { type: 'choice', prompt: 'Complete:', en: "The doctor was nice. ___, the medicine was expensive.", pt: 'O médico foi gentil. Porém, o remédio era caro.', options: ['However', 'Although', 'Also'], answer: 'However', why: '"However" = porém, no começo da frase e com vírgula.', wrong: { Although: '"Although" não começa uma frase sozinha assim.', Also: '"Also" = também.' } },
  { type: 'meaning', en: 'Too much sugar can cause problems.', options: ['Açúcar demais pode causar problemas.', 'Açúcar não causa problemas.', 'O problema é o sal.'], answer: 'Açúcar demais pode causar problemas.', why: '"Cause" = causar.' },
  { type: 'build', pt: 'É um fato: dormir bem é importante.', answer: "It's a fact: sleeping well is important", extra: ['facts', 'are'], display: "It's a fact: sleeping well is important.", why: '"Fact" = fato. Verbo com -ing como sujeito: sleeping well.' },
  { type: 'listen', en: 'In fact, I feel much better now.', options: ['Na verdade, me sinto bem melhor agora.', 'De fato, estou pior agora.', 'Ainda me sinto mal.'], answer: 'Na verdade, me sinto bem melhor agora.', why: '"In fact" = na verdade, de fato.' },
]);

R(10, [['international', 'internacional'], ['research', 'pesquisa'], ['support', 'apoio, apoiar'], ['control', 'controle, controlar']], [
  { type: 'match', pairs: [['international', 'internacional'], ['research', 'pesquisa'], ['support', 'apoio'], ['control', 'controle']], why: '"Support" é apoiar (e não "suportar" alguém chato, que é "stand").' },
  { type: 'choice', prompt: 'Complete:', en: 'She works for an ___ company.', pt: 'Ela trabalha numa empresa internacional.', options: ['international', 'a international', 'internationals'], answer: 'international', why: 'Antes de som de vogal, "an": an international company.', wrong: { 'a international': 'Ficaria "an a international".', internationals: 'Adjetivo não tem plural em inglês.' } },
  { type: 'choice', prompt: 'Complete:', en: 'My family always ___ me.', pt: 'Minha família sempre me apoia.', options: ['supports', 'support', 'stands'], answer: 'supports', why: '"Support" = apoiar. Com "my family" (it): supports.', wrong: { support: 'Com "my family", o verbo leva -s.', stands: '"Stand" é aguentar, suportar.' } },
  { type: 'meaning', en: 'He does research on new medicines.', options: ['Ele faz pesquisa sobre remédios novos.', 'Ele vende remédios novos.', 'Ele toma remédios novos.'], answer: 'Ele faz pesquisa sobre remédios novos.', why: '"Do research" = fazer pesquisa. "Research" não tem plural.' },
  { type: 'build', pt: 'Eu não consigo controlar meu tempo.', answer: "I can't control my time", extra: ['controls', 'mine'], display: "I can't control my time.", why: '"Control" = controlar.' },
  { type: 'listen', en: 'Thank you for your support!', options: ['Obrigado pelo seu apoio!', 'Obrigado pela sua ajuda com a pesquisa!', 'Obrigado por vir!'], answer: 'Obrigado pelo seu apoio!', why: '"Support" = apoio.' },
]);

R(11, [['no one', 'ninguém'], ['either', 'qualquer um (dos dois), também não'], ['rather', 'preferir (I\'d rather)'], ['anyway', 'de qualquer jeito, enfim']], [
  { type: 'match', pairs: [['no one', 'ninguém'], ['either', 'qualquer um dos dois'], ['rather', 'preferir'], ['anyway', 'de qualquer jeito']], why: '"I\'d rather" = eu prefiro, eu preferia.' },
  { type: 'choice', prompt: 'Complete:', en: "Saturday or Sunday? ___ day is fine for me.", pt: 'Sábado ou domingo? Qualquer um dos dois está bom para mim.', options: ['Either', 'Both', 'Every'], answer: 'Either', why: '"Either" = qualquer um dos dois.', wrong: { Both: '"Both days" pediria "are".', Every: '"Every" é para mais de dois.' } },
  { type: 'choice', prompt: 'Complete:', en: "I'd ___ stay at home tonight.", pt: 'Eu prefiro ficar em casa hoje à noite.', options: ['rather', 'prefer', 'like'], answer: 'rather', why: '"I\'d rather" + verbo normal = prefiro.', wrong: { prefer: '"I\'d prefer" pediria "to stay".', like: '"I\'d like stay" falta o "to".' } },
  { type: 'meaning', en: 'I invited them, but no one came.', options: ['Eu convidei, mas ninguém veio.', 'Eu convidei e todo mundo veio.', 'Ninguém me convidou.'], answer: 'Eu convidei, mas ninguém veio.', why: '"No one" = ninguém. Um negativo só: no one came.' },
  { type: 'build', pt: 'Está chovendo, mas vamos sair de qualquer jeito.', answer: "It's raining but let's go out anyway", extra: ['either', 'rather'], display: "It's raining, but let's go out anyway.", why: '"Anyway" no fim = mesmo assim, de qualquer jeito.' },
  { type: 'listen', en: "I don't like it either.", options: ['Eu também não gosto.', 'Eu também gosto.', 'Eu não gosto de nenhum.'], answer: 'Eu também não gosto.', why: 'Na negativa, "também não" = "either" no fim.' },
]);

R(12, [['fire', 'fogo, incêndio'], ['crime', 'crime'], ['fear', 'medo'], ['trouble', 'problema, encrenca']], [
  { type: 'match', pairs: [['fire', 'incêndio'], ['crime', 'crime'], ['fear', 'medo'], ['trouble', 'encrenca']], why: '"Be in trouble" = estar em apuros, encrencado.' },
  { type: 'choice', prompt: 'Complete:', en: 'Call the police! There is a ___ in the building!', pt: 'Chame a polícia! Tem um incêndio no prédio!', options: ['fire', 'crime', 'fear'], answer: 'fire', why: '"Fire" = fogo, incêndio.', wrong: { crime: '"Crime" = crime.', fear: '"Fear" = medo.' } },
  { type: 'choice', prompt: 'Complete:', en: "We're in ___. We missed the last bus!", pt: 'Estamos encrencados. Perdemos o último ônibus!', options: ['trouble', 'fear', 'fire'], answer: 'trouble', why: '"In trouble" = em apuros.', wrong: { fear: '"In fear" = com medo.', fire: '"In fire" não se usa.' } },
  { type: 'meaning', en: 'There is not much crime in my town.', options: ['Não tem muito crime na minha cidade.', 'Minha cidade é perigosa.', 'A polícia não trabalha na minha cidade.'], answer: 'Não tem muito crime na minha cidade.', why: '"Crime" não se conta: not much crime.' },
  { type: 'build', pt: 'Ela tem medo de cachorros grandes.', answer: 'She has a fear of big dogs', extra: ['afraid', 'have'], display: 'She has a fear of big dogs.', why: '"Have a fear of" = ter medo de. Também: She is afraid of big dogs.' },
  { type: 'listen', en: 'What was the trouble?', options: ['Qual era o problema?', 'Onde foi o incêndio?', 'Quem chamou a polícia?'], answer: 'Qual era o problema?', why: '"Trouble" = problema.' },
]);

R(13, [['herself', 'ela mesma, se'], ['himself', 'ele mesmo, se'], ['themselves', 'eles mesmos, se'], ['without', 'sem']], [
  { type: 'match', pairs: [['herself', 'ela mesma'], ['himself', 'ele mesmo'], ['themselves', 'eles mesmos'], ['without', 'sem']], why: 'myself, yourself, himself, herself, itself, ourselves, themselves.' },
  { type: 'choice', prompt: 'Complete:', en: 'She cleaned the whole house by ___.', pt: 'Ela limpou a casa toda sozinha.', options: ['herself', 'her', 'himself'], answer: 'herself', why: '"By herself" = sozinha, ela mesma.', wrong: { her: '"By her" = por ela (outra pessoa).', himself: '"Himself" é para ele.' } },
  { type: 'choice', prompt: 'Complete:', en: 'I can\'t live ___ coffee!', pt: 'Não consigo viver sem café!', options: ['without', 'with', 'no'], answer: 'without', why: '"Without" = sem.', wrong: { with: '"With" = com.', no: '"Live no coffee" não existe.' } },
  { type: 'meaning', en: 'The kids made dinner themselves.', options: ['As crianças fizeram o jantar sozinhas.', 'Fizemos o jantar para as crianças.', 'As crianças não jantaram.'], answer: 'As crianças fizeram o jantar sozinhas.', why: '"Themselves" = eles mesmos, sozinhos.' },
  { type: 'build', pt: 'Ele se machucou na cozinha.', answer: 'He hurt himself in the kitchen', extra: ['him', 'herself'], display: 'He hurt himself in the kitchen.', why: '"Hurt himself" = se machucou. A ação volta para a mesma pessoa.' },
  { type: 'listen', en: 'Please leave without making noise.', options: ['Por favor, saia sem fazer barulho.', 'Por favor, faça barulho.', 'Por favor, não saia.'], answer: 'Por favor, saia sem fazer barulho.', why: 'Depois de "without", verbo com -ing.' },
]);

R(14, [['address', 'endereço'], ['map', 'mapa'], ['ahead', 'à frente, adiante'], ['across', 'do outro lado de, atravessando']], [
  { type: 'match', pairs: [['address', 'endereço'], ['map', 'mapa'], ['ahead', 'à frente'], ['across', 'do outro lado']], why: '"Address" tem dois "d" e dois "s".' },
  { type: 'choice', prompt: 'Complete:', en: 'The bank is ___ the street.', pt: 'O banco fica do outro lado da rua.', options: ['across', 'ahead', 'along'], answer: 'across', why: '"Across the street" = do outro lado da rua.', wrong: { ahead: '"Ahead" = à frente.', along: '"Along" = ao longo.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Go straight ___. The hotel is on the right.', pt: 'Siga em frente. O hotel fica à direita.', options: ['ahead', 'across', 'away'], answer: 'ahead', why: '"Go straight ahead" = siga em frente.', wrong: { across: '"Across" = do outro lado.', away: '"Go away" = vá embora!' } },
  { type: 'meaning', en: 'Can you show me on the map?', options: ['Você pode me mostrar no mapa?', 'Você tem um mapa?', 'Onde fica o mapa?'], answer: 'Você pode me mostrar no mapa?', why: '"Show me on the map" = me mostre no mapa.' },
  { type: 'build', pt: 'Qual é o endereço do hotel?', answer: "What's the address of the hotel", extra: ['where', 'addresses'], display: "What's the address of the hotel?", why: '"Address" = endereço.' },
  { type: 'listen', en: 'We walked across the bridge.', options: ['Atravessamos a ponte a pé.', 'Ficamos embaixo da ponte.', 'Vimos a ponte de longe.'], answer: 'Atravessamos a ponte a pé.', why: '"Across" = atravessando.' },
]);

R(15, [['north / south', 'norte / sul'], ['east / west', 'leste / oeste'], ['land', 'terra, terreno'], ['wild', 'selvagem']], [
  { type: 'match', pairs: [['north', 'norte'], ['south', 'sul'], ['east', 'leste'], ['west', 'oeste']], why: 'O sol nasce no leste (east) e se põe no oeste (west).' },
  { type: 'choice', prompt: 'Complete:', en: 'Argentina is ___ of Brazil.', pt: 'A Argentina fica ao sul do Brasil.', options: ['south', 'north', 'east'], answer: 'south', why: '"South of" = ao sul de.', wrong: { north: 'A Argentina não fica ao norte do Brasil.', east: 'A leste do Brasil fica o oceano.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The sun comes up in the ___.', pt: 'O sol nasce no leste.', options: ['east', 'west', 'north'], answer: 'east', why: 'O sol nasce no leste (east) e se põe no oeste (west).', wrong: { west: 'No oeste o sol se põe.', north: '"North" = norte.' } },
  { type: 'meaning', en: 'There are many wild animals in the forest.', options: ['Tem muitos animais selvagens na floresta.', 'Tem muitos animais de estimação na floresta.', 'Não tem animais na floresta.'], answer: 'Tem muitos animais selvagens na floresta.', why: '"Wild" = selvagem.' },
  { type: 'build', pt: 'Meu avô tem um pedaço de terra no sul.', answer: 'My grandpa has a piece of land in the south', extra: ['have', 'north'], display: 'My grandpa has a piece of land in the south.', why: '"Land" não se conta: a piece of land.' },
  { type: 'listen', en: 'The wind is coming from the west.', options: ['O vento está vindo do oeste.', 'O vento está vindo do leste.', 'Não tem vento hoje.'], answer: 'O vento está vindo do oeste.', why: '"West" = oeste.' },
]);

R(16, [['birth', 'nascimento'], ['success', 'sucesso'], ['successful', 'bem-sucedido(a)'], ['goal', 'objetivo, meta; gol']], [
  { type: 'match', pairs: [['birth', 'nascimento'], ['success', 'sucesso'], ['successful', 'bem-sucedido'], ['goal', 'objetivo']], why: '"Goal" é objetivo e também gol no futebol.' },
  { type: 'choice', prompt: 'Complete:', en: "What's your date of ___?", pt: 'Qual é a sua data de nascimento?', options: ['birth', 'born', 'birthday'], answer: 'birth', why: '"Date of birth" = data de nascimento.', wrong: { born: '"Born" vem em "I was born".', birthday: '"Birthday" = aniversário.' } },
  { type: 'choice', prompt: 'Complete:', en: 'She is a very ___ lawyer.', pt: 'Ela é uma advogada muito bem-sucedida.', options: ['successful', 'success', 'successes'], answer: 'successful', why: '"Successful" é o adjetivo (bem-sucedido).', wrong: { success: '"Success" é o substantivo (o sucesso).', successes: '"Successes" = sucessos (plural do substantivo).' } },
  { type: 'meaning', en: 'My goal is to speak English well.', options: ['Meu objetivo é falar inglês bem.', 'Meu gol foi bonito.', 'Eu falo inglês bem.'], answer: 'Meu objetivo é falar inglês bem.', why: '"Goal" = objetivo, meta.' },
  { type: 'build', pt: 'O show foi um grande sucesso.', answer: 'The show was a big success', extra: ['successful', 'were'], display: 'The show was a big success.', why: '"A success" = um sucesso.' },
  { type: 'listen', en: 'Hard work is the key to success.', options: ['Trabalho duro é a chave do sucesso.', 'O sucesso é fácil.', 'Ele trabalha muito.'], answer: 'Trabalho duro é a chave do sucesso.', why: '"The key to success" = a chave do sucesso.' },
]);
