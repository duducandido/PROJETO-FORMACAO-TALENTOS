// =====================================================================
// trilhaContent.js — Utilidades de conteúdo em Markdown das trilhas
// -----------------------------------------------------------------
// - splitMarkdownIntoModules: divide 1 arquivo .md grande em módulos,
//   quebrando a cada título (o nível de título usado nos módulos é
//   detectado automaticamente).
// - Cada módulo pode carregar um QUIZ, escrito no próprio .md por uma
//   convenção simples (ver abaixo). O quiz é separado do conteúdo e vira
//   uma avaliação interativa no site.
// - estimarTempoLeitura: minutos de leitura a partir do texto.
//
// CONVENÇÃO DO QUIZ (dentro do módulo, depois do conteúdo):
//
//   ## Quiz
//   P: Qual é a base de toda programação?
//   - [x] Lógica de programação
//   - [ ] Editar fotos
//   - [ ] Planilhas
//
//   P: O sistema binário usa quais dígitos?
//   - [x] 0 e 1
//   - [ ] 1 a 9
//
// `- [x]` marca a alternativa CORRETA. Cada `P:` inicia uma pergunta.
// =====================================================================

const HEADING_RE = /^(#{1,6})\s+(.*\S)\s*$/;

/** Detecta o nível de título (1..6) que separa os módulos. */
function detectarNivel(linhas) {
  const contagem = {};
  for (const l of linhas) {
    const m = l.match(HEADING_RE);
    if (m) {
      const nivel = m[1].length;
      contagem[nivel] = (contagem[nivel] || 0) + 1;
    }
  }
  const niveis = Object.keys(contagem).map(Number).sort((a, b) => a - b);
  if (!niveis.length) return null;
  // menor nível que se repete (≥2); senão, o menor nível presente.
  const repetido = niveis.find((n) => contagem[n] >= 2);
  return repetido ?? niveis[0];
}

/**
 * Divide um Markdown grande em módulos.
 * @returns {Array<{ordem:number, titulo:string, descricao:string, conteudoMd:string, quiz:Array, conteudos:Array}>}
 */
export function splitMarkdownIntoModules(mdBruto) {
  const md = String(mdBruto || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const linhas = md.split('\n');
  const nivel = detectarNivel(linhas);

  // Sem títulos: um módulo único com todo o conteúdo.
  if (nivel == null) {
    const corpo = md.trim();
    if (!corpo) return [];
    const { conteudoMd, quiz } = separarQuiz(corpo);
    return [{ ordem: 1, titulo: 'Módulo 1', descricao: '', conteudoMd, quiz, conteudos: [] }];
  }

  const secoes = [];
  let atual = null;
  let preambulo = [];
  for (const l of linhas) {
    const m = l.match(HEADING_RE);
    if (m && m[1].length === nivel) {
      if (atual) secoes.push(atual);
      atual = { titulo: m[2].trim(), linhas: [] };
    } else if (atual) {
      atual.linhas.push(l);
    } else {
      preambulo.push(l);
    }
  }
  if (atual) secoes.push(atual);

  // Seções cujo título é "Quiz" (mesmo nível dos módulos) pertencem ao
  // módulo anterior — mescla como quiz dele, não como um módulo novo.
  const QUIZ_TITULO = /^(quiz|quizz|avalia[cç][aã]o|pergunt)/i;
  const secoesMescladas = [];
  for (const s of secoes) {
    if (QUIZ_TITULO.test(s.titulo) && secoesMescladas.length) {
      secoesMescladas[secoesMescladas.length - 1].quizLinhas = s.linhas;
    } else {
      secoesMescladas.push(s);
    }
  }

  // Preâmbulo com texto real (não só título/linha vazia) vira "Introdução".
  const preTexto = preambulo.filter((l) => l.trim() && !HEADING_RE.test(l)).join('').trim();
  const modulos = [];
  if (preTexto) {
    const { conteudoMd, quiz } = separarQuiz(preambulo.join('\n').trim());
    modulos.push({ titulo: 'Introdução', linhasBody: conteudoMd, quiz });
  }
  for (const s of secoesMescladas) {
    const { conteudoMd, quiz } = separarQuiz(s.linhas.join('\n').trim());
    const quizExtra = s.quizLinhas ? parseQuiz(s.quizLinhas.join('\n')) : [];
    modulos.push({ titulo: s.titulo, linhasBody: conteudoMd, quiz: [...quiz, ...quizExtra] });
  }

  return modulos.map((mod, i) => ({
    ordem: i + 1,
    titulo: mod.titulo || `Módulo ${i + 1}`,
    descricao: '',
    conteudoMd: mod.linhasBody || '',
    quiz: mod.quiz || [],
    conteudos: [],
  }));
}

/**
 * Separa o bloco de quiz do conteúdo de um módulo.
 * @returns {{conteudoMd:string, quiz:Array}}
 */
export function separarQuiz(corpo) {
  const linhas = String(corpo || '').split('\n');
  // Um título cujo texto seja "Quiz" (ou "Avaliação"/"Quizz") inicia o quiz.
  let idxQuiz = -1;
  for (let i = 0; i < linhas.length; i++) {
    const m = linhas[i].match(HEADING_RE);
    if (m && /^(quiz|quizz|avalia[cç][aã]o|pergunt)/i.test(m[2].trim())) {
      idxQuiz = i;
      break;
    }
  }
  if (idxQuiz === -1) {
    // Sem título "Quiz" explícito, o conteúdo fica intacto (sem quiz).
    return { conteudoMd: corpo.trim(), quiz: [] };
  }
  const conteudoMd = linhas.slice(0, idxQuiz).join('\n').trim();
  const quizRaw = linhas.slice(idxQuiz + 1).join('\n');
  return { conteudoMd, quiz: parseQuiz(quizRaw) };
}

/**
 * Faz o parse das perguntas no formato:
 *   P: pergunta
 *   - [x] correta
 *   - [ ] errada
 * @returns {Array<{pergunta:string, opcoes:string[], correta:number}>}
 */
export function parseQuiz(raw) {
  const linhas = String(raw || '').split('\n');
  const perguntas = [];
  let atual = null;
  const push = () => {
    if (atual && atual.pergunta && atual.opcoes.length >= 2) {
      if (atual.correta < 0) atual.correta = 0;
      perguntas.push(atual);
    }
  };
  for (const l of linhas) {
    const mp = l.match(/^\s*(?:P:|Pergunta:)\s*(.+)$/i);
    const mo = l.match(/^\s*[-*]\s*\[( |x|X)\]\s*(.+)$/);
    if (mp) {
      push();
      atual = { pergunta: mp[1].trim(), opcoes: [], correta: -1 };
    } else if (mo && atual) {
      const correta = mo[1].toLowerCase() === 'x';
      if (correta) atual.correta = atual.opcoes.length;
      atual.opcoes.push(mo[2].trim());
    }
  }
  push();
  return perguntas;
}

/**
 * Extrai o ID de um vídeo do YouTube a partir de vários formatos de link
 * (youtube.com/watch?v=, youtu.be/, /embed/, /shorts/). Retorna null se não for.
 */
export function youtubeId(url) {
  if (!url) return null;
  const s = String(url);
  const re = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const m = s.match(re);
  return m ? m[1] : null;
}

/** Estima o tempo de leitura (em minutos, mínimo 1) a ~200 palavras/min. */
export function estimarTempoLeitura(md) {
  const palavras = String(md || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

/** Converte os módulos parseados em texto de resumo para preview. */
export function resumoModulos(modulos) {
  return (modulos || []).map((m) => ({
    titulo: m.titulo,
    palavras: String(m.conteudoMd || '').trim().split(/\s+/).filter(Boolean).length,
    perguntas: (m.quiz || []).length,
  }));
}
