# HANDOFF — Estado atual do projeto "Formação de Talentos"

> Documento para continuar o trabalho em uma nova conversa sem perder o contexto.
> Na nova conversa, diga: **"leia o HANDOFF.md"**.

## O que é o projeto
Plataforma web (React + Vite + Tailwind + Firebase) de formação/nivelamento/mentoria
dos colaboradores da Zello. Jornada N0 → N1 → N2 → N3.

## 🌐 No ar (produção)
- **Site:** https://formacao-de-talentos.web.app (Firebase Hosting, 24/7)
- **Firebase project:** `formacao-de-talentos`
- Deploy feito via service account: `GOOGLE_APPLICATION_CREDENTIALS=serviceAccountKey.json npx firebase-tools deploy --only hosting --project formacao-de-talentos`

## 📦 Git
- Pessoal: https://github.com/duducandido/FORMA-O-DE-TALENTOS (branch main)
- Equipe: https://github.com/Ytalosrs/FORMACAO-DE-TALENTOS (branch `dudu`, pasta `3 - PROJETOS/Plataforma Formacao de Talentos`)
- **Segredos NUNCA vão pro git:** `serviceAccountKey.json` e `.env.local` (protegidos pelo .gitignore).

## ✅ O que já está pronto e no ar
- Login real só `@zello.tec.br` (Firebase Auth).
- **Minha Trilha**: cada usuário estuda sua trilha real, marca módulos (salva em `user_progress`), avança de nível. Automação de mentoria N1→N2 (vincula afilhado) e N2→N3 (promove mentor).
- **Equipe** (visível a todos): visão geral — distribuição por nível, mentorias ativas, tabela de cada colaborador com progresso %.
- **Admin** (só admin): CRUD de trilhas/conteúdos (por link), colaboradores, mentorias, e **chavinha de admin** (promove outros).
- Admin = campo `admin:true` no doc `users/{uid}` (regras do Firestore usam isso). Bootstrap via `npm run db:admin -- email`.

## 🟡 EM DEMO (ainda NÃO no ar, NÃO no git) — aguardando aprovação da equipe
- **Aba "Nivelamento"** (só admin), com 2 segmentos:
  1. **Candidatos**: funil de recrutamento (Interessado → Aprovado → Reunião → Contratado/Reprovado) com **votação da equipe**, LinkedIn + currículo PDF (por link). NÃO cria conta automática.
  2. **Na formação**: desempenho de cada colaborador (KPIs, nível, trilha, módulos X/5, % de progresso, filtros).
- Coleção nova: `candidatos` (regra já escrita em firestore.rules, ainda NÃO publicada).
- Arquivos novos: `src/components/NivelamentoView.jsx`; funções `listarCandidatos/salvarCandidato/excluirCandidato` e `listarProgresso` em `dbService.js`.
- Ajustes: etapa **"Votação"** adicionada no início do funil (candidato novo nasce em Votação, antes de Interessado).

## 🟡 EM DEMO — Conteúdo das trilhas em Markdown + bloqueio + quiz (novo)
- **Conteúdo em Markdown**: cada módulo tem um campo `conteudoMd` renderizado dentro do módulo (títulos, negrito, listas, tabelas, código, imagens). Lib: `react-markdown` + `remark-gfm`.
- **Bloqueio sequencial**: na Minha Trilha, o módulo N só abre depois que o N-1 for concluído (módulos travados mostram 🔒). Conclusão é uma via (não desmarca).
- **Mini-quiz obrigatório**: se o módulo tem quiz, pode **errar no máximo 1** pergunta para concluir (quiz de 1 pergunta = tem que acertar). Sem quiz, há um botão "Concluí este módulo".
- **Materiais e links + vídeo embutido**: cada módulo mostra uma seção "Materiais e links" com os conteúdos por link; se o link for do **YouTube**, o vídeo aparece **embutido** (iframe). Helper `youtubeId()` em `trilhaContent.js`.
- **Guia para admins**: `GUIA-CONTEUDO-TRILHAS.md` (como montar o .md com quiz, links e vídeo).
- **Editor no Admin** (`TrilhaEditor`): painel "Importar conteúdo de um .md" — cola/sobe 1 arquivo `.md` grande e o site **divide em módulos** a cada título (`#`/`##`). Um bloco `## Quiz` (formato `P:` + `- [x]`/`- [ ]`) vira a avaliação do módulo. Também dá pra editar `conteudoMd` e o quiz por módulo (com preview ao vivo).
- Arquivos novos: `src/services/trilhaContent.js` (auto-split + parser de quiz + tempo de leitura), `src/components/Markdown.jsx`, `src/components/ModuloQuiz.jsx`. Alterados: `MinhaTrilhaView.jsx`, `AdminView.jsx`, `index.css` (estilo `.md-prose`), `demoSeed.js` (trilha N0 com conteúdo + quiz reais).
- **Não precisa mudar regras do Firestore**: `conteudoMd`/`quiz` são só campos dentro do doc da trilha (`tracks`).

## ⚙️ Estado do ambiente LOCAL (importante!)
- **`.env.local` está em MODO DEMO** (as 6 chaves VITE_FIREBASE_* estão comentadas) para apresentar o Nivelamento localmente sem tocar no site no ar.
  - Para reativar o Firebase real: descomentar as 6 linhas e reiniciar `npm run dev`.
- No modo demo, os dados ficam em `localStorage` (chave `ft.demoDb`).
- **Dataset fictício agora vive no código**: `src/services/demoSeed.js` (19 colaboradores N0→N3, 11 trilhas com 5 módulos, 65 progressos, 3 mentorias, 12 candidatos). O `dbService.js` chama `ensureDemoSeed()` ao carregar: se o store local estiver vazio, injeta tudo automaticamente. Assim qualquer pessoa que abrir o site em modo demo já vê todas as abas populadas — não depende mais de injeção manual no navegador.
  - Para **resetar** o demo: no console do navegador, `localStorage.removeItem('ft.demoDb')` e recarregar (repopula do seed).
  - Se o usuário editar/apagar dados no demo, o store deixa de estar vazio e o seed não roda de novo (não sobrescreve).

## 🚀 Quando a equipe aprovar o Nivelamento
1. Reativar Firebase real no `.env.local` (descomentar as 6 linhas).
2. Publicar as regras do Firestore (incluindo a coleção `candidatos`) — conteúdo em `firestore.rules`.
3. `npm run build` + deploy (comando acima).
4. Enviar para o git (repo pessoal + repo da equipe, branch `dudu`).

## 🔐 Pendência de segurança
A `serviceAccountKey.json` apareceu no chat → **gerar uma nova chave** (Console → Configurações → Contas de serviço → Gerar nova chave) e apagar a atual.

## Scripts úteis (Admin SDK, usam serviceAccountKey.json)
- `npm run db:reset -- --confirm` — apaga tudo (cuidado).
- `npm run db:seed` — popula trilhas + colaboradores.
- `npm run db:admin -- email@zello.tec.br` — torna alguém admin.
