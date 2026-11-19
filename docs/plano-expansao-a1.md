# Plano: A1 completo no Sacou English

Objetivo: quem termina o A1 no Sacou consegue de fato se comunicar no nível A1 do padrão europeu
(CEFR): se apresentar, falar da rotina, da família, da casa, fazer compras simples, pedir comida,
dizer o que está fazendo e o que fez ontem, entendendo frases lentas e claras.

## Onde estamos (medido em 19/11/2026)

| | Hoje | Meta do plano |
|---|---|---|
| Unidades | 8 | 16 |
| Lições | 56 (7 por unidade) | 160 (10 por unidade) |
| Exercícios | 331 | ~1.100 |
| Palavras da lista CEFR-J A1 usadas | 312 de 1.164 (27%) | 85% ou mais (~1.000) |
| Textos de leitura e escuta | 8 histórias + 8 escutas | 16 histórias + 16 escutas + 32 textos curtos |
| Desafios escritos | 8 | 16 |
| Tempo de estudo no app | ~5 h de lições | ~45 h somando tudo (abaixo) |

Faltam palavras básicas como always, never, often, learn, know, help, buy, the months, as estações,
os números de 40 a 90, partes do corpo, cômodos da casa, roupas, transportes, animais, sentimentos
(happy, sad, tired, afraid), e estruturas como can/can't, presente contínuo e was/were.

## Como chega a ~45 horas

| Parte | O que é | Horas |
|---|---|---|
| Lições | 160 lições de ~5 min | ~15 h |
| Revisão e treino | revisão por palavra + treino com IA (já existem, crescem com o conteúdo) | ~8 h |
| Leitura e escuta | 16 escutas + 16 histórias + 32 textos curtos com áudio | ~8 h |
| Fala | aula com o Juvenal por tema, conversas e repetição | ~10 h |
| Desafios escritos | 16 tarefas corrigidas pela IA | ~3 h |

O resto até as ~90 horas de um A1 completo vem de fora do app: o Juvenal passa a sugerir uma
"tarefa da semana" (um vídeo, uma música, uma série com legenda em inglês) ligada à unidade.

## As 16 unidades

As 8 atuais continuam (com 3 lições a mais cada) e entram 8 novas. A ordem segue a gramática do A1:
cada unidade usa o que veio antes.

| # | Unidade | Gramática | Vocabulário novo (exemplos) | Situação real |
|---|---|---|---|---|
| 1 | Primeiros contatos *(existe)* | cumprimentos, please/thank you | good morning, sorry, excuse me | conhecer alguém |
| 2 | Fale sobre você *(existe)* | to be, a/an | profissões, países | se apresentar |
| 3 | Números e idade *(existe)* | how old, números até 20 | telefone, idade | dizer telefone e idade |
| 4 | Família *(existe)* | his/her, 's, have | família | falar da família |
| 5 | Objetos e cores *(existe)* | this/that/these/those, plural | objetos, cores | achar coisas |
| 6 | Minha rotina *(existe)* | presente simples, horas | verbos do dia a dia, dias | contar o dia |
| 7 | Comida e bebida *(existe)* | like/don't like, do/does | comidas, bebidas | pedir no café |
| 8 | Lugares na cidade *(existe)* | there is/are, in/on/next to | lugares | perguntar onde fica |
| 9 | **Minha casa** | preposições de lugar (in, on, under, above, below, beside) | cômodos, móveis | descrever a casa |
| 10 | **Corpo e sentimentos** | how are you / I feel, adjetivos | corpo, happy, sad, tired, afraid, sick | dizer como está, ir ao médico |
| 11 | **Roupas e compras** | how much, números até 100, too/very | roupas, cheap/expensive, buy, pay | comprar numa loja |
| 12 | **Tempo livre** | can/can't, like + -ing, always/often/never | esportes, música, hobbies | combinar um programa |
| 13 | **Datas e clima** | meses, datas (on 5th May), it's sunny | meses, estações, clima | marcar aniversário, falar do tempo |
| 14 | **O que você está fazendo?** | presente contínuo | verbos de ação, now, today | mensagem/ligação rápida |
| 15 | **Pessoas** | have got, adjetivos de aparência e personalidade | tall, short, funny, clever, hair, eyes | descrever alguém |
| 16 | **Ontem e viagens** | was/were, yesterday, ago, by bus/plane | transportes, airport, hotel, ticket | contar como foi a viagem |

## As 10 lições de cada unidade

| Lição | Tipo | Novo? |
|---|---|---|
| 1 a 3 | Vocabulário + gramática da unidade | já existem nas unidades 1 a 8 |
| 4 | **Prática extra**: a gramática da unidade em mais frases | nova |
| 5 | Escrevendo | já existe |
| 6 | **Ouvindo**: ditado e escuta com vozes naturais | nova |
| 7 | Conversa de verdade | já existe |
| 8 | **Lendo**: um texto curto do nível com perguntas | nova |
| 9 | Desafio da unidade (lição com tudo) | já existe |
| 10 | História | já existe |

No fechamento da unidade continuam a **Escuta da unidade** (podcast) e o **Desafio escrito**,
e entra a **Aula com o Juvenal sobre o tema da unidade**.

## Cuidados com quem já estuda

1. **Ninguém fica bloqueado.** Hoje cada lição só libera depois da anterior. As lições novas
   das unidades 1 a 8 e as unidades 9 a 16 entram como **"Novas no A1"** para quem já passou
   desse ponto: aparecem marcadas na trilha, dão XP, mas não travam o A2.
2. **Quem fez o teste de nível** e pulou o A1 também não volta para trás.
3. **Ids das lições**: as lições novas seguem o padrão `a1-u9-l1`. O bônus de 10 minutos do
   servidor só reconhece até `u8-l7`; um SQL pequeno (016) amplia isso.
4. **Ranking, missões e conquistas** continuam valendo igual.

## Como o conteúdo é feito e conferido

- Cada unidade é escrita no formato atual (src/content/a1/unit-XX.json), com guia, palavras,
  objetivo do CEFR, lições, história, escuta (podcast) e textos de leitura.
- O build já confere se as palavras são do nível (lista CEFR-J). Entra um relatório novo de
  **cobertura do A1**: quantas palavras da lista oficial o curso já ensina e quais faltam.
- Áudio: escutas e textos gravados com a ElevenLabs pelo script que já existe.
- **Você revisa cada unidade antes de publicar** (uma prévia por unidade, no site de teste).

## Etapas

| Etapa | O que entra | Revisão sua | Créditos ElevenLabs (estimativa) |
|---|---|---|---|
| 0 | Regra "Novas no A1" na trilha, SQL 016, relatório de cobertura | — | — |
| 1 | 3 lições novas em cada unidade de 1 a 8 (24 lições) | unidades 1–8 | ~6 mil |
| 2 | Unidades 9 a 12 completas | 4 unidades | ~6 mil |
| 3 | Unidades 13 a 16 completas | 4 unidades | ~6 mil |
| 4 | Aula do Juvenal por tema + tarefa da semana | — | — |
| 5 | Teste com alunos do Instagram + painel de métricas | resultados | — |

Cada etapa sai testada e publicada separadamente. Ao fim, o A1 passa a cobrir ~85% do vocabulário
oficial do nível, e o mesmo modelo é repetido no A2.

## Como saber se funcionou

- Cobertura do vocabulário A1 (relatório do build): de 27% para 85%+.
- Nota média do desafio escrito por unidade (meta: 70+).
- Quantos alunos voltam no dia seguinte e depois de 7 dias.
- Quantos terminam o A1 e o retrato por habilidade de quem termina.
