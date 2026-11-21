// Reforço de vocabulário do B1: uma lição "Palavras essenciais" (l11) em cada unidade, com as
// palavras do B1 mais usadas no inglês real que o curso ainda não ensinava (relatório por
// frequência em docs/cobertura-vocabulario.md). Lições "bonus": dão XP e não contam para concluir.
// Uso: node scripts/content-add/reforco-b1.mjs  (rodar DEPOIS dos scripts das unidades do B1, que
// reescrevem as unidades 9 a 16; pode rodar de novo sem duplicar)
import { addLessons } from './lib.mjs';

const after = (n) => `b1-u${n}-l${n <= 8 ? 8 : 4}`;
function R(n, words, items) {
  addLessons(`b1/unit-${String(n).padStart(2, '0')}.json`, {
    words,
    lessons: [{ after: after(n), lesson: { id: `b1-u${n}-l11`, title: 'Palavras essenciais', bonus: true, items: items.map((it, k) => ({ id: `b1u${n}l11-${k + 1}`, ...it })) } }],
  });
}

R(1, [['available', 'disponível'], ['various', 'vários(as), diversos(as)'], ['entire', 'inteiro(a)'], ['previous', 'anterior']], [
  { type: 'match', pairs: [['available', 'disponível'], ['various', 'diversos'], ['entire', 'inteiro'], ['previous', 'anterior']], why: '"Entire" é um jeito mais forte de dizer "whole": the entire day.' },
  { type: 'choice', prompt: 'Complete:', en: 'Sorry, the manager is not ___ right now.', pt: 'Desculpe, o gerente não está disponível agora.', options: ['available', 'previous', 'entire'], answer: 'available', why: '"Available" = disponível (pessoa livre ou coisa que dá para usar).', wrong: { previous: '"Previous" = anterior.', entire: '"Entire" = inteiro.' } },
  { type: 'choice', prompt: 'Complete:', en: 'I spent the ___ weekend at home.', pt: 'Passei o fim de semana inteiro em casa.', options: ['entire', 'various', 'available'], answer: 'entire', why: '"The entire weekend" = o fim de semana inteiro.', wrong: { various: '"Various" vem antes de plural: various places.', available: '"Available" = disponível.' } },
  { type: 'meaning', en: 'She has lived in various countries.', options: ['Ela já morou em vários países.', 'Ela nunca saiu do país.', 'Ela quer morar em outro país.'], answer: 'Ela já morou em vários países.', why: '"Various" = vários, diversos.' },
  { type: 'build', pt: 'Meu emprego anterior era mais perto de casa.', answer: 'My previous job was closer to home', extra: ['last', 'near'], display: 'My previous job was closer to home.', why: '"Previous" = anterior, o que veio antes.' },
  { type: 'listen', en: 'Is this seat available?', options: ['Este lugar está livre?', 'Este lugar é seu?', 'Posso trocar de lugar?'], answer: 'Este lugar está livre?', why: '"Is this seat available?" = este lugar está disponível/livre?' },
]);

R(2, [['including', 'incluindo'], ['per', 'por (cada)'], ['via', 'via, por meio de'], ['throughout', 'durante todo, por todo']], [
  { type: 'match', pairs: [['including', 'incluindo'], ['per', 'por cada'], ['via', 'por meio de'], ['throughout', 'durante todo']], why: '"Per" aparece em preços: 50 reais per person.' },
  { type: 'choice', prompt: 'Complete:', en: 'The tickets cost twenty dollars ___ person.', pt: 'Os ingressos custam vinte dólares por pessoa.', options: ['per', 'via', 'for each of'], answer: 'per', why: '"Per person" = por pessoa.', wrong: { via: '"Via" = por meio de, passando por.', 'for each of': 'Ficaria "for each of person": errado.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Everybody came, ___ my grandparents.', pt: 'Todo mundo veio, incluindo meus avós.', options: ['including', 'throughout', 'per'], answer: 'including', why: '"Including" = incluindo.', wrong: { throughout: '"Throughout" = durante todo.', per: '"Per" = por cada.' } },
  { type: 'meaning', en: 'It rained throughout the night.', options: ['Choveu a noite toda.', 'Choveu só um pouco à noite.', 'Parou de chover à noite.'], answer: 'Choveu a noite toda.', why: '"Throughout the night" = durante a noite toda.' },
  { type: 'build', pt: 'Eu te mando o arquivo por e-mail.', answer: "I'll send you the file via email", extra: ['sending', 'per'], display: "I'll send you the file via email.", why: '"Via email" = por e-mail.' },
  { type: 'listen', en: 'The price includes breakfast.', options: ['O preço inclui o café da manhã.', 'O café da manhã é pago à parte.', 'Não tem café da manhã.'], answer: 'O preço inclui o café da manhã.', why: '"Include" = incluir; "including" = incluindo.' },
]);

R(3, [['department', 'departamento, setor'], ['management', 'gerência, administração'], ['chief', 'chefe, principal'], ['firm', 'empresa, firma']], [
  { type: 'match', pairs: [['department', 'setor'], ['management', 'gerência'], ['chief', 'chefe'], ['firm', 'empresa']], why: '"Firm" é usado para escritórios: a law firm (escritório de advocacia).' },
  { type: 'choice', prompt: 'Complete:', en: 'She works in the sales ___.', pt: 'Ela trabalha no setor de vendas.', options: ['department', 'firm', 'chief'], answer: 'department', why: '"Sales department" = setor de vendas.', wrong: { firm: '"Firm" é a empresa inteira.', chief: '"Chief" é uma pessoa.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ decided to close the shop on Sundays.', pt: 'A gerência decidiu fechar a loja aos domingos.', options: ['management', 'department', 'manager of'], answer: 'management', why: '"The management" = a gerência, quem administra.', wrong: { department: 'Um setor não decide sozinho pela empresa.', 'manager of': 'Ficaria incompleto.' } },
  { type: 'meaning', en: 'He works for a small law firm in the city.', options: ['Ele trabalha num pequeno escritório de advocacia na cidade.', 'Ele é dono de uma empresa grande.', 'Ele estuda direito na cidade.'], answer: 'Ele trabalha num pequeno escritório de advocacia na cidade.', why: '"Law firm" = escritório de advocacia.' },
  { type: 'build', pt: 'O chefe de cozinha fez um prato especial.', answer: 'The chief cook made a special dish', extra: ['chef of', 'did'], display: 'The chief cook made a special dish.', why: '"Chief" = principal, chefe de algo.' },
  { type: 'listen', en: 'Which department do you work in?', options: ['Em qual setor você trabalha?', 'Onde fica a empresa?', 'Quem é o seu chefe?'], answer: 'Em qual setor você trabalha?', why: '"Department" = setor, departamento.' },
]);

R(4, [['tax', 'imposto'], ['income', 'renda'], ['amount', 'quantia, quantidade'], ['paid', 'pago(a), remunerado(a)']], [
  { type: 'match', pairs: [['tax', 'imposto'], ['income', 'renda'], ['amount', 'quantia'], ['paid', 'pago']], why: '"Amount" se usa com coisas que não se contam: a large amount of money.' },
  { type: 'choice', prompt: 'Complete:', en: 'Do I have to pay ___ on this?', pt: 'Preciso pagar imposto sobre isso?', options: ['tax', 'income', 'amount'], answer: 'tax', why: '"Pay tax" = pagar imposto.', wrong: { income: '"Income" = renda, o que você ganha.', amount: '"Amount" = quantia.' } },
  { type: 'choice', prompt: 'Complete:', en: 'That is a large ___ of money.', pt: 'É uma grande quantia de dinheiro.', options: ['amount', 'number', 'tax'], answer: 'amount', why: '"Amount of money" = quantia de dinheiro.', wrong: { number: '"Number" é para coisas que se contam: a number of people.', tax: '"Tax" = imposto.' } },
  { type: 'meaning', en: 'Her income is higher than mine.', options: ['A renda dela é maior que a minha.', 'Ela gasta mais do que eu.', 'Ela paga menos imposto.'], answer: 'A renda dela é maior que a minha.', why: '"Income" = renda, o que a pessoa ganha.' },
  { type: 'build', pt: 'É um trabalho bem pago.', answer: "It's a well paid job", extra: ['pay', 'good'], display: "It's a well-paid job.", why: '"Well-paid" = bem pago, bem remunerado.' },
  { type: 'listen', en: 'I already paid the bill.', options: ['Eu já paguei a conta.', 'Eu ainda não paguei a conta.', 'A conta está muito cara.'], answer: 'Eu já paguei a conta.', why: '"Paid" é o passado de "pay".' },
]);

R(5, [['insurance', 'seguro'], ['financial', 'financeiro(a)'], ['economic', 'econômico(a)'], ['economy', 'economia']], [
  { type: 'match', pairs: [['insurance', 'seguro'], ['financial', 'financeiro'], ['economic', 'econômico'], ['economy', 'economia']], why: 'Cuidado: "economic" é da economia do país; "barato" é "cheap".' },
  { type: 'choice', prompt: 'Complete:', en: 'Did you buy travel ___?', pt: 'Você comprou seguro-viagem?', options: ['insurance', 'economy', 'safe'], answer: 'insurance', why: '"Travel insurance" = seguro-viagem.', wrong: { economy: '"Economy" = economia.', safe: '"Safe" = seguro no sentido de "sem perigo".' } },
  { type: 'choice', prompt: 'Complete:', en: 'The country has serious ___ problems.', pt: 'O país tem problemas econômicos sérios.', options: ['economic', 'economy', 'insurance'], answer: 'economic', why: '"Economic" é adjetivo: economic problems.', wrong: { economy: '"Economy" é substantivo: the economy.', insurance: '"Insurance" = seguro.' } },
  { type: 'meaning', en: 'The economy is growing again.', options: ['A economia está crescendo de novo.', 'Tudo está mais barato.', 'Ninguém está economizando.'], answer: 'A economia está crescendo de novo.', why: '"The economy" = a economia (do país).' },
  { type: 'build', pt: 'Ela tem problemas financeiros.', answer: 'She has financial problems', extra: ['finance', 'have'], display: 'She has financial problems.', why: '"Financial" = financeiro.' },
  { type: 'listen', en: 'My car insurance is very expensive.', options: ['O seguro do meu carro é muito caro.', 'Meu carro é muito caro.', 'Vendi meu carro.'], answer: 'O seguro do meu carro é muito caro.', why: '"Car insurance" = seguro do carro.' },
]);

R(6, [['pain', 'dor'], ['treatment', 'tratamento'], ['disease', 'doença'], ['skin', 'pele']], [
  { type: 'match', pairs: [['pain', 'dor'], ['treatment', 'tratamento'], ['disease', 'doença'], ['skin', 'pele']], why: '"Pain" é a dor em geral; "headache" é dor de cabeça.' },
  { type: 'choice', prompt: 'Complete:', en: 'I have a terrible ___ in my back.', pt: 'Estou com uma dor horrível nas costas.', options: ['pain', 'disease', 'skin'], answer: 'pain', why: '"A pain in my back" = uma dor nas costas.', wrong: { disease: '"Disease" = doença.', skin: '"Skin" = pele.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Use sun cream to protect your ___.', pt: 'Use protetor solar para proteger a sua pele.', options: ['skin', 'pain', 'treatment'], answer: 'skin', why: '"Skin" = pele (do corpo).', wrong: { pain: '"Pain" = dor.', treatment: '"Treatment" = tratamento.' } },
  { type: 'meaning', en: 'The treatment takes three months.', options: ['O tratamento leva três meses.', 'A doença dura três meses.', 'Ele melhorou em três meses.'], answer: 'O tratamento leva três meses.', why: '"Treatment" = tratamento.' },
  { type: 'build', pt: 'É uma doença muito rara.', answer: "It's a very rare disease", extra: ['pain', 'rarely'], display: "It's a very rare disease.", why: '"Disease" = doença.' },
  { type: 'listen', en: 'The pain is getting better.', options: ['A dor está melhorando.', 'A dor está piorando.', 'Não sinto dor.'], answer: 'A dor está melhorando.', why: '"Get better" = melhorar.' },
]);

R(7, [['legal', 'legal (da lei), permitido'], ['justice', 'justiça'], ['prison', 'prisão'], ['safety', 'segurança']], [
  { type: 'match', pairs: [['legal', 'permitido por lei'], ['justice', 'justiça'], ['prison', 'prisão'], ['safety', 'segurança']], why: 'Falso amigo: "legal" em inglês é "da lei". O nosso "legal" é "cool" ou "nice".' },
  { type: 'choice', prompt: 'Complete:', en: 'Is it ___ to park here?', pt: 'É permitido estacionar aqui?', options: ['legal', 'cool', 'safety'], answer: 'legal', why: '"Legal" = permitido pela lei.', wrong: { cool: '"Cool" é o nosso "legal" de gíria.', safety: '"Safety" é substantivo: segurança.' } },
  { type: 'choice', prompt: 'Complete:', en: 'For your ___, please wear a helmet.', pt: 'Para a sua segurança, use capacete.', options: ['safety', 'safe', 'justice'], answer: 'safety', why: '"Safety" = segurança (contra acidentes).', wrong: { safe: '"Safe" é adjetivo: seguro.', justice: '"Justice" = justiça.' } },
  { type: 'meaning', en: 'He spent five years in prison.', options: ['Ele passou cinco anos na prisão.', 'Ele trabalhou cinco anos na polícia.', 'Ele estudou direito por cinco anos.'], answer: 'Ele passou cinco anos na prisão.', why: '"Prison" = prisão, cadeia.' },
  { type: 'build', pt: 'As pessoas querem justiça.', answer: 'People want justice', extra: ['wants', 'legal'], display: 'People want justice.', why: '"Justice" = justiça.' },
  { type: 'listen', en: 'Safety comes first.', options: ['A segurança vem em primeiro lugar.', 'Chegue cedo.', 'O primeiro é o mais rápido.'], answer: 'A segurança vem em primeiro lugar.', why: '"Safety first" é frase comum em placas.' },
]);

R(8, [['election', 'eleição'], ['politics', 'política'], ['council', 'câmara, conselho'], ['majority', 'maioria']], [
  { type: 'match', pairs: [['election', 'eleição'], ['politics', 'política'], ['council', 'câmara municipal'], ['majority', 'maioria']], why: '"Politics" termina em -s mas é singular: politics is…' },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ is next Sunday.', pt: 'A eleição é no próximo domingo.', options: ['election', 'council', 'majority'], answer: 'election', why: '"Election" = eleição.', wrong: { council: '"Council" = conselho, câmara.', majority: '"Majority" = maioria.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ of people agree with the plan.', pt: 'A maioria das pessoas concorda com o plano.', options: ['majority', 'most', 'politics'], answer: 'majority', why: '"The majority of" = a maioria de.', wrong: { most: '"Most" não leva "the ... of" assim: most people.', politics: '"Politics" = política.' } },
  { type: 'meaning', en: "I'm not interested in politics.", options: ['Não me interesso por política.', 'Eu trabalho com política.', 'Gosto muito de política.'], answer: 'Não me interesso por política.', why: '"Interested in" = interessado em.' },
  { type: 'build', pt: 'A câmara vai construir um parque novo.', answer: 'The council is going to build a new park', extra: ['politics', 'built'], display: 'The council is going to build a new park.', why: '"Council" = câmara municipal, conselho da cidade.' },
  { type: 'listen', en: 'Who won the election?', options: ['Quem ganhou a eleição?', 'Quando é a eleição?', 'Em quem você votou?'], answer: 'Quem ganhou a eleição?', why: '"Win an election" = ganhar uma eleição.' },
]);

R(9, [['network', 'rede'], ['access', 'acesso'], ['link', 'link, ligação'], ['digital', 'digital']], [
  { type: 'match', pairs: [['network', 'rede'], ['access', 'acesso'], ['link', 'ligação'], ['digital', 'digital']], why: '"Access" também é verbo: access the internet.' },
  { type: 'choice', prompt: 'Complete:', en: "I can't ___ my email from here.", pt: 'Não consigo acessar meu e-mail daqui.', options: ['access', 'link', 'network'], answer: 'access', why: '"Access" = acessar.', wrong: { link: '"Link" = ligar, conectar.', network: '"Network" = rede.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Click on the ___ to see the photos.', pt: 'Clique no link para ver as fotos.', options: ['link', 'access', 'digital'], answer: 'link', why: '"Click on the link" = clique no link.', wrong: { access: '"Access" = acesso.', digital: '"Digital" é adjetivo.' } },
  { type: 'meaning', en: 'The phone network is down.', options: ['A rede do celular está fora do ar.', 'O celular está sem bateria.', 'O sinal está ótimo.'], answer: 'A rede do celular está fora do ar.', why: '"Be down" = estar fora do ar.' },
  { type: 'build', pt: 'Hoje em dia tudo é digital.', answer: 'Nowadays everything is digital', extra: ['every', 'are'], display: 'Nowadays, everything is digital.', why: '"Everything" é singular: everything is.' },
  { type: 'listen', en: "Do you have access to the internet?", options: ['Você tem acesso à internet?', 'Você usa muito a internet?', 'A internet está lenta?'], answer: 'Você tem acesso à internet?', why: '"Access to" = acesso a.' },
]);

R(10, [['channel', 'canal'], ['content', 'conteúdo'], ['comment', 'comentário, comentar'], ['edition', 'edição']], [
  { type: 'match', pairs: [['channel', 'canal'], ['content', 'conteúdo'], ['comment', 'comentário'], ['edition', 'edição']], why: '"Content" é incontável: a lot of content.' },
  { type: 'choice', prompt: 'Complete:', en: 'What ___ is the game on?', pt: 'Em que canal está o jogo?', options: ['channel', 'content', 'edition'], answer: 'channel', why: '"Channel" = canal (TV, internet).', wrong: { content: '"Content" = conteúdo.', edition: '"Edition" = edição.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Please leave a ___ below the video.', pt: 'Por favor, deixe um comentário embaixo do vídeo.', options: ['comment', 'channel', 'contents'], answer: 'comment', why: '"Leave a comment" = deixar um comentário.', wrong: { channel: '"Channel" = canal.', contents: '"Contents" = conteúdo, índice.' } },
  { type: 'meaning', en: 'She creates content for her channel every day.', options: ['Ela cria conteúdo para o canal dela todo dia.', 'Ela assiste a um canal todo dia.', 'Ela fechou o canal dela.'], answer: 'Ela cria conteúdo para o canal dela todo dia.', why: '"Create content" = criar conteúdo.' },
  { type: 'build', pt: 'Comprei a edição nova da revista.', answer: 'I bought the new edition of the magazine', extra: ['buyed', 'channel'], display: 'I bought the new edition of the magazine.', why: '"Edition" = edição (de livro, revista).' },
  { type: 'listen', en: "No comment!", options: ['Sem comentários!', 'Comente aqui!', 'Que comentário bom!'], answer: 'Sem comentários!', why: '"No comment" = sem comentários.' },
]);

R(11, [['immediately', 'imediatamente'], ['particularly', 'particularmente, especialmente'], ['generally', 'geralmente, em geral'], ['directly', 'diretamente']], [
  { type: 'match', pairs: [['immediately', 'imediatamente'], ['particularly', 'especialmente'], ['generally', 'em geral'], ['directly', 'diretamente']], why: 'Advérbios em -ly são como os nossos em -mente.' },
  { type: 'choice', prompt: 'Complete:', en: 'Call me ___ when you arrive.', pt: 'Me ligue imediatamente quando chegar.', options: ['immediately', 'generally', 'particularly'], answer: 'immediately', why: '"Immediately" = imediatamente, na hora.', wrong: { generally: '"Generally" = em geral.', particularly: '"Particularly" = especialmente.' } },
  { type: 'choice', prompt: 'Complete:', en: "I don't ___ like horror films.", pt: 'Não gosto especialmente de filmes de terror.', options: ['particularly', 'directly', 'immediately'], answer: 'particularly', why: '"Not particularly" = não muito, não especialmente.', wrong: { directly: '"Directly" = diretamente.', immediately: '"Immediately" = imediatamente.' } },
  { type: 'meaning', en: 'Generally, people here are very nice.', options: ['Em geral, as pessoas aqui são muito legais.', 'Ninguém aqui é simpático.', 'Só algumas pessoas são legais.'], answer: 'Em geral, as pessoas aqui são muito legais.', why: '"Generally" = em geral.' },
  { type: 'build', pt: 'Este trem vai direto para o aeroporto.', answer: 'This train goes directly to the airport', extra: ['direct', 'go'], display: 'This train goes directly to the airport.', why: '"Directly" = diretamente, sem parar.' },
  { type: 'listen', en: 'Please leave the building immediately.', options: ['Por favor, saiam do prédio imediatamente.', 'Por favor, fiquem no prédio.', 'O prédio fecha às dez.'], answer: 'Por favor, saiam do prédio imediatamente.', why: '"Leave" = sair de.' },
]);

R(12, [['potential', 'potencial, possível'], ['positive', 'positivo(a)'], ['effective', 'eficaz'], ['critical', 'crítico(a)']], [
  { type: 'match', pairs: [['potential', 'potencial'], ['positive', 'positivo'], ['effective', 'eficaz'], ['critical', 'crítico']], why: 'Falso amigo: "effective" = que funciona (eficaz), não "efetivo" de emprego.' },
  { type: 'choice', prompt: 'Complete:', en: 'Try to be ___. Things will get better.', pt: 'Tente ser positivo. As coisas vão melhorar.', options: ['positive', 'critical', 'potential'], answer: 'positive', why: '"Positive" = positivo, otimista.', wrong: { critical: '"Critical" = crítico.', potential: '"Potential" = potencial.' } },
  { type: 'choice', prompt: 'Complete:', en: 'This medicine is very ___.', pt: 'Este remédio é muito eficaz.', options: ['effective', 'positive', 'effect'], answer: 'effective', why: '"Effective" = eficaz, que funciona.', wrong: { positive: 'Um remédio não é "otimista".', effect: '"Effect" é substantivo: efeito.' } },
  { type: 'meaning', en: 'She has a lot of potential.', options: ['Ela tem muito potencial.', 'Ela tem muito poder.', 'Ela tem muitos problemas.'], answer: 'Ela tem muito potencial.', why: '"Potential" = potencial.' },
  { type: 'build', pt: 'Meu pai é muito crítico.', answer: 'My father is very critical', extra: ['critic', 'are'], display: 'My father is very critical.', why: '"Critical" = crítico (adjetivo). "Critic" é a pessoa que faz críticas.' },
  { type: 'listen', en: 'The test was positive.', options: ['O teste deu positivo.', 'O teste deu negativo.', 'Ainda não fiz o teste.'], answer: 'O teste deu positivo.', why: '"Positive" = positivo.' },
]);

R(13, [['approach', 'abordagem, aproximar-se'], ['analysis', 'análise'], ['theory', 'teoria'], ['option', 'opção']], [
  { type: 'match', pairs: [['approach', 'abordagem'], ['analysis', 'análise'], ['theory', 'teoria'], ['option', 'opção']], why: '"Approach" é substantivo (abordagem) e verbo (aproximar-se).' },
  { type: 'choice', prompt: 'Complete:', en: "We don't have any other ___.", pt: 'Não temos outra opção.', options: ['option', 'theory', 'analysis'], answer: 'option', why: '"Option" = opção.', wrong: { theory: '"Theory" = teoria.', analysis: '"Analysis" = análise.' } },
  { type: 'choice', prompt: 'Complete:', en: 'In ___, it works. In practice, it does not.', pt: 'Na teoria funciona. Na prática, não.', options: ['theory', 'option', 'approach'], answer: 'theory', why: '"In theory" = na teoria.', wrong: { option: '"Option" = opção.', approach: '"Approach" = abordagem.' } },
  { type: 'meaning', en: 'We need a new approach to this problem.', options: ['Precisamos de uma nova abordagem para esse problema.', 'Precisamos esquecer esse problema.', 'O problema é novo.'], answer: 'Precisamos de uma nova abordagem para esse problema.', why: '"Approach" = abordagem, jeito de lidar.' },
  { type: 'build', pt: 'A análise vai levar uma semana.', answer: 'The analysis will take a week', extra: ['analyse', 'takes'], display: 'The analysis will take a week.', why: '"Analysis" = análise.' },
  { type: 'listen', en: 'I have a theory about that.', options: ['Tenho uma teoria sobre isso.', 'Não sei nada sobre isso.', 'Já ouvi falar disso.'], answer: 'Tenho uma teoria sobre isso.', why: '"Theory" = teoria.' },
]);

R(14, [['growth', 'crescimento'], ['demand', 'procura, demanda'], ['supply', 'oferta, fornecimento'], ['gain', 'ganhar (aos poucos)']], [
  { type: 'match', pairs: [['growth', 'crescimento'], ['demand', 'procura'], ['supply', 'oferta'], ['gain', 'ganhar aos poucos']], why: '"Gain weight" = ganhar peso; "gain experience" = ganhar experiência.' },
  { type: 'choice', prompt: 'Complete:', en: 'There is a lot of ___ for English teachers.', pt: 'Há muita procura por professores de inglês.', options: ['demand', 'supply', 'growth'], answer: 'demand', why: '"Demand for" = procura por.', wrong: { supply: '"Supply" = oferta, o contrário.', growth: '"Growth" = crescimento.' } },
  { type: 'choice', prompt: 'Complete:', en: 'I ___ a lot of experience in that job.', pt: 'Ganhei muita experiência naquele emprego.', options: ['gained', 'won', 'earned money'], answer: 'gained', why: '"Gain experience" = ganhar experiência.', wrong: { won: '"Win" é ganhar jogo ou prêmio.', 'earned money': 'Não combina com "experience".' } },
  { type: 'meaning', en: 'The city had a lot of growth this year.', options: ['A cidade cresceu muito este ano.', 'A cidade ficou mais vazia.', 'A cidade ganhou um prêmio.'], answer: 'A cidade cresceu muito este ano.', why: '"Growth" = crescimento.' },
  { type: 'build', pt: 'A água vem de um rio perto daqui.', answer: 'The water supply comes from a river near here', extra: ['come', 'demand'], display: 'The water supply comes from a river near here.', why: '"Water supply" = fornecimento de água.' },
  { type: 'listen', en: 'I gained two kilos on holiday.', options: ['Engordei dois quilos nas férias.', 'Perdi dois quilos nas férias.', 'Não comi nada nas férias.'], answer: 'Engordei dois quilos nas férias.', why: '"Gain weight/kilos" = engordar.' },
]);

R(15, [['aware', 'ciente, consciente'], ['mental', 'mental'], ['respect', 'respeito, respeitar'], ['reality', 'realidade']], [
  { type: 'match', pairs: [['aware', 'ciente'], ['mental', 'mental'], ['respect', 'respeito'], ['reality', 'realidade']], why: '"Be aware of" = estar ciente de.' },
  { type: 'choice', prompt: 'Complete:', en: 'Are you ___ of the risks?', pt: 'Você está ciente dos riscos?', options: ['aware', 'mental', 'real'], answer: 'aware', why: '"Aware of" = ciente de.', wrong: { mental: '"Mental" = mental.', real: '"Real" = real.' } },
  { type: 'choice', prompt: 'Complete:', en: 'You should ___ other people.', pt: 'Você deveria respeitar as outras pessoas.', options: ['respect', 'aware', 'reality'], answer: 'respect', why: '"Respect" = respeitar.', wrong: { aware: '"Aware" é adjetivo.', reality: '"Reality" = realidade.' } },
  { type: 'meaning', en: 'Mental health is as important as physical health.', options: ['A saúde mental é tão importante quanto a física.', 'A saúde física é mais importante.', 'Ninguém fala de saúde mental.'], answer: 'A saúde mental é tão importante quanto a física.', why: '"Mental health" = saúde mental.' },
  { type: 'build', pt: 'Na realidade, a casa era bem pequena.', answer: 'In reality the house was quite small', extra: ['real', 'were'], display: 'In reality, the house was quite small.', why: '"In reality" = na realidade.' },
  { type: 'listen', en: 'I have a lot of respect for her.', options: ['Tenho muito respeito por ela.', 'Não gosto muito dela.', 'Ela me respeita muito.'], answer: 'Tenho muito respeito por ela.', why: '"Respect for" = respeito por.' },
]);

R(16, [['location', 'localização, local'], ['distance', 'distância'], ['region', 'região'], ['southern', 'do sul']], [
  { type: 'match', pairs: [['location', 'localização'], ['distance', 'distância'], ['region', 'região'], ['southern', 'do sul']], why: '"Southern", "northern": do sul, do norte.' },
  { type: 'choice', prompt: 'Complete:', en: 'The hotel is in a great ___, near the beach.', pt: 'O hotel tem uma ótima localização, perto da praia.', options: ['location', 'distance', 'region'], answer: 'location', why: '"Location" = localização.', wrong: { distance: '"Distance" = distância.', region: '"Region" é uma área grande.' } },
  { type: 'choice', prompt: 'Complete:', en: 'What is the ___ from here to the station?', pt: 'Qual é a distância daqui até a estação?', options: ['distance', 'location', 'far'], answer: 'distance', why: '"The distance from ... to ..." = a distância de ... até ...', wrong: { location: '"Location" = localização.', far: '"Far" é adjetivo: longe.' } },
  { type: 'meaning', en: 'It is very cold in the southern part of the country in winter.', options: ['No inverno faz muito frio no sul do país.', 'O sul do país é sempre quente.', 'O norte do país é muito frio.'], answer: 'No inverno faz muito frio no sul do país.', why: '"Southern" = do sul.' },
  { type: 'build', pt: 'Esta região é famosa pelo café.', answer: 'This region is famous for its coffee', extra: ['of', 'regions'], display: 'This region is famous for its coffee.', why: '"Famous for" = famoso por.' },
  { type: 'listen', en: 'We live in the same region.', options: ['Moramos na mesma região.', 'Moramos longe um do outro.', 'Moramos na mesma rua.'], answer: 'Moramos na mesma região.', why: '"Region" = região.' },
]);
