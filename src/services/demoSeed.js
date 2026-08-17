// =====================================================================
// demoSeed.js — Dataset fictício do MODO DEMO
// -----------------------------------------------------------------
// Popula automaticamente o store local (localStorage `ft.demoDb`) quando
// o app roda SEM Firebase configurado e o banco ainda está vazio. Serve
// para a equipe abrir o site e já ver tudo funcionando (Minha Trilha,
// Equipe, Admin e Nivelamento) com dados de exemplo — sem tocar na
// produção. Em modo Firebase real este arquivo é ignorado.
//
// 19 colaboradores (N0→N3), 11 trilhas, 65 registros de progresso,
// 3 mentorias ativas e 12 candidatos no funil de recrutamento.
// =====================================================================

// Conteúdo real (Markdown + quiz) da Trilha N0 — exemplo de como o
// conteúdo enviado em .md aparece dentro dos módulos.
const MODULOS_N0 = [
  {
    ordem: 1,
    titulo: 'História e Evolução da TI',
    descricao: 'De onde veio a tecnologia que usamos hoje.',
    conteudos: [
      { tipo: 'video', titulo: 'Vídeo de introdução (exemplo)', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', duracao: '3min' },
      { tipo: 'link', titulo: 'Artigo: História da informática', url: 'https://pt.wikipedia.org/wiki/Hist%C3%B3ria_da_inform%C3%A1tica', duracao: '' },
    ],
    conteudoMd: `## História e Evolução da TI

A **Tecnologia da Informação (TI)** é a área que cuida de **guardar, processar e transmitir informação** usando computadores.

### Uma linha do tempo rápida
- **Anos 1940** — surgem os primeiros computadores, do tamanho de uma sala.
- **Anos 1970** — o *microprocessador* deixa os computadores menores e mais baratos.
- **Anos 1990** — a **internet** conecta o mundo.
- **Hoje** — nuvem, celulares e **inteligência artificial** no dia a dia.

> Cada avanço resolveu um problema e criou novas possibilidades. Entender essa evolução ajuda a enxergar para onde a área caminha.

### Por que isso importa para você
Você está entrando numa área que **muda o tempo todo**. A base é sempre a mesma: resolver problemas com organização e lógica.`,
    quiz: [
      {
        pergunta: 'O que a área de TI basicamente faz?',
        opcoes: ['Guardar, processar e transmitir informação', 'Apenas consertar impressoras', 'Somente criar jogos'],
        correta: 0,
      },
      {
        pergunta: 'O que popularizou a internet no mundo?',
        opcoes: ['Os anos 1990', 'Os anos 1940', 'A máquina a vapor'],
        correta: 0,
      },
    ],
  },
  {
    ordem: 2,
    titulo: 'O que é um Computador (Hardware vs. Software)',
    descricao: 'As duas metades de qualquer sistema.',
    conteudos: [],
    conteudoMd: `## Hardware vs. Software

Todo computador tem **duas partes** que trabalham juntas:

| Parte | O que é | Exemplos |
|-------|---------|----------|
| **Hardware** | A parte física, que você toca | Teclado, tela, memória, HD |
| **Software** | Os programas, que você não toca | Windows, navegador, WhatsApp |

Pense numa analogia: o **hardware é o corpo**, o **software é a mente** que diz ao corpo o que fazer.

### Como conversam
O software envia **instruções** e o hardware **executa**. Sem software, o hardware é só um monte de peças; sem hardware, o software não tem onde rodar.`,
    quiz: [
      {
        pergunta: 'Qual destes é um exemplo de HARDWARE?',
        opcoes: ['Teclado', 'Navegador', 'Sistema operacional'],
        correta: 0,
      },
      {
        pergunta: 'Na analogia da aula, o software é...',
        opcoes: ['A mente que comanda', 'O corpo físico', 'A tomada de energia'],
        correta: 0,
      },
    ],
  },
  {
    ordem: 3,
    titulo: 'Como o Computador Pensa (Binário e Algoritmos)',
    descricao: 'Zeros, uns e passo a passo.',
    conteudos: [],
    conteudoMd: `## Binário e Algoritmos

### Binário: a língua da máquina
O computador só entende **dois estados**: ligado (**1**) e desligado (**0**). Tudo — textos, fotos, vídeos — é traduzido para sequências de **0 e 1**.

### Algoritmo: uma receita
Um **algoritmo** é um **passo a passo** para resolver um problema. Igual a uma receita de bolo:

1. Junte os ingredientes
2. Misture
3. Asse por 40 minutos

Programar é escrever algoritmos que o computador consegue seguir.`,
    quiz: [
      {
        pergunta: 'Quais dígitos o sistema binário usa?',
        opcoes: ['0 e 1', '1 a 9', 'A e B'],
        correta: 0,
      },
      {
        pergunta: 'Um algoritmo é...',
        opcoes: ['Um passo a passo para resolver um problema', 'Um tipo de vírus', 'Uma peça do computador'],
        correta: 0,
      },
    ],
  },
  {
    ordem: 4,
    titulo: 'Fundamentos de Lógica de Programação',
    descricao: 'Sequência, decisão e repetição.',
    conteudos: [],
    conteudoMd: `## Lógica de Programação

Três ideias sustentam **quase todo programa**:

- **Sequência** — um passo depois do outro.
- **Decisão** — *se* algo for verdade, faça X; *senão*, faça Y.
- **Repetição** — repita enquanto precisar.

\`\`\`
SE saldo >= preco ENTÃO
  liberar compra
SENÃO
  avisar "saldo insuficiente"
\`\`\`

Dominar esses três conceitos é a base para **qualquer** linguagem de programação.`,
    quiz: [
      {
        pergunta: 'Qual estrutura escolhe entre dois caminhos?',
        opcoes: ['Decisão (se/senão)', 'Sequência', 'Comentário'],
        correta: 0,
      },
      {
        pergunta: 'Para executar algo várias vezes usamos...',
        opcoes: ['Repetição', 'Decisão', 'Nada, é impossível'],
        correta: 0,
      },
    ],
  },
  {
    ordem: 5,
    titulo: 'Dados, Informações e Bancos de Dados',
    descricao: 'Do dado bruto à decisão.',
    conteudos: [],
    conteudoMd: `## Dados, Informações e Bancos de Dados

- **Dado** é o valor bruto: \`37\`.
- **Informação** é o dado com **contexto**: "a temperatura é 37 °C".
- **Banco de dados** é onde guardamos tudo isso de forma **organizada** para consultar depois.

### Por que organizar importa
Imagine uma agenda de contatos toda embaralhada. Um **banco de dados** mantém a ordem para que o sistema **encontre rápido** o que precisa.

Parabéns — você chegou ao fim do Nível 0! 🎉`,
    quiz: [
      {
        pergunta: 'Qual a diferença entre dado e informação?',
        opcoes: ['Informação é o dado com contexto', 'São exatamente a mesma coisa', 'Dado é sempre um texto'],
        correta: 0,
      },
      {
        pergunta: 'Para que serve um banco de dados?',
        opcoes: ['Guardar dados de forma organizada para consultar', 'Deixar o computador mais bonito', 'Trocar a bateria'],
        correta: 0,
      },
    ],
  },
];

export const DEMO_SEED = {
  users: {
    u_lucas: { uid: 'u_lucas', nome: 'Lucas Silva', email: 'lucas.silva@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_bruno: { uid: 'u_bruno', nome: 'Bruno Lima', email: 'bruno.lima@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_fer: { uid: 'u_fer', nome: 'Fernanda Rocha', email: 'fernanda.rocha@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_pedro: { uid: 'u_pedro', nome: 'Pedro Alves', email: 'pedro.alves@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_camila: { uid: 'u_camila', nome: 'Camila Souza', email: 'camila.souza@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_rafa: { uid: 'u_rafa', nome: 'Rafael Mendes', email: 'rafael.mendes@zello.tec.br', nivelAtual: 0, trilhaAtivaId: 'iniciante_n0', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_ana: { uid: 'u_ana', nome: 'Ana Souza', email: 'ana.souza@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'flutterflow', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_diego: { uid: 'u_diego', nome: 'Diego Ramos', email: 'diego.ramos@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'kubernetes', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_lari: { uid: 'u_lari', nome: 'Larissa Pinto', email: 'larissa.pinto@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'analista', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_julia: { uid: 'u_julia', nome: 'Julia Nunes', email: 'julia.nunes@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'ia-agentica', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_thiago: { uid: 'u_thiago', nome: 'Thiago Costa', email: 'thiago.costa@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'automacao', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_bia: { uid: 'u_bia', nome: 'Beatriz Dias', email: 'beatriz.dias@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'salesforce-associate', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_igor: { uid: 'u_igor', nome: 'Igor Barbosa', email: 'igor.barbosa@zello.tec.br', nivelAtual: 1, trilhaAtivaId: 'qlik-sense-ba', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_carlos: { uid: 'u_carlos', nome: 'Carlos Dias', email: 'carlos.dias@zello.tec.br', nivelAtual: 2, trilhaAtivaId: 'kubernetes', admin: true, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_helena: { uid: 'u_helena', nome: 'Helena Martins', email: 'helena.martins@zello.tec.br', nivelAtual: 2, trilhaAtivaId: 'flutterflow', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_gustavo: { uid: 'u_gustavo', nome: 'Gustavo Reis', email: 'gustavo.reis@zello.tec.br', nivelAtual: 2, trilhaAtivaId: 'analista', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_mari: { uid: 'u_mari', nome: 'Mariana Reis', email: 'mariana.reis@zello.tec.br', nivelAtual: 3, trilhaAtivaId: 'analista', admin: true, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_roberto: { uid: 'u_roberto', nome: 'Roberto Nunes', email: 'roberto.nunes@zello.tec.br', nivelAtual: 3, trilhaAtivaId: 'mulesoft-dev1', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
    u_patricia: { uid: 'u_patricia', nome: 'Patrícia Gomes', email: 'patricia.gomes@zello.tec.br', nivelAtual: 3, trilhaAtivaId: 'flutterflow', admin: false, criadoEm: '2026-08-14T00:00:00.000Z' },
  },

  candidatos: {
    cand_1: { id: 'cand_1', nome: 'Marina Alves', email: 'marina.alves@gmail.com', areaInteresse: 'FlutterFlow', linkedin: 'https://linkedin.com/in/marina', curriculoUrl: 'https://drive.google.com/curriculo-1', status: 'VOTACAO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'talvez', avaliador: 'Iarla' } }, criadoEm: '2026-08-14T18:12:36.977Z' },
    cand_2: { id: 'cand_2', nome: 'Rafael Gomes', email: 'rafael.gomes@gmail.com', areaInteresse: 'Kubernetes', linkedin: 'https://linkedin.com/in/rafael', curriculoUrl: 'https://drive.google.com/curriculo-2', status: 'VOTACAO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' } }, criadoEm: '2026-08-13T18:12:36.977Z' },
    cand_3: { id: 'cand_3', nome: 'Sofia Carvalho', email: 'sofia.carvalho@gmail.com', areaInteresse: 'IA Agêntica', linkedin: 'https://linkedin.com/in/sofia', curriculoUrl: 'https://drive.google.com/curriculo-3', status: 'INTERESSADO', votos: { u1: { valor: 'talvez', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' }, u3: { valor: 'sim', avaliador: 'Eduardo' } }, criadoEm: '2026-08-12T18:12:36.977Z' },
    cand_4: { id: 'cand_4', nome: 'Lucas Ferreira', email: 'lucas.ferreira@gmail.com', areaInteresse: 'Analista', linkedin: 'https://linkedin.com/in/lucas', curriculoUrl: 'https://drive.google.com/curriculo-4', status: 'INTERESSADO', votos: {}, criadoEm: '2026-08-11T18:12:36.977Z' },
    cand_5: { id: 'cand_5', nome: 'Beatriz Costa', email: 'beatriz.costa@gmail.com', areaInteresse: 'Analista de Dados', linkedin: 'https://linkedin.com/in/beatriz', curriculoUrl: 'https://drive.google.com/curriculo-5', status: 'APROVADO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' }, u3: { valor: 'sim', avaliador: 'Eduardo' } }, criadoEm: '2026-08-10T18:12:36.977Z' },
    cand_6: { id: 'cand_6', nome: 'André Lima', email: 'andre.lima@gmail.com', areaInteresse: 'Salesforce', linkedin: 'https://linkedin.com/in/andré', curriculoUrl: 'https://drive.google.com/curriculo-6', status: 'APROVADO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' } }, criadoEm: '2026-08-09T18:12:36.977Z' },
    cand_7: { id: 'cand_7', nome: 'Juliana Rocha', email: 'juliana.rocha@gmail.com', areaInteresse: 'Mulesoft', linkedin: 'https://linkedin.com/in/juliana', curriculoUrl: 'https://drive.google.com/curriculo-7', status: 'APROVADO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'talvez', avaliador: 'Iarla' }, u3: { valor: 'sim', avaliador: 'Eduardo' }, u4: { valor: 'sim', avaliador: 'Ana' } }, criadoEm: '2026-08-08T18:12:36.977Z' },
    cand_8: { id: 'cand_8', nome: 'Felipe Santos', email: 'felipe.santos@gmail.com', areaInteresse: 'Automação', linkedin: 'https://linkedin.com/in/felipe', curriculoUrl: 'https://drive.google.com/curriculo-8', status: 'REUNIAO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' }, u3: { valor: 'talvez', avaliador: 'Eduardo' } }, criadoEm: '2026-08-07T18:12:36.977Z' },
    cand_9: { id: 'cand_9', nome: 'Camila Nunes', email: 'camila.nunes@gmail.com', areaInteresse: 'FlutterFlow', linkedin: 'https://linkedin.com/in/camila', curriculoUrl: 'https://drive.google.com/curriculo-9', status: 'REUNIAO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' } }, criadoEm: '2026-08-06T18:12:36.977Z' },
    cand_10: { id: 'cand_10', nome: 'Bruno Teixeira', email: 'bruno.teixeira@gmail.com', areaInteresse: 'Qlik Sense', linkedin: 'https://linkedin.com/in/bruno', curriculoUrl: 'https://drive.google.com/curriculo-10', status: 'CONTRATADO', votos: { u1: { valor: 'sim', avaliador: 'Ytalo' }, u2: { valor: 'sim', avaliador: 'Iarla' }, u3: { valor: 'sim', avaliador: 'Eduardo' }, u4: { valor: 'sim', avaliador: 'Ana' } }, criadoEm: '2026-08-05T18:12:36.977Z' },
    cand_11: { id: 'cand_11', nome: 'Larissa Melo', email: 'larissa.melo@gmail.com', areaInteresse: 'Kubernetes', linkedin: 'https://linkedin.com/in/larissa', curriculoUrl: 'https://drive.google.com/curriculo-11', status: 'REPROVADO', votos: { u1: { valor: 'nao', avaliador: 'Ytalo' }, u2: { valor: 'talvez', avaliador: 'Iarla' }, u3: { valor: 'nao', avaliador: 'Eduardo' } }, criadoEm: '2026-08-04T18:12:36.977Z' },
    cand_12: { id: 'cand_12', nome: 'Vinícius Araújo', email: 'vinicius.araujo@gmail.com', areaInteresse: 'IA Agêntica', linkedin: 'https://linkedin.com/in/vinícius', curriculoUrl: 'https://drive.google.com/curriculo-12', status: 'REPROVADO', votos: { u1: { valor: 'nao', avaliador: 'Ytalo' }, u2: { valor: 'nao', avaliador: 'Iarla' } }, criadoEm: '2026-08-03T18:12:36.977Z' },
  },

  mentorships: {
    u_helena__u_ana: { id: 'u_helena__u_ana', mentorId: 'u_helena', menteeId: 'u_ana', trackId: 'flutterflow', status: 'ACTIVE' },
    u_carlos__u_diego: { id: 'u_carlos__u_diego', mentorId: 'u_carlos', menteeId: 'u_diego', trackId: 'kubernetes', status: 'ACTIVE' },
    u_gustavo__u_lari: { id: 'u_gustavo__u_lari', mentorId: 'u_gustavo', menteeId: 'u_lari', trackId: 'analista', status: 'ACTIVE' },
  },

  // Trilhas com 5 módulos cada (necessário para o % de progresso e a
  // "Minha Trilha" dos colaboradores N1+ funcionarem no demo).
  tracks: buildTracks([
    ['iniciante_n0', 'Trilha Tech 360 · TI do Zero', 0],
    ['analista', 'Analista', 1],
    ['automacao', 'Automação', 1],
    ['flutterflow', 'FlutterFlow', 1],
    ['ia-agentica', 'IA Agêntica', 1],
    ['kubernetes', 'Kubernetes', 1],
    ['mulesoft-associate', 'Mulesoft Associate', 1],
    ['mulesoft-dev1', 'Mulesoft Dev 1', 1],
    ['qlik-replicate', 'Qlik Replicate', 1],
    ['qlik-sense-ba', 'Qlik Sense: Business Analyst', 1],
    ['salesforce-associate', 'Salesforce Associate', 1],
  ]),

  // Progresso por colaborador (userId_trackId_moduleId -> completed).
  user_progress: buildProgress({
    u_lucas: { iniciante_n0: 2 },
    u_bruno: { iniciante_n0: 4 },
    u_fer: { iniciante_n0: 1 },
    u_pedro: { iniciante_n0: 5 },
    u_camila: { iniciante_n0: 3 },
    u_ana: { flutterflow: 3 },
    u_diego: { kubernetes: 2 },
    u_lari: { analista: 4 },
    u_julia: { 'ia-agentica': 1 },
    u_thiago: { automacao: 5 },
    u_bia: { 'salesforce-associate': 2 },
    u_igor: { 'qlik-sense-ba': 3 },
    u_carlos: { kubernetes: 5 },
    u_helena: { flutterflow: 5 },
    u_gustavo: { analista: 5 },
    u_mari: { analista: 5 },
    u_roberto: { 'mulesoft-dev1': 5 },
    u_patricia: { flutterflow: 5 },
  }),
};

// Monta as trilhas. A trilha N0 usa o conteúdo autoral (Markdown + quiz);
// as técnicas recebem 5 módulos com um texto de exemplo (sem quiz).
function buildTracks(defs) {
  const out = {};
  defs.forEach(([id, nome, nivel], i) => {
    out[id] = {
      id,
      nome,
      nivel,
      ordem: i,
      modulos: id === 'iniciante_n0' ? MODULOS_N0 : modulosGenericos(nome),
    };
  });
  return out;
}

// Módulos de exemplo para as trilhas técnicas (conteúdo em Markdown, sem quiz).
function modulosGenericos(nomeTrilha) {
  return [1, 2, 3, 4, 5].map((ordem) => ({
    ordem,
    titulo: `Módulo ${ordem}`,
    descricao: `Etapa ${ordem} da trilha ${nomeTrilha}.`,
    conteudos: [],
    conteudoMd: `## Módulo ${ordem} — ${nomeTrilha}\n\nConteúdo do módulo ${ordem} da trilha **${nomeTrilha}**.\n\nSubstitua este texto pelo material real enviando um arquivo **.md** no painel Admin.`,
    quiz: [],
  }));
}

// Gera os documentos de progresso: para cada usuário/trilha, marca os
// primeiros N módulos como concluídos (chave `userId_trackId_moduleId`).
function buildProgress(mapa) {
  const out = {};
  for (const [userId, trilhas] of Object.entries(mapa)) {
    for (const [trackId, feitos] of Object.entries(trilhas)) {
      for (let m = 1; m <= feitos; m++) {
        out[`${userId}_${trackId}_${m}`] = { userId, trackId, moduleId: m, completed: true };
      }
    }
  }
  return out;
}
