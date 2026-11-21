// Reforço de vocabulário do A1: uma lição "Palavras essenciais" (l11) em cada unidade, com as
// palavras mais usadas do inglês que o A1 ainda não ensinava (relatório por frequência em
// docs/cobertura-vocabulario.md). As lições são "bonus": aparecem como novas, dão XP e não contam
// para concluir a unidade.
// Uso: node scripts/content-add/reforco-a1.mjs  (rodar DEPOIS dos scripts das unidades, que reescrevem
// as unidades 9 a 16; pode rodar de novo sem duplicar)
import { addLessons } from './lib.mjs';

// unidades 1 a 8: depois da prática extra (l8); unidades 9 a 16: depois da prática (l4)
const after = (n) => `a1-u${n}-l${n <= 8 ? 8 : 4}`;
function R(n, words, items) {
  addLessons(`a1/unit-${String(n).padStart(2, '0')}.json`, {
    words,
    lessons: [{ after: after(n), lesson: { id: `a1-u${n}-l11`, title: 'Palavras essenciais', bonus: true, items: items.map((it, k) => ({ id: `a1u${n}l11-${k + 1}`, ...it })) } }],
  });
}

R(1, [['ask', 'perguntar, pedir'], ['tell', 'contar, dizer (para alguém)'], ['also', 'também'], ['same', 'mesmo(a), igual']], [
  { type: 'match', pairs: [['ask', 'perguntar'], ['tell', 'contar'], ['also', 'também'], ['same', 'mesmo']], why: 'Quatro palavras entre as mais usadas do inglês. Você vai ouvir todas elas todo dia.' },
  { type: 'choice', prompt: 'Complete:', en: 'Can I ___ a question?', pt: 'Posso fazer uma pergunta?', options: ['ask', 'tell', 'say'], answer: 'ask', why: 'Fazer uma pergunta = "ask a question".', wrong: { tell: '"Tell" é contar ou dizer algo para alguém.', say: '"Say a question" não se usa.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Please ___ me your name.', pt: 'Por favor, me diga o seu nome.', options: ['tell', 'ask', 'speak'], answer: 'tell', why: '"Tell me" = me diga, me conte. Depois de "tell" vem a pessoa.', wrong: { ask: '"Ask me" é "me pergunte".', speak: '"Speak" é falar (um idioma, com alguém).' } },
  { type: 'meaning', en: 'I am also a student.', options: ['Eu também sou estudante.', 'Eu sou só estudante.', 'Eu não sou estudante.'], answer: 'Eu também sou estudante.', why: '"Also" = também. Vem depois de "am/is/are" e antes de outros verbos.' },
  { type: 'build', pt: 'Nós temos o mesmo nome!', answer: 'We have the same name', extra: ['some', 'a'], display: 'We have the same name!', why: '"The same" = o mesmo. Sempre com "the".' },
  { type: 'listen', en: 'She is from the same city.', options: ['Ela é da mesma cidade.', 'Ela mora numa cidade grande.', 'Ela é de outra cidade.'], answer: 'Ela é da mesma cidade.', why: '"The same city" = a mesma cidade.' },
]);

R(2, [['real', 'real, de verdade'], ['true', 'verdade, verdadeiro'], ['own', 'próprio(a)'], ['different', 'diferente']], [
  { type: 'match', pairs: [['real', 'real'], ['true', 'verdadeiro'], ['own', 'próprio'], ['different', 'diferente']], why: '"True" = é verdade. "Real" = existe de verdade (não é falso).' },
  { type: 'choice', prompt: 'Complete:', en: "Is it ___? You're from Japan?", pt: 'É verdade? Você é do Japão?', options: ['true', 'real', 'own'], answer: 'true', why: '"Is it true?" = é verdade?', wrong: { real: '"Real" é real, de verdade (uma coisa que existe).', own: '"Own" = próprio.' } },
  { type: 'choice', prompt: 'Complete:', en: 'I have my ___ room.', pt: 'Eu tenho o meu próprio quarto.', options: ['own', 'same', 'real'], answer: 'own', why: '"My own" = meu próprio. "Own" vem depois de my, your, his, her.', wrong: { same: '"My same room" não faz sentido.', real: '"My real room" seria "meu quarto de verdade".' } },
  { type: 'meaning', en: 'My brother and I are very different.', options: ['Meu irmão e eu somos muito diferentes.', 'Meu irmão e eu somos iguais.', 'Meu irmão é muito alto.'], answer: 'Meu irmão e eu somos muito diferentes.', why: '"Different" = diferente. O contrário é "the same".' },
  { type: 'build', pt: 'O nome dele de verdade é Pedro.', answer: 'His real name is Pedro', extra: ['true', 'her'], display: 'His real name is Pedro.', why: '"Real name" = nome de verdade.' },
  { type: 'listen', en: "That's true!", options: ['É verdade!', 'Que legal!', 'Não é verdade!'], answer: 'É verdade!', why: '"That\'s true" = é verdade. Muito usado para concordar.' },
]);

R(3, [['almost', 'quase'], ['once', 'uma vez'], ['each', 'cada'], ['large', 'grande']], [
  { type: 'match', pairs: [['almost', 'quase'], ['once', 'uma vez'], ['each', 'cada'], ['large', 'grande']], why: '"Once" = uma vez. "Twice" = duas vezes. Depois: three times.' },
  { type: 'choice', prompt: 'Complete:', en: "I'm ___ twenty. My birthday is on Friday!", pt: 'Eu tenho quase vinte anos. Meu aniversário é na sexta!', options: ['almost', 'once', 'each'], answer: 'almost', why: '"Almost" = quase. Vem antes do número.', wrong: { once: '"Once" = uma vez.', each: '"Each" = cada.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The pens are two reais ___.', pt: 'As canetas custam dois reais cada.', options: ['each', 'once', 'all'], answer: 'each', why: '"Each" no fim = cada uma.', wrong: { once: '"Once" = uma vez.', all: '"All" = todas juntas.' } },
  { type: 'meaning', en: 'I call my grandma once a week.', options: ['Eu ligo para minha avó uma vez por semana.', 'Eu ligo para minha avó todo dia.', 'Eu ligo para minha avó uma semana sim, outra não.'], answer: 'Eu ligo para minha avó uma vez por semana.', why: '"Once a week" = uma vez por semana.' },
  { type: 'build', pt: 'Cada aluno tem um livro.', answer: 'Each student has a book', extra: ['have', 'all'], display: 'Each student has a book.', why: 'Depois de "each", singular: each student HAS.' },
  { type: 'listen', en: 'Can I have a large coffee?', options: ['Pode me dar um café grande?', 'Pode me dar um café pequeno?', 'Você quer um café?'], answer: 'Pode me dar um café grande?', why: '"Large" = grande (em tamanho de pedido: small, medium, large).' },
]);

R(4, [['both', 'os dois, ambos'], ['each other', 'um ao outro'], ['remember', 'lembrar'], ['face', 'rosto']], [
  { type: 'match', pairs: [['both', 'os dois'], ['each other', 'um ao outro'], ['remember', 'lembrar'], ['face', 'rosto']], why: '"Remember" = lembrar. "Forget" = esquecer.' },
  { type: 'choice', prompt: 'Complete:', en: 'I have two sisters. ___ are teachers.', pt: 'Tenho duas irmãs. As duas são professoras.', options: ['Both', 'Each', 'Same'], answer: 'Both', why: '"Both" = os dois, as duas.', wrong: { Each: '"Each" vem com singular: each is a teacher.', Same: '"Same" = mesmo.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Do you ___ my name?', pt: 'Você lembra do meu nome?', options: ['remember', 'know', 'tell'], answer: 'remember', why: '"Remember" = lembrar. Sem "of": remember my name.', wrong: { know: '"Know" = saber, conhecer.', tell: '"Tell" = contar.' } },
  { type: 'meaning', en: 'My parents love each other.', options: ['Meus pais se amam.', 'Meus pais amam os filhos.', 'Meus pais estão juntos há muito tempo.'], answer: 'Meus pais se amam.', why: '"Each other" = um ao outro. "Love each other" = se amam.' },
  { type: 'build', pt: 'O bebê tem o rosto da mãe.', answer: "The baby has his mother's face", extra: ['have', 'her'], display: "The baby has his mother's face.", why: '"Mother\'s face" = o rosto da mãe. O \'s mostra de quem é.' },
  { type: 'listen', en: 'We both like music.', options: ['Nós dois gostamos de música.', 'Só eu gosto de música.', 'Nós dois tocamos música.'], answer: 'Nós dois gostamos de música.', why: '"We both" = nós dois. "Both" vem antes do verbo.' },
]);

R(5, [['another', 'outro(a), mais um(a)'], ['nothing', 'nada'], ['top', 'topo, parte de cima'], ['side', 'lado']], [
  { type: 'match', pairs: [['another', 'outro'], ['nothing', 'nada'], ['top', 'topo'], ['side', 'lado']], why: '"Another" = an + other: outro (mais um).' },
  { type: 'choice', prompt: 'Complete:', en: 'Can I have ___ cup of coffee?', pt: 'Posso tomar mais uma xícara de café?', options: ['another', 'other', 'others'], answer: 'another', why: '"Another" + singular = mais um, outro.', wrong: { other: '"Other" pede "the" ou plural: the other cup.', others: '"Others" não vem antes de uma coisa.' } },
  { type: 'choice', prompt: 'Complete:', en: 'There is ___ in the box. Look!', pt: 'Não tem nada na caixa. Olha!', options: ['nothing', 'something', 'anything'], answer: 'nothing', why: '"Nothing" = nada. Em inglês, um só negativo: there is nothing.', wrong: { something: '"Something" = alguma coisa.', anything: '"Anything" vai em perguntas e com "not".' } },
  { type: 'meaning', en: 'The book is on the top shelf.', options: ['O livro está na prateleira de cima.', 'O livro está embaixo da mesa.', 'O livro está ao lado da prateleira.'], answer: 'O livro está na prateleira de cima.', why: '"Top" = em cima, no alto.' },
  { type: 'build', pt: 'A bolsa está do outro lado da mesa.', answer: 'The bag is on the other side of the table', extra: ['another', 'in'], display: 'The bag is on the other side of the table.', why: '"On the other side of" = do outro lado de.' },
  { type: 'listen', en: 'I have nothing in my bag.', options: ['Não tenho nada na minha bolsa.', 'Tenho tudo na minha bolsa.', 'Minha bolsa é nova.'], answer: 'Não tenho nada na minha bolsa.', why: '"Nothing" = nada.' },
]);

R(6, [['still', 'ainda'], ['until', 'até (tempo)'], ['keep', 'continuar, manter, guardar'], ['away', 'longe, fora']], [
  { type: 'match', pairs: [['still', 'ainda'], ['until', 'até'], ['keep', 'guardar'], ['away', 'longe']], why: '"Until" é "até" para tempo: until five. Para lugar, use "to".' },
  { type: 'choice', prompt: 'Complete:', en: 'It is ten o\'clock and he is ___ in bed.', pt: 'São dez horas e ele ainda está na cama.', options: ['still', 'until', 'away'], answer: 'still', why: '"Still" = ainda (a situação continua).', wrong: { until: '"Until" = até.', away: '"Away" = longe.' } },
  { type: 'choice', prompt: 'Complete:', en: 'I work from nine ___ five.', pt: 'Eu trabalho das nove até as cinco.', options: ['until', 'still', 'away'], answer: 'until', why: '"From ... until ..." = de ... até ...', wrong: { still: '"Still" = ainda.', away: '"Away" = longe.' } },
  { type: 'meaning', en: 'My grandparents live away from the city.', options: ['Meus avós moram longe da cidade.', 'Meus avós moram no centro da cidade.', 'Meus avós moram com a gente.'], answer: 'Meus avós moram longe da cidade.', why: '"Away from" = longe de.' },
  { type: 'build', pt: 'Ela continua estudando todo dia.', answer: 'She keeps studying every day', extra: ['keep', 'study'], display: 'She keeps studying every day.', why: '"Keep + -ing" = continuar fazendo. Com she: keeps.' },
  { type: 'listen', en: 'Are you still at work?', options: ['Você ainda está no trabalho?', 'Você vai trabalhar?', 'Você saiu do trabalho?'], answer: 'Você ainda está no trabalho?', why: '"Still" = ainda.' },
]);

R(7, [['health', 'saúde'], ['body', 'corpo'], ['heart', 'coração'], ['kind', 'tipo; gentil']], [
  { type: 'match', pairs: [['health', 'saúde'], ['body', 'corpo'], ['heart', 'coração'], ['kind', 'tipo']], why: '"Kind" tem dois sentidos: tipo (what kind of food?) e gentil (she is kind).' },
  { type: 'choice', prompt: 'Complete:', en: 'What ___ of food do you like?', pt: 'Que tipo de comida você gosta?', options: ['kind', 'side', 'way'], answer: 'kind', why: '"What kind of...?" = que tipo de...?', wrong: { side: '"Side" = lado.', way: '"Way" = jeito, caminho.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Fruit is good for your ___.', pt: 'Fruta faz bem para a saúde.', options: ['health', 'heart', 'body'], answer: 'health', why: '"Good for your health" = faz bem para a saúde.', wrong: { heart: 'Faz bem ao coração também, mas a expressão é "for your health".', body: 'Possível, mas a expressão natural é "for your health".' } },
  { type: 'meaning', en: 'Water is very important for the body.', options: ['A água é muito importante para o corpo.', 'A água é boa para beber no almoço.', 'O corpo precisa de comida.'], answer: 'A água é muito importante para o corpo.', why: '"Body" = corpo.' },
  { type: 'build', pt: 'Ela é muito gentil com todo mundo.', answer: 'She is very kind to everyone', extra: ['kinds', 'with'], display: 'She is very kind to everyone.', why: '"Kind to" = gentil com.' },
  { type: 'listen', en: 'Chocolate makes my heart happy.', options: ['Chocolate deixa meu coração feliz.', 'Chocolate faz mal para o coração.', 'Eu não como chocolate.'], answer: 'Chocolate deixa meu coração feliz.', why: '"Heart" = coração. Soa como "RÁRT".' },
]);

R(8, [['into', 'para dentro de'], ['through', 'por, através de'], ['around', 'em volta de, por aí'], ['along', 'ao longo de']], [
  { type: 'match', pairs: [['into', 'para dentro'], ['through', 'através'], ['around', 'em volta'], ['along', 'ao longo']], why: 'Quatro palavras de movimento. Muito usadas para explicar caminhos.' },
  { type: 'choice', prompt: 'Complete:', en: 'Go ___ the park and turn left.', pt: 'Atravesse o parque e vire à esquerda.', options: ['through', 'into', 'on'], answer: 'through', why: '"Through" = atravessando, por dentro de.', wrong: { into: '"Into" = entrar em.', on: '"On the park" não indica caminho.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Come ___ the house. It is cold outside.', pt: 'Entre na casa. Está frio lá fora.', options: ['into', 'through', 'along'], answer: 'into', why: '"Into" = para dentro (movimento).', wrong: { through: '"Through" = atravessando.', along: '"Along" = ao longo.' } },
  { type: 'meaning', en: 'We walked along the beach.', options: ['Caminhamos ao longo da praia.', 'Atravessamos a praia de carro.', 'Ficamos sentados na praia.'], answer: 'Caminhamos ao longo da praia.', why: '"Along" = ao longo de, beirando.' },
  { type: 'build', pt: 'Tem lojas em volta do parque.', answer: 'There are shops around the park', extra: ['is', 'into'], display: 'There are shops around the park.', why: '"Around" = em volta de.' },
  { type: 'listen', en: 'The bank is just around the corner.', options: ['O banco fica logo ali na esquina.', 'O banco fica longe daqui.', 'O banco está fechado.'], answer: 'O banco fica logo ali na esquina.', why: '"Around the corner" = logo ali, virando a esquina.' },
]);

R(9, [['inside', 'dentro'], ['wrong', 'errado(a)'], ['ready', 'pronto(a)'], ['else', 'mais, outro (something else)']], [
  { type: 'match', pairs: [['inside', 'dentro'], ['wrong', 'errado'], ['ready', 'pronto'], ['else', 'mais']], why: '"Else" vem depois de palavras como something, anything, who: something else = outra coisa.' },
  { type: 'choice', prompt: 'Complete:', en: 'It is raining. Let\'s stay ___.', pt: 'Está chovendo. Vamos ficar dentro de casa.', options: ['inside', 'into', 'outside'], answer: 'inside', why: '"Inside" = dentro (onde está). "Into" é movimento.', wrong: { into: '"Into" precisa de movimento e de um lugar depois.', outside: '"Outside" = lá fora; com chuva, não!' } },
  { type: 'choice', prompt: 'Complete:', en: 'Dinner is ___! Come to the kitchen.', pt: 'O jantar está pronto! Venham para a cozinha.', options: ['ready', 'wrong', 'inside'], answer: 'ready', why: '"Ready" = pronto.', wrong: { wrong: '"Wrong" = errado.', inside: '"Inside" = dentro.' } },
  { type: 'meaning', en: 'Sorry, this is the wrong key.', options: ['Desculpa, esta é a chave errada.', 'Desculpa, perdi a chave.', 'Esta chave é nova.'], answer: 'Desculpa, esta é a chave errada.', why: '"Wrong" = errado. O contrário é "right".' },
  { type: 'build', pt: 'Você quer mais alguma coisa?', answer: 'Do you want anything else', extra: ['other', 'any'], display: 'Do you want anything else?', why: '"Anything else" = mais alguma coisa. Muito usado em lojas.' },
  { type: 'listen', en: 'Are you ready?', options: ['Você está pronto?', 'Você está bem?', 'Você está em casa?'], answer: 'Você está pronto?', why: '"Ready" soa como "RÉ-di".' },
]);

R(10, [['mind', 'mente, cabeça'], ['feeling', 'sentimento, sensação'], ['believe', 'acreditar'], ['mean', 'querer dizer, significar']], [
  { type: 'match', pairs: [['mind', 'mente'], ['feeling', 'sentimento'], ['believe', 'acreditar'], ['mean', 'significar']], why: '"What does it mean?" = o que isso significa?' },
  { type: 'choice', prompt: 'Complete:', en: 'What does this word ___?', pt: 'O que esta palavra significa?', options: ['mean', 'say', 'believe'], answer: 'mean', why: '"What does ... mean?" = o que ... significa?', wrong: { say: '"What does it say?" = o que está escrito?', believe: '"Believe" = acreditar.' } },
  { type: 'choice', prompt: 'Complete:', en: "I don't ___ you. It isn't true!", pt: 'Não acredito em você. Não é verdade!', options: ['believe', 'mean', 'feel'], answer: 'believe', why: '"Believe" = acreditar. Sem "in" para pessoas: believe you.', wrong: { mean: '"Mean" = querer dizer.', feel: '"Feel" = sentir.' } },
  { type: 'meaning', en: 'I have a good feeling about this.', options: ['Tenho um bom pressentimento sobre isso.', 'Eu me sinto mal com isso.', 'Isso é muito bom.'], answer: 'Tenho um bom pressentimento sobre isso.', why: '"Feeling" = sentimento, sensação, pressentimento.' },
  { type: 'build', pt: 'Eu mudei de ideia.', answer: 'I changed my mind', extra: ['change', 'head'], display: 'I changed my mind.', why: '"Change my mind" = mudar de ideia.' },
  { type: 'listen', en: 'I believe you can do it.', options: ['Eu acredito que você consegue.', 'Eu sei que você não consegue.', 'Você acredita em mim?'], answer: 'Eu acredito que você consegue.', why: '"I believe you can" = acredito que você consegue.' },
]);

R(11, [['choose', 'escolher'], ['special', 'especial'], ['excellent', 'excelente'], ['lovely', 'lindo(a), adorável']], [
  { type: 'match', pairs: [['choose', 'escolher'], ['special', 'especial'], ['excellent', 'excelente'], ['lovely', 'adorável']], why: '"Lovely" é muito usado no inglês britânico: lindo, ótimo, adorável.' },
  { type: 'choice', prompt: 'Complete:', en: 'I can\'t ___. Both dresses are beautiful!', pt: 'Não consigo escolher. Os dois vestidos são lindos!', options: ['choose', 'buy', 'wear'], answer: 'choose', why: '"Choose" = escolher.', wrong: { buy: '"Buy" = comprar.', wear: '"Wear" = usar (roupa).' } },
  { type: 'choice', prompt: 'Complete:', en: 'This is a ___ day. It is my birthday!', pt: 'Hoje é um dia especial. É meu aniversário!', options: ['special', 'excellent', 'lovely'], answer: 'special', why: '"Special" = especial.', wrong: { excellent: '"Excellent" = excelente (qualidade).', lovely: '"Lovely day" seria um dia lindo (o tempo).' } },
  { type: 'meaning', en: 'What a lovely dress!', options: ['Que vestido lindo!', 'Que vestido caro!', 'Que vestido grande!'], answer: 'Que vestido lindo!', why: '"Lovely" = lindo, adorável.' },
  { type: 'build', pt: 'A comida nesta loja é excelente.', answer: 'The food in this shop is excellent', extra: ['these', 'are'], display: 'The food in this shop is excellent.', why: '"Excellent" = excelente. Soa como "ÉK-se-lent".' },
  { type: 'listen', en: 'You can choose the color.', options: ['Você pode escolher a cor.', 'Você pode comprar a cor.', 'A cor é especial.'], answer: 'Você pode escolher a cor.', why: '"Choose" soa como "TCHÚUZ".' },
]);

R(12, [['group', 'grupo'], ['art', 'arte'], ['history', 'história (matéria, do passado)'], ['news', 'notícia(s)']], [
  { type: 'match', pairs: [['group', 'grupo'], ['art', 'arte'], ['history', 'história'], ['news', 'notícias']], why: '"History" é a história do passado. "Story" é uma história inventada ou contada.' },
  { type: 'choice', prompt: 'Complete:', en: 'I watch the ___ every evening.', pt: 'Eu vejo o jornal (as notícias) toda noite.', options: ['news', 'history', 'art'], answer: 'news', why: '"The news" = as notícias, o jornal da TV.', wrong: { history: '"History" = história (passado).', art: '"Art" = arte.' } },
  { type: 'choice', prompt: 'Complete:', en: 'She loves ___. She paints every weekend.', pt: 'Ela adora arte. Pinta todo fim de semana.', options: ['art', 'news', 'group'], answer: 'art', why: '"Art" = arte. Soa como "ÁRT".', wrong: { news: '"News" = notícias.', group: '"Group" = grupo.' } },
  { type: 'meaning', en: 'We play music in a group.', options: ['A gente toca música num grupo.', 'A gente ouve música sozinho.', 'O grupo não gosta de música.'], answer: 'A gente toca música num grupo.', why: '"Group" = grupo.' },
  { type: 'build', pt: 'Eu gosto de aulas de história.', answer: 'I like history lessons', extra: ['story', 'likes'], display: 'I like history lessons.', why: '"History" para a matéria da escola.' },
  { type: 'listen', en: 'Good news! We have a new game.', options: ['Boa notícia! Temos um jogo novo.', 'Má notícia! Perdemos o jogo.', 'Temos notícias do jogo.'], answer: 'Boa notícia! Temos um jogo novo.', why: '"Good news" = boa notícia. "News" não tem plural diferente: é sempre "news".' },
]);

R(13, [['high', 'alto(a) (temperatura, preço, montanha)'], ['strong', 'forte'], ['glad', 'contente, feliz'], ['excited', 'animado(a), empolgado(a)']], [
  { type: 'match', pairs: [['high', 'alto'], ['strong', 'forte'], ['glad', 'contente'], ['excited', 'animado']], why: '"High" é alto para coisas (temperatura, preço). Para pessoas, use "tall".' },
  { type: 'choice', prompt: 'Complete:', en: 'The wind is very ___ today.', pt: 'O vento está muito forte hoje.', options: ['strong', 'high', 'tall'], answer: 'strong', why: '"Strong wind" = vento forte.', wrong: { high: '"High wind" existe, mas o mais comum é "strong".', tall: '"Tall" é para pessoas e prédios.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The price is very ___.', pt: 'O preço é muito alto.', options: ['high', 'tall', 'strong'], answer: 'high', why: 'Preço alto = high price. "High" é alto para coisas que não são pessoas.', wrong: { tall: '"Tall" é para pessoas e prédios.', strong: '"Strong" = forte.' } },
  { type: 'meaning', en: "I'm so excited about the trip!", options: ['Estou muito animado com a viagem!', 'Estou cansado da viagem.', 'A viagem foi chata.'], answer: 'Estou muito animado com a viagem!', why: '"Excited" = animado, empolgado (e não "excitado").' },
  { type: 'build', pt: 'Estou contente que você está aqui.', answer: "I'm glad you are here", extra: ['excited', 'is'], display: "I'm glad you are here.", why: '"Glad" = contente, feliz (por algo).' },
  { type: 'listen', en: 'Tomorrow will be sunny with a high of thirty.', options: ['Amanhã vai fazer sol, com máxima de trinta graus.', 'Amanhã vai chover o dia todo.', 'Hoje está fazendo trinta graus.'], answer: 'Amanhã vai fazer sol, com máxima de trinta graus.', why: '"A high of thirty" = máxima de trinta (previsão do tempo).' },
]);

R(14, [['information', 'informação, informações'], ['word', 'palavra'], ['line', 'linha, fila'], ['example', 'exemplo']], [
  { type: 'match', pairs: [['information', 'informação'], ['word', 'palavra'], ['line', 'linha'], ['example', 'exemplo']], why: '"Information" não tem plural: some information (e nunca "informations").' },
  { type: 'choice', prompt: 'Complete:', en: 'I need some ___ about the train.', pt: 'Preciso de informações sobre o trem.', options: ['information', 'informations', 'an information'], answer: 'information', why: '"Information" não se conta: some information.', wrong: { informations: 'Não existe plural.', 'an information': 'Não se usa "an" com information.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Can you give me an ___?', pt: 'Você pode me dar um exemplo?', options: ['example', 'word', 'line'], answer: 'example', why: '"For example" = por exemplo.', wrong: { word: '"A word" = uma palavra (e com "a", não "an").', line: '"A line" = uma linha (e com "a").' } },
  { type: 'meaning', en: "I'm waiting in line at the bank.", options: ['Estou esperando na fila do banco.', 'Estou trabalhando no banco.', 'Estou falando ao telefone no banco.'], answer: 'Estou esperando na fila do banco.', why: '"In line" = na fila (inglês americano).' },
  { type: 'build', pt: 'Eu não sei esta palavra.', answer: "I don't know this word", extra: ['these', 'words'], display: "I don't know this word.", why: '"Word" = palavra.' },
  { type: 'listen', en: 'Sorry, the line is busy.', options: ['Desculpe, a linha está ocupada.', 'Desculpe, a fila está grande.', 'A ligação caiu.'], answer: 'Desculpe, a linha está ocupada.', why: 'No telefone, "line" é a linha. "Busy" = ocupada.' },
]);

R(15, [['anyone', 'alguém, qualquer pessoa'], ['yourself', 'você mesmo(a), se'], ['guy', 'cara, rapaz'], ['cool', 'legal, bacana; fresco']], [
  { type: 'match', pairs: [['anyone', 'alguém'], ['yourself', 'você mesmo'], ['guy', 'cara'], ['cool', 'legal']], why: '"Cool" = legal (informal). Também quer dizer fresco, um pouco frio.' },
  { type: 'choice', prompt: 'Complete:', en: 'Does ___ know his name?', pt: 'Alguém sabe o nome dele?', options: ['anyone', 'someone', 'no'], answer: 'anyone', why: 'Em perguntas, "alguém" é "anyone".', wrong: { someone: '"Someone" vai em afirmações.', no: '"No" sozinho não forma "ninguém" aqui.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Tell me about ___.', pt: 'Me fale sobre você.', options: ['yourself', 'you', 'your'], answer: 'yourself', why: '"Tell me about yourself" é a frase clássica de entrevista.', wrong: { you: 'É possível, mas o natural é "yourself".', your: '"Your" precisa de algo depois.' } },
  { type: 'meaning', en: 'He is a really nice guy.', options: ['Ele é um cara muito legal.', 'Ele é muito alto.', 'Ele é um menino pequeno.'], answer: 'Ele é um cara muito legal.', why: '"Guy" = cara, rapaz (informal).' },
  { type: 'build', pt: 'A sua irmã é muito legal!', answer: 'Your sister is very cool', extra: ['you', 'cold'], display: 'Your sister is very cool!', why: '"Cool" = legal. Cuidado: "cold" = frio.' },
  { type: 'listen', en: 'Help yourself!', options: ['Sirva-se!', 'Me ajude!', 'Ajude ele!'], answer: 'Sirva-se!', why: '"Help yourself" = sirva-se, fique à vontade (com comida).' },
]);

R(16, [['way', 'caminho, jeito'], ['reason', 'motivo, razão'], ['form', 'formulário'], ['post', 'correio; postar']], [
  { type: 'match', pairs: [['way', 'caminho'], ['reason', 'motivo'], ['form', 'formulário'], ['post', 'correio']], why: '"Way" também é jeito: the best way = o melhor jeito.' },
  { type: 'choice', prompt: 'Complete:', en: 'Excuse me, is this the ___ to the airport?', pt: 'Com licença, este é o caminho para o aeroporto?', options: ['way', 'reason', 'form'], answer: 'way', why: '"The way to" = o caminho para.', wrong: { reason: '"Reason" = motivo.', form: '"Form" = formulário.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Please fill in this ___ at the hotel.', pt: 'Por favor, preencha este formulário no hotel.', options: ['form', 'post', 'way'], answer: 'form', why: '"Fill in a form" = preencher um formulário.', wrong: { post: '"Post" = correio.', way: '"Way" = caminho.' } },
  { type: 'meaning', en: 'What was the reason for your trip?', options: ['Qual foi o motivo da sua viagem?', 'Quando foi a sua viagem?', 'Como foi a sua viagem?'], answer: 'Qual foi o motivo da sua viagem?', why: '"Reason" = motivo. Pergunta comum no aeroporto.' },
  { type: 'build', pt: 'Eu postei as fotos da viagem.', answer: 'I posted the photos of the trip', extra: ['post', 'way'], display: 'I posted the photos of the trip.', why: '"Post" = postar (na internet). Passado: posted.' },
  { type: 'listen', en: "There's no way to get there by bus.", options: ['Não tem como chegar lá de ônibus.', 'O ônibus chega lá rápido.', 'Tem um ônibus para lá.'], answer: 'Não tem como chegar lá de ônibus.', why: '"There\'s no way" = não tem como, não tem jeito.' },
]);
