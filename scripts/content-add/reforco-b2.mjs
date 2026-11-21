// Reforço de vocabulário do B2: uma lição "Palavras essenciais" (l11) em cada unidade, com as
// palavras do B2 mais usadas no inglês real que o curso ainda não ensinava (relatório por
// frequência em docs/cobertura-vocabulario.md). Lições "bonus": dão XP e não contam para concluir.
// Uso: node scripts/content-add/reforco-b2.mjs  (rodar DEPOIS dos scripts das unidades do B2, que
// reescrevem as unidades 9 a 16; pode rodar de novo sem duplicar)
import { addLessons } from './lib.mjs';

const after = (n) => `b2-u${n}-l${n <= 8 ? 8 : 4}`;
function R(n, words, items) {
  addLessons(`b2/unit-${String(n).padStart(2, '0')}.json`, {
    words,
    lessons: [{ after: after(n), lesson: { id: `b2-u${n}-l11`, title: 'Palavras essenciais', bonus: true, items: items.map((it, k) => ({ id: `b2u${n}l11-${k + 1}`, ...it })) } }],
  });
}

R(1, [['community', 'comunidade'], ['environment', 'meio ambiente, ambiente'], ['urban', 'urbano(a)'], ['rural', 'rural']], [
  { type: 'match', pairs: [['community', 'comunidade'], ['environment', 'meio ambiente'], ['urban', 'urbano'], ['rural', 'rural']], why: '"The environment" = o meio ambiente; "a work environment" = um ambiente de trabalho.' },
  { type: 'choice', prompt: 'Complete:', en: 'We all need to protect the ___.', pt: 'Todos nós precisamos proteger o meio ambiente.', options: ['environment', 'community', 'nature'], answer: 'environment', why: '"Protect the environment" = proteger o meio ambiente.', wrong: { community: '"Community" = comunidade.', nature: '"Nature" = natureza; "protect the environment" é a expressão.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Life in ___ areas is quieter than in the city.', pt: 'A vida nas áreas rurais é mais tranquila do que na cidade.', options: ['rural', 'urban', 'environment'], answer: 'rural', why: '"Rural areas" = áreas rurais, o campo.', wrong: { urban: '"Urban" = da cidade, o contrário.', environment: '"Environment" é substantivo.' } },
  { type: 'meaning', en: 'The local community helped to build the school.', options: ['A comunidade local ajudou a construir a escola.', 'O governo construiu a escola.', 'A escola fechou por falta de alunos.'], answer: 'A comunidade local ajudou a construir a escola.', why: '"Community" = comunidade.' },
  { type: 'build', pt: 'O transporte urbano precisa melhorar.', answer: 'Urban transport needs to improve', extra: ['need', 'rural'], display: 'Urban transport needs to improve.', why: '"Urban" = urbano, da cidade.' },
  { type: 'listen', en: 'It is a friendly work environment.', options: ['É um ambiente de trabalho agradável.', 'O trabalho é muito difícil.', 'Ninguém gosta de trabalhar lá.'], answer: 'É um ambiente de trabalho agradável.', why: '"Work environment" = ambiente de trabalho.' },
]);

R(2, [['data', 'dados'], ['user', 'usuário(a)'], ['version', 'versão'], ['technical', 'técnico(a)']], [
  { type: 'match', pairs: [['data', 'dados'], ['user', 'usuário'], ['version', 'versão'], ['technical', 'técnico']], why: '"Data" é incontável no dia a dia: the data is ready.' },
  { type: 'choice', prompt: 'Complete:', en: 'Please update the program to the latest ___.', pt: 'Por favor, atualize o programa para a versão mais recente.', options: ['version', 'user', 'data'], answer: 'version', why: '"The latest version" = a versão mais recente.', wrong: { user: '"User" = usuário.', data: '"Data" = dados.' } },
  { type: 'choice', prompt: 'Complete:', en: 'We had some ___ problems during the meeting.', pt: 'Tivemos alguns problemas técnicos durante a reunião.', options: ['technical', 'technique', 'technology'], answer: 'technical', why: '"Technical" é adjetivo: technical problems.', wrong: { technique: '"Technique" = técnica, jeito de fazer.', technology: '"Technology" = tecnologia.' } },
  { type: 'meaning', en: 'The website has more than a million users.', options: ['O site tem mais de um milhão de usuários.', 'O site custa um milhão.', 'O site foi aberto uma vez.'], answer: 'O site tem mais de um milhão de usuários.', why: '"User" = usuário.' },
  { type: 'build', pt: 'Eles guardam os nossos dados com segurança.', answer: 'They keep our data safe', extra: ['datas', 'safety'], display: 'They keep our data safe.', why: '"Data" não tem plural com -s.' },
  { type: 'listen', en: 'I prefer the old version.', options: ['Prefiro a versão antiga.', 'A versão nova é melhor.', 'Não tenho a versão nova.'], answer: 'Prefiro a versão antiga.', why: '"Version" = versão.' },
]);

R(3, [['media', 'mídia, imprensa'], ['campaign', 'campanha'], ['marketing', 'marketing'], ['profile', 'perfil']], [
  { type: 'match', pairs: [['media', 'mídia'], ['campaign', 'campanha'], ['marketing', 'marketing'], ['profile', 'perfil']], why: '"Social media" = redes sociais.' },
  { type: 'choice', prompt: 'Complete:', en: 'I changed my ___ picture.', pt: 'Troquei minha foto de perfil.', options: ['profile', 'media', 'campaign'], answer: 'profile', why: '"Profile picture" = foto de perfil.', wrong: { media: '"Media" = mídia.', campaign: '"Campaign" = campanha.' } },
  { type: 'choice', prompt: 'Complete:', en: 'She spends hours on social ___.', pt: 'Ela passa horas nas redes sociais.', options: ['media', 'marketing', 'networks of'], answer: 'media', why: '"Social media" = redes sociais.', wrong: { marketing: '"Marketing" é a área de vender e divulgar.', 'networks of': 'Ficaria incompleto.' } },
  { type: 'meaning', en: 'The new campaign was a big success.', options: ['A campanha nova foi um grande sucesso.', 'A campanha não funcionou.', 'Ainda não começaram a campanha.'], answer: 'A campanha nova foi um grande sucesso.', why: '"Campaign" = campanha.' },
  { type: 'build', pt: 'Ela trabalha com marketing.', answer: 'She works in marketing', extra: ['with', 'work'], display: 'She works in marketing.', why: 'Área de trabalho: work IN marketing (não "with").' },
  { type: 'listen', en: 'The media is talking about it.', options: ['A imprensa está falando disso.', 'Ninguém sabe disso.', 'É um segredo.'], answer: 'A imprensa está falando disso.', why: '"The media" = a imprensa, a mídia.' },
]);

R(4, [['investment', 'investimento'], ['profit', 'lucro'], ['loan', 'empréstimo'], ['payment', 'pagamento']], [
  { type: 'match', pairs: [['investment', 'investimento'], ['profit', 'lucro'], ['loan', 'empréstimo'], ['payment', 'pagamento']], why: '"Make a profit" = ter lucro.' },
  { type: 'choice', prompt: 'Complete:', en: 'I asked the bank for a ___ to buy a car.', pt: 'Pedi um empréstimo ao banco para comprar um carro.', options: ['loan', 'profit', 'payment'], answer: 'loan', why: '"Loan" = empréstimo.', wrong: { profit: '"Profit" = lucro.', payment: '"Payment" = pagamento.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The company made a big ___ this year.', pt: 'A empresa teve um grande lucro este ano.', options: ['profit', 'loan', 'investment'], answer: 'profit', why: '"Make a profit" = ter lucro.', wrong: { loan: '"Loan" = empréstimo.', investment: '"Investment" = investimento.' } },
  { type: 'meaning', en: 'Buying a house is a good investment.', options: ['Comprar uma casa é um bom investimento.', 'Comprar uma casa é muito caro.', 'Alugar é melhor do que comprar.'], answer: 'Comprar uma casa é um bom investimento.', why: '"Investment" = investimento.' },
  { type: 'build', pt: 'O pagamento é no fim do mês.', answer: 'The payment is at the end of the month', extra: ['pay', 'in'], display: 'The payment is at the end of the month.', why: '"At the end of" = no fim de.' },
  { type: 'listen', en: 'We accept payment by card.', options: ['Aceitamos pagamento com cartão.', 'Só aceitamos dinheiro.', 'O cartão não funciona.'], answer: 'Aceitamos pagamento com cartão.', why: '"Payment by card" = pagamento com cartão.' },
]);

R(5, [['energy', 'energia'], ['solar', 'solar'], ['carbon', 'carbono'], ['reaction', 'reação']], [
  { type: 'match', pairs: [['energy', 'energia'], ['solar', 'solar'], ['carbon', 'carbono'], ['reaction', 'reação']], why: '"Energy" serve para eletricidade e para disposição: I have no energy.' },
  { type: 'choice', prompt: 'Complete:', en: 'We put ___ panels on the roof.', pt: 'Colocamos placas solares no telhado.', options: ['solar', 'sun', 'energy'], answer: 'solar', why: '"Solar panels" = placas solares.', wrong: { sun: '"Sun panels" não se usa.', energy: 'Ficaria "energy panels", que não se usa.' } },
  { type: 'choice', prompt: 'Complete:', en: "I'm so tired. I have no ___ today.", pt: 'Estou tão cansado. Estou sem energia hoje.', options: ['energy', 'reaction', 'carbon'], answer: 'energy', why: '"No energy" = sem energia, sem disposição.', wrong: { reaction: '"Reaction" = reação.', carbon: '"Carbon" = carbono.' } },
  { type: 'meaning', en: 'What was his reaction when you told him?', options: ['Qual foi a reação dele quando você contou?', 'Por que você não contou para ele?', 'Ele já sabia de tudo?'], answer: 'Qual foi a reação dele quando você contou?', why: '"Reaction" = reação.' },
  { type: 'build', pt: 'Os carros produzem muito carbono.', answer: 'Cars produce a lot of carbon', extra: ['produces', 'many'], display: 'Cars produce a lot of carbon.', why: '"Carbon" é incontável: a lot of carbon.' },
  { type: 'listen', en: 'Solar energy is clean and cheap.', options: ['A energia solar é limpa e barata.', 'A energia solar é muito cara.', 'O sol está muito forte.'], answer: 'A energia solar é limpa e barata.', why: '"Solar energy" = energia solar.' },
]);

R(6, [['literally', 'literalmente'], ['actual', 'real, de verdade'], ['overall', 'no geral, total'], ['specifically', 'especificamente']], [
  { type: 'match', pairs: [['literally', 'literalmente'], ['actual', 'real'], ['overall', 'no geral'], ['specifically', 'especificamente']], why: 'Falso amigo: "actual" = real, verdadeiro. "Atual" é "current".' },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ price was much higher than on the website.', pt: 'O preço real era bem mais alto do que no site.', options: ['actual', 'current', 'overall'], answer: 'actual', why: '"Actual" = real, de verdade.', wrong: { current: '"Current" = atual, de agora.', overall: '"Overall" = total, no geral.' } },
  { type: 'choice', prompt: 'Complete:', en: '___, the trip was great.', pt: 'No geral, a viagem foi ótima.', options: ['Overall', 'Literally', 'Specifically'], answer: 'Overall', why: '"Overall" = no geral, de modo geral.', wrong: { Literally: '"Literally" = literalmente.', Specifically: '"Specifically" = especificamente.' } },
  { type: 'meaning', en: 'I literally ran to the station.', options: ['Eu literalmente corri até a estação.', 'Fui de carro até a estação.', 'Perdi o trem.'], answer: 'Eu literalmente corri até a estação.', why: '"Literally" = literalmente.' },
  { type: 'build', pt: 'Eu fiz este bolo especificamente para você.', answer: 'I made this cake specifically for you', extra: ['did', 'specific'], display: 'I made this cake specifically for you.', why: '"Specifically" = especificamente, só para isso.' },
  { type: 'listen', en: 'What is the actual problem?', options: ['Qual é o problema real?', 'Qual é o problema atual?', 'Não tem problema.'], answer: 'Qual é o problema real?', why: '"Actual" = real, verdadeiro.' },
]);

R(7, [['previously', 'anteriormente'], ['originally', 'originalmente'], ['ultimately', 'no fim das contas'], ['significantly', 'consideravelmente']], [
  { type: 'match', pairs: [['previously', 'anteriormente'], ['originally', 'originalmente'], ['ultimately', 'no fim das contas'], ['significantly', 'consideravelmente']], why: '"Ultimately" = no final, no fim das contas.' },
  { type: 'choice', prompt: 'Complete:', en: "I'm ___ from Salvador, but I live in Rio now.", pt: 'Sou originalmente de Salvador, mas agora moro no Rio.', options: ['originally', 'previously', 'ultimately'], answer: 'originally', why: '"Originally from" = originalmente de.', wrong: { previously: '"Previously" = anteriormente.', ultimately: '"Ultimately" = no fim das contas.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Prices went up ___ this year.', pt: 'Os preços subiram consideravelmente este ano.', options: ['significantly', 'originally', 'previously'], answer: 'significantly', why: '"Significantly" = bastante, de forma importante.', wrong: { originally: '"Originally" = originalmente.', previously: '"Previously" = anteriormente.' } },
  { type: 'meaning', en: 'Ultimately, it is your decision.', options: ['No fim das contas, a decisão é sua.', 'Eu já decidi por você.', 'Ninguém pode decidir isso.'], answer: 'No fim das contas, a decisão é sua.', why: '"Ultimately" = no fim das contas.' },
  { type: 'build', pt: 'Ele trabalhou anteriormente num banco.', answer: 'He previously worked at a bank', extra: ['before of', 'works'], display: 'He previously worked at a bank.', why: '"Previously" = anteriormente, antes.' },
  { type: 'listen', en: 'As I previously said, the meeting is at ten.', options: ['Como eu disse antes, a reunião é às dez.', 'A reunião foi cancelada.', 'Não sei a hora da reunião.'], answer: 'Como eu disse antes, a reunião é às dez.', why: '"Previously" = anteriormente.' },
]);

R(8, [['willing', 'disposto(a)'], ['determined', 'determinado(a)'], ['tough', 'difícil, duro(a)'], ['faith', 'fé']], [
  { type: 'match', pairs: [['willing', 'disposto'], ['determined', 'determinado'], ['tough', 'duro'], ['faith', 'fé']], why: '"Be willing to" = estar disposto a.' },
  { type: 'choice', prompt: 'Complete:', en: "I'm ___ to help, but I don't have much time.", pt: 'Estou disposto a ajudar, mas não tenho muito tempo.', options: ['willing', 'determined', 'tough'], answer: 'willing', why: '"Willing to" = disposto a.', wrong: { determined: '"Determined" = determinado, decidido.', tough: '"Tough" = difícil, duro.' } },
  { type: 'choice', prompt: 'Complete:', en: 'It was a ___ year, but we got through it.', pt: 'Foi um ano difícil, mas a gente passou por ele.', options: ['tough', 'willing', 'faith'], answer: 'tough', why: '"Tough" = difícil, duro.', wrong: { willing: '"Willing" = disposto.', faith: '"Faith" = fé.' } },
  { type: 'meaning', en: 'She is determined to pass the exam.', options: ['Ela está decidida a passar na prova.', 'Ela tem medo da prova.', 'Ela não quer fazer a prova.'], answer: 'Ela está decidida a passar na prova.', why: '"Determined to" = decidido, determinado a.' },
  { type: 'build', pt: 'Não perca a fé.', answer: "Don't lose faith", extra: ['loose', 'faiths'], display: "Don't lose faith.", why: '"Lose" = perder. "Loose" = solto.' },
  { type: 'listen', en: "Don't worry. She's tough.", options: ['Não se preocupe. Ela é forte.', 'Ela está muito doente.', 'Ela é muito sensível.'], answer: 'Não se preocupe. Ela é forte.', why: 'Para pessoas, "tough" = forte, durona.' },
]);

R(9, [['conference', 'conferência, congresso'], ['panel', 'painel, banca'], ['executive', 'executivo(a)'], ['candidate', 'candidato(a)']], [
  { type: 'match', pairs: [['conference', 'congresso'], ['panel', 'banca'], ['executive', 'executivo'], ['candidate', 'candidato']], why: '"Conference call" = reunião por telefone ou vídeo.' },
  { type: 'choice', prompt: 'Complete:', en: 'There are five ___ for the job.', pt: 'Há cinco candidatos para a vaga.', options: ['candidates', 'executives', 'panels'], answer: 'candidates', why: '"Candidate" = candidato.', wrong: { executives: '"Executive" = executivo.', panels: '"Panel" = banca, painel.' } },
  { type: 'choice', prompt: 'Complete:', en: "She's going to a ___ in London next week.", pt: 'Ela vai a um congresso em Londres semana que vem.', options: ['conference', 'candidate', 'panel'], answer: 'conference', why: '"Conference" = congresso, conferência.', wrong: { candidate: '"Candidate" é uma pessoa.', panel: '"Panel" é um grupo que avalia ou debate.' } },
  { type: 'meaning', en: 'A panel of three people interviewed me.', options: ['Uma banca de três pessoas me entrevistou.', 'Três pessoas me ligaram.', 'Entrevistei três pessoas.'], answer: 'Uma banca de três pessoas me entrevistou.', why: '"Panel" = banca, grupo de avaliadores.' },
  { type: 'build', pt: 'Ele é executivo de uma empresa grande.', answer: "He's an executive at a big company", extra: ['executives', 'of'], display: "He's an executive at a big company.", why: '"Executive" = executivo.' },
  { type: 'listen', en: 'She is the best candidate.', options: ['Ela é a melhor candidata.', 'Ela é a chefe.', 'Ela não se candidatou.'], answer: 'Ela é a melhor candidata.', why: '"Candidate" = candidato(a).' },
]);

R(10, [['trial', 'julgamento, teste'], ['minister', 'ministro(a)'], ['parliament', 'parlamento'], ['reform', 'reforma (de leis)']], [
  { type: 'match', pairs: [['trial', 'julgamento'], ['minister', 'ministro'], ['parliament', 'parlamento'], ['reform', 'reforma']], why: '"Free trial" = teste grátis. Num tribunal, "trial" = julgamento.' },
  { type: 'choice', prompt: 'Complete:', en: 'The service has a free ___ for seven days.', pt: 'O serviço tem um teste grátis de sete dias.', options: ['trial', 'reform', 'test drive'], answer: 'trial', why: '"Free trial" = período de teste grátis.', wrong: { reform: '"Reform" = reforma de leis ou sistemas.', 'test drive': 'É para carro.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ of health spoke on TV.', pt: 'O ministro da saúde falou na TV.', options: ['minister', 'parliament', 'trial'], answer: 'minister', why: '"Minister of health" = ministro da saúde.', wrong: { parliament: '"Parliament" é a instituição.', trial: '"Trial" = julgamento.' } },
  { type: 'meaning', en: 'The trial will start next month.', options: ['O julgamento vai começar mês que vem.', 'O teste acabou.', 'Ele foi preso mês passado.'], answer: 'O julgamento vai começar mês que vem.', why: 'Num tribunal, "trial" = julgamento.' },
  { type: 'build', pt: 'O governo quer fazer uma reforma na educação.', answer: 'The government wants to reform education', extra: ['want', 'reforms'], display: 'The government wants to reform education.', why: '"Reform" = reformar (leis, sistemas). Casa se "renova": renovate.' },
  { type: 'listen', en: 'Parliament voted against the plan.', options: ['O parlamento votou contra o plano.', 'O parlamento aprovou o plano.', 'Ninguém votou.'], answer: 'O parlamento votou contra o plano.', why: '"Vote against" = votar contra.' },
]);

R(11, [['factor', 'fator'], ['phase', 'fase'], ['core', 'central, essencial'], ['perspective', 'perspectiva, ponto de vista']], [
  { type: 'match', pairs: [['factor', 'fator'], ['phase', 'fase'], ['core', 'central'], ['perspective', 'perspectiva']], why: '"From my perspective" = do meu ponto de vista.' },
  { type: 'choice', prompt: 'Complete:', en: "Don't worry, it's just a ___.", pt: 'Não se preocupe, é só uma fase.', options: ['phase', 'factor', 'core'], answer: 'phase', why: '"Just a phase" = só uma fase.', wrong: { factor: '"Factor" = fator.', core: '"Core" = centro, essencial.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Price is an important ___ for most people.', pt: 'O preço é um fator importante para a maioria das pessoas.', options: ['factor', 'phase', 'perspective'], answer: 'factor', why: '"Factor" = fator.', wrong: { phase: '"Phase" = fase.', perspective: '"Perspective" = ponto de vista.' } },
  { type: 'meaning', en: 'From my perspective, it was a good decision.', options: ['Do meu ponto de vista, foi uma boa decisão.', 'Eu não concordo com a decisão.', 'Ainda não decidimos.'], answer: 'Do meu ponto de vista, foi uma boa decisão.', why: '"From my perspective" = do meu ponto de vista.' },
  { type: 'build', pt: 'Esse é o problema central.', answer: "That's the core problem", extra: ['center', 'factor'], display: "That's the core problem.", why: '"Core" = central, o mais importante.' },
  { type: 'listen', en: 'The project has three phases.', options: ['O projeto tem três fases.', 'O projeto vai levar três anos.', 'O projeto tem três pessoas.'], answer: 'O projeto tem três fases.', why: '"Phase" = fase, etapa.' },
]);

R(12, [['crew', 'tripulação, equipe'], ['aircraft', 'avião, aeronave'], ['route', 'rota, caminho'], ['shipping', 'frete, envio']], [
  { type: 'match', pairs: [['crew', 'tripulação'], ['aircraft', 'aeronave'], ['route', 'rota'], ['shipping', 'frete']], why: '"Aircraft" não muda no plural: two aircraft.' },
  { type: 'choice', prompt: 'Complete:', en: 'Is ___ free if I buy two?', pt: 'O frete é grátis se eu comprar dois?', options: ['shipping', 'route', 'crew'], answer: 'shipping', why: '"Free shipping" = frete grátis.', wrong: { route: '"Route" = rota.', crew: '"Crew" = tripulação.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The ___ helped the passengers with their bags.', pt: 'A tripulação ajudou os passageiros com as malas.', options: ['crew', 'aircraft', 'shipping'], answer: 'crew', why: '"Crew" = tripulação, equipe.', wrong: { aircraft: '"Aircraft" = avião.', shipping: '"Shipping" = frete.' } },
  { type: 'meaning', en: 'This is the fastest route to the airport.', options: ['Este é o caminho mais rápido para o aeroporto.', 'O aeroporto fica muito longe.', 'O voo está atrasado.'], answer: 'Este é o caminho mais rápido para o aeroporto.', why: '"Route" = rota, caminho.' },
  { type: 'build', pt: 'A aeronave pousou em segurança.', answer: 'The aircraft landed safely', extra: ['safe', 'lands'], display: 'The aircraft landed safely.', why: '"Land" = pousar. "Safely" = em segurança.' },
  { type: 'listen', en: 'Shipping takes five days.', options: ['A entrega leva cinco dias.', 'A loja abre em cinco dias.', 'O produto chegou ontem.'], answer: 'A entrega leva cinco dias.', why: '"Shipping" = envio, frete.' },
]);

R(13, [['existing', 'existente, atual'], ['developing', 'em desenvolvimento'], ['growing', 'crescente'], ['remaining', 'restante']], [
  { type: 'match', pairs: [['existing', 'existente'], ['developing', 'em desenvolvimento'], ['growing', 'crescente'], ['remaining', 'restante']], why: 'Palavras em -ing também funcionam como adjetivo: a growing city.' },
  { type: 'choice', prompt: 'Complete:', en: 'We can use the ___ money for the party.', pt: 'Podemos usar o dinheiro restante para a festa.', options: ['remaining', 'growing', 'existing'], answer: 'remaining', why: '"Remaining" = o que sobrou, restante.', wrong: { growing: '"Growing" = crescente.', existing: '"Existing" = que já existe.' } },
  { type: 'choice', prompt: 'Complete:', en: 'There is a ___ interest in learning languages.', pt: 'Há um interesse crescente em aprender idiomas.', options: ['growing', 'remaining', 'developed'], answer: 'growing', why: '"Growing" = crescente, que está aumentando.', wrong: { remaining: '"Remaining" = restante.', developed: '"Developed" = desenvolvido, já pronto.' } },
  { type: 'meaning', en: 'Brazil is a developing country.', options: ['O Brasil é um país em desenvolvimento.', 'O Brasil é um país rico.', 'O Brasil é um país pequeno.'], answer: 'O Brasil é um país em desenvolvimento.', why: '"Developing country" = país em desenvolvimento.' },
  { type: 'build', pt: 'Vamos melhorar o sistema que já existe.', answer: "We're going to improve the existing system", extra: ['exist', 'improving'], display: "We're going to improve the existing system.", why: '"Existing" = que já existe, atual.' },
  { type: 'listen', en: 'The remaining tickets are very expensive.', options: ['Os ingressos que sobraram são muito caros.', 'Os ingressos acabaram.', 'Os ingressos são grátis.'], answer: 'Os ingressos que sobraram são muito caros.', why: '"Remaining" = restante.' },
]);

R(14, [['decade', 'década'], ['billion', 'bilhão'], ['statistics', 'estatística(s)'], ['estimated', 'estimado(a)']], [
  { type: 'match', pairs: [['decade', 'década'], ['billion', 'bilhão'], ['statistics', 'estatísticas'], ['estimated', 'estimado']], why: 'Cuidado: "billion" = bilhão (mil milhões).' },
  { type: 'choice', prompt: 'Complete:', en: 'Things have changed a lot in the last ___.', pt: 'As coisas mudaram muito na última década.', options: ['decade', 'billion', 'statistics'], answer: 'decade', why: '"Decade" = década, dez anos.', wrong: { billion: '"Billion" = bilhão.', statistics: '"Statistics" = estatísticas.' } },
  { type: 'choice', prompt: 'Complete:', en: 'There are about eight ___ people in the world.', pt: 'Há cerca de oito bilhões de pessoas no mundo.', options: ['billion', 'billions', 'millions of'], answer: 'billion', why: 'Depois de um número, "billion" não leva -s: eight billion.', wrong: { billions: 'Com número antes, fica sem -s.', 'millions of': 'Seria milhões, e a forma está errada.' } },
  { type: 'meaning', en: 'The statistics show that more people are working from home.', options: ['As estatísticas mostram que mais pessoas trabalham de casa.', 'Ninguém trabalha mais de casa.', 'As pessoas voltaram ao escritório.'], answer: 'As estatísticas mostram que mais pessoas trabalham de casa.', why: '"Statistics" = estatísticas.' },
  { type: 'build', pt: 'O custo estimado é de dois mil reais.', answer: 'The estimated cost is two thousand reais', extra: ['estimate', 'thousands'], display: 'The estimated cost is two thousand reais.', why: '"Estimated" = estimado, calculado mais ou menos.' },
  { type: 'listen', en: 'It took almost a decade.', options: ['Levou quase dez anos.', 'Levou quase um ano.', 'Foi muito rápido.'], answer: 'Levou quase dez anos.', why: '"Decade" = década.' },
]);

R(15, [['understanding', 'compreensão, compreensivo(a)'], ['reference', 'referência'], ['theme', 'tema'], ['plot', 'enredo, trama']], [
  { type: 'match', pairs: [['understanding', 'compreensão'], ['reference', 'referência'], ['theme', 'tema'], ['plot', 'enredo']], why: '"Plot" é o enredo de um filme ou livro.' },
  { type: 'choice', prompt: 'Complete:', en: 'The film has a great ___, but the ending is weak.', pt: 'O filme tem um ótimo enredo, mas o final é fraco.', options: ['plot', 'theme', 'reference'], answer: 'plot', why: '"Plot" = enredo, a história em si.', wrong: { theme: '"Theme" é o tema, a ideia geral.', reference: '"Reference" = referência.' } },
  { type: 'choice', prompt: 'Complete:', en: 'The main ___ of the book is family.', pt: 'O tema principal do livro é a família.', options: ['theme', 'plot', 'understanding'], answer: 'theme', why: '"Theme" = tema.', wrong: { plot: '"Plot" é o que acontece, não o tema.', understanding: '"Understanding" = compreensão.' } },
  { type: 'meaning', en: 'My boss is very understanding.', options: ['Minha chefe é muito compreensiva.', 'Minha chefe entende tudo de tecnologia.', 'Minha chefe é muito rígida.'], answer: 'Minha chefe é muito compreensiva.', why: '"Understanding" como adjetivo = compreensivo.' },
  { type: 'build', pt: 'O filme tem muitas referências aos anos oitenta.', answer: 'The film has a lot of references to the eighties', extra: ['of the', 'have'], display: "The film has a lot of references to the '80s.", why: '"Reference to" = referência a.' },
  { type: 'listen', en: 'Can you give me a reference?', options: ['Você pode me dar uma referência?', 'Você pode me dar um conselho?', 'Você pode me emprestar dinheiro?'], answer: 'Você pode me dar uma referência?', why: '"Reference" = referência.' },
]);

R(16, [['injured', 'ferido(a), machucado(a)'], ['therapy', 'terapia'], ['suffering', 'sofrimento'], ['relief', 'alívio']], [
  { type: 'match', pairs: [['injured', 'ferido'], ['therapy', 'terapia'], ['suffering', 'sofrimento'], ['relief', 'alívio']], why: '"What a relief!" = que alívio!' },
  { type: 'choice', prompt: 'Complete:', en: 'You passed the test? What a ___!', pt: 'Você passou na prova? Que alívio!', options: ['relief', 'therapy', 'suffering'], answer: 'relief', why: '"What a relief!" = que alívio!', wrong: { therapy: '"Therapy" = terapia.', suffering: '"Suffering" = sofrimento.' } },
  { type: 'choice', prompt: 'Complete:', en: 'Two people were ___ in the accident.', pt: 'Duas pessoas ficaram feridas no acidente.', options: ['injured', 'relief', 'hurting'], answer: 'injured', why: '"Be injured" = ficar ferido.', wrong: { relief: '"Relief" = alívio.', hurting: 'Ficaria "were hurting": estavam sentindo dor.' } },
  { type: 'meaning', en: 'She goes to therapy once a week.', options: ['Ela faz terapia uma vez por semana.', 'Ela vai ao médico todo dia.', 'Ela parou a terapia.'], answer: 'Ela faz terapia uma vez por semana.', why: '"Go to therapy" = fazer terapia.' },
  { type: 'build', pt: 'O remédio diminuiu o sofrimento dele.', answer: 'The medicine reduced his suffering', extra: ['suffer', 'reduces'], display: 'The medicine reduced his suffering.', why: '"Suffering" = sofrimento.' },
  { type: 'listen', en: "He can't play. He's injured.", options: ['Ele não pode jogar. Está machucado.', 'Ele não quer jogar.', 'Ele vai jogar amanhã.'], answer: 'Ele não pode jogar. Está machucado.', why: '"Injured" = machucado, lesionado.' },
]);
