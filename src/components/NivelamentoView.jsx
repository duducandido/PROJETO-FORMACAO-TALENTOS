// =====================================================================
// NivelamentoView.jsx — Pipeline de recrutamento/nivelamento.
// Interessados → Votação da equipe → Aprovados → Reunião → Contratado/Não.
// Dados do candidato: LinkedIn + currículo (PDF por link). Sem criar conta.
// =====================================================================
import React, { useEffect, useMemo, useState } from 'react';
import {
  Loader2,
  Plus,
  Trash2,
  Linkedin,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Search,
  X,
  Users,
  UserPlus,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import {
  listarCandidatos,
  salvarCandidato,
  excluirCandidato,
  listarUsuarios,
  listarProgresso,
  listarTrilhas,
} from '../services/dbService.js';

// Etapas do funil.
const STATUS = [
  { id: 'VOTACAO', label: 'Votação', cls: 'border-sky-400/40 bg-sky-500/10 text-sky-300' },
  { id: 'INTERESSADO', label: 'Interessado', cls: 'border-primary/40 bg-primary/10 text-primary' },
  { id: 'APROVADO', label: 'Aprovado', cls: 'border-accent/40 bg-accent/10 text-accent' },
  { id: 'REUNIAO', label: 'Reunião', cls: 'border-violet-400/40 bg-violet-500/10 text-violet-300' },
  { id: 'CONTRATADO', label: 'Contratado', cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300' },
  { id: 'REPROVADO', label: 'Reprovado', cls: 'border-red-500/40 bg-red-500/10 text-red-300' },
];
const statusInfo = (id) => STATUS.find((s) => s.id === id) || STATUS[0];

const inputCls =
  'w-full rounded-lg border border-white/10 bg-deep px-3 py-2 text-sm text-ice placeholder:text-silver/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';
const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:bg-primary-hover active:scale-[0.99] disabled:opacity-60';
const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-silver transition-colors hover:border-primary hover:text-primary';

function candidatoVazio() {
  return {
    id: '',
    nome: '',
    email: '',
    linkedin: '',
    curriculoUrl: '',
    areaInteresse: '',
    status: 'VOTACAO',
    votos: {},
    criadoEm: '',
  };
}

// Contagem de votos.
function tally(votos = {}) {
  const t = { sim: 0, talvez: 0, nao: 0 };
  Object.values(votos).forEach((v) => {
    if (t[v?.valor] != null) t[v.valor] += 1;
  });
  return t;
}

export default function NivelamentoView({ currentUid, currentNome }) {
  const [segmento, setSegmento] = useState('candidatos'); // 'candidatos' | 'formacao'
  const [candidatos, setCandidatos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('TODOS');
  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState(null);
  const [msg, setMsg] = useState(null);

  const flash = (tipo, texto) => {
    setMsg({ tipo, texto });
    setTimeout(() => setMsg(null), 3000);
  };

  const recarregar = async () => {
    setCarregando(true);
    try {
      const lista = await listarCandidatos();
      lista.sort((a, b) => (b.criadoEm || '').localeCompare(a.criadoEm || ''));
      setCandidatos(lista);
    } catch (e) {
      if (e?.code !== 'permission-denied') flash('erro', 'Erro ao carregar: ' + e.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contagem = useMemo(() => {
    const acc = { TODOS: candidatos.length };
    STATUS.forEach((s) => (acc[s.id] = 0));
    candidatos.forEach((c) => (acc[c.status] = (acc[c.status] || 0) + 1));
    return acc;
  }, [candidatos]);

  const visiveis = candidatos.filter((c) => {
    const okStatus = filtro === 'TODOS' || c.status === filtro;
    const okBusca =
      !busca.trim() ||
      `${c.nome} ${c.email} ${c.areaInteresse}`.toLowerCase().includes(busca.trim().toLowerCase());
    return okStatus && okBusca;
  });

  const salvar = async (cand) => {
    try {
      const registro = {
        ...cand,
        id: cand.id || `cand_${Date.now()}`,
        criadoEm: cand.criadoEm || new Date().toISOString(),
      };
      await salvarCandidato(registro);
      setEditando(null);
      flash('ok', 'Candidato salvo.');
      recarregar();
    } catch (e) {
      flash('erro', 'Erro ao salvar: ' + e.message);
    }
  };

  const mudarStatus = async (c, status) => {
    await salvarCandidato({ ...c, status });
    recarregar();
  };

  const votar = async (c, valor) => {
    const atual = c.votos?.[currentUid]?.valor;
    const votos = { ...(c.votos || {}) };
    if (atual === valor) delete votos[currentUid];
    else votos[currentUid] = { valor, avaliador: currentNome || 'Avaliador' };
    await salvarCandidato({ ...c, votos });
    setCandidatos((lista) => lista.map((x) => (x.id === c.id ? { ...x, votos } : x)));
  };

  const excluir = async (id) => {
    if (!confirm('Excluir este candidato?')) return;
    await excluirCandidato(id);
    recarregar();
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
            <Users size={20} />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-ice">Nivelamento</h1>
            <p className="text-sm text-silver">
              Avalie candidatos que querem entrar e acompanhe o desempenho de quem já está na formação.
            </p>
          </div>
        </div>
        {segmento === 'candidatos' && (
          <button className={btnPrimary} onClick={() => setEditando(candidatoVazio())}>
            <Plus size={16} /> Novo candidato
          </button>
        )}
      </div>

      {/* Seletor de segmento */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-elevated p-1.5">
        {[
          { id: 'candidatos', label: 'Candidatos', sub: 'Quem quer entrar', icon: UserPlus },
          { id: 'formacao', label: 'Na formação', sub: 'Desempenho de cada um', icon: GraduationCap },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSegmento(s.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              segmento === s.id ? 'bg-primary text-white shadow-glow' : 'text-silver hover:text-ice'
            }`}
          >
            <s.icon size={16} />
            <span className="flex flex-col items-start leading-none">
              <span>{s.label}</span>
              <span className={`text-[10px] font-normal ${segmento === s.id ? 'text-white/80' : 'text-silver/70'}`}>
                {s.sub}
              </span>
            </span>
          </button>
        ))}
      </div>

      {msg && (
        <div
          className={`rounded-lg border px-4 py-2.5 text-sm ${
            msg.tipo === 'ok'
              ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {msg.texto}
        </div>
      )}

      {segmento === 'formacao' && <FormacaoDesempenho />}

      {/* Filtros por etapa + busca */}
      {segmento === 'candidatos' && (
      <>
      <div className="flex flex-wrap items-center gap-2">
        {[{ id: 'TODOS', label: 'Todos' }, ...STATUS].map((s) => (
          <button
            key={s.id}
            onClick={() => setFiltro(s.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              filtro === s.id
                ? 'border-primary bg-primary text-white'
                : 'border-white/10 bg-elevated text-silver hover:text-ice'
            }`}
          >
            {s.label}
            <span className="rounded-full bg-black/20 px-1.5 text-[10px]">{contagem[s.id] || 0}</span>
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
          <input
            className={`${inputCls} w-56 pl-9`}
            placeholder="Buscar por nome…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {carregando ? (
        <div className="grid place-items-center py-16 text-silver">
          <Loader2 size={26} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visiveis.map((c) => (
            <CandidatoCard
              key={c.id}
              c={c}
              currentUid={currentUid}
              onVotar={votar}
              onStatus={mudarStatus}
              onEditar={() => setEditando(c)}
              onExcluir={() => excluir(c.id)}
            />
          ))}
          {!visiveis.length && (
            <p className="col-span-full py-10 text-center text-silver">
              Nenhum candidato {filtro !== 'TODOS' ? `em "${statusInfo(filtro).label}"` : 'ainda'}.
            </p>
          )}
        </div>
      )}
      </>
      )}

      {editando && (
        <CandidatoModal
          candidato={editando}
          onSalvar={salvar}
          onFechar={() => setEditando(null)}
        />
      )}
    </div>
  );
}

// =====================================================================
// NA FORMAÇÃO — desempenho real de cada colaborador
// =====================================================================
const NIVEL_BADGE = {
  0: 'border-accent/40 bg-accent/10 text-accent',
  1: 'border-primary/40 bg-primary/10 text-primary',
  2: 'border-violet-400/40 bg-violet-500/10 text-violet-300',
  3: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
};

function FormacaoDesempenho() {
  const [usuarios, setUsuarios] = useState([]);
  const [progresso, setProgresso] = useState([]);
  const [trilhas, setTrilhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroNivel, setFiltroNivel] = useState('TODOS');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    let vivo = true;
    (async () => {
      setCarregando(true);
      try {
        const [u, p, t] = await Promise.all([listarUsuarios(), listarProgresso(), listarTrilhas()]);
        if (!vivo) return;
        setUsuarios(u);
        setProgresso(p);
        setTrilhas(t);
      } catch (e) {
        if (e?.code !== 'permission-denied') console.warn('[formacao]', e?.code || e);
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  const nomeTrilha = useMemo(() => Object.fromEntries(trilhas.map((t) => [t.id, t.nome])), [trilhas]);
  const modCount = useMemo(
    () => Object.fromEntries(trilhas.map((t) => [t.id, (t.modulos || []).length])),
    [trilhas],
  );
  const feitosPorUser = useMemo(() => {
    const acc = {};
    progresso.filter((p) => p.completed).forEach((p) => {
      acc[p.userId] = acc[p.userId] || {};
      acc[p.userId][p.trackId] = (acc[p.userId][p.trackId] || 0) + 1;
    });
    return acc;
  }, [progresso]);

  const dados = (u) => {
    const total = modCount[u.trilhaAtivaId] || 0;
    const feitos = feitosPorUser[u.uid]?.[u.trilhaAtivaId] || 0;
    return { total, feitos, pct: total ? Math.round((feitos / total) * 100) : 0 };
  };

  const iniciais = (nome = '?') =>
    nome.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  const visiveis = usuarios
    .filter((u) => filtroNivel === 'TODOS' || String(u.nivelAtual ?? 0) === filtroNivel)
    .filter((u) => !busca.trim() || `${u.nome} ${u.email}`.toLowerCase().includes(busca.trim().toLowerCase()))
    .sort((a, b) => (b.nivelAtual ?? 0) - (a.nivelAtual ?? 0) || (a.nome || '').localeCompare(b.nome || ''));

  const total = usuarios.length;
  const progMedio = total
    ? Math.round(usuarios.reduce((s, u) => s + dados(u).pct, 0) / total)
    : 0;
  const porNivel = [0, 1, 2, 3].map((n) => usuarios.filter((u) => (u.nivelAtual ?? 0) === n).length);

  if (carregando) {
    return (
      <div className="grid place-items-center py-16 text-silver">
        <Loader2 size={26} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Resumo */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="glass-panel rounded-xl p-4">
          <p className="text-2xl font-extrabold text-ice">{total}</p>
          <p className="text-xs text-silver">na formação</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-2xl font-extrabold text-accent">{progMedio}%</p>
          <p className="text-xs text-silver">progresso médio</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-2xl font-extrabold text-primary">{porNivel[1] + porNivel[2] + porNivel[3]}</p>
          <p className="text-xs text-silver">já em trilha técnica</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-2xl font-extrabold text-emerald-300">{porNivel[3]}</p>
          <p className="text-xs text-silver">especialistas (N3)</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'TODOS', label: 'Todos' },
          { id: '0', label: 'Nível 0' },
          { id: '1', label: 'Nível 1' },
          { id: '2', label: 'Nível 2' },
          { id: '3', label: 'Nível 3' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroNivel(f.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              filtroNivel === f.id
                ? 'border-primary bg-primary text-white'
                : 'border-white/10 bg-elevated text-silver hover:text-ice'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
          <input
            className={`${inputCls} w-56 pl-9`}
            placeholder="Buscar por nome…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de desempenho */}
      <div className="glass-panel overflow-x-auto rounded-2xl p-4">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-silver">
              <th className="pb-3">Colaborador</th>
              <th className="pb-3">Nível</th>
              <th className="pb-3">Trilha</th>
              <th className="pb-3">Módulos</th>
              <th className="pb-3">Progresso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visiveis.map((u) => {
              const d = dados(u);
              return (
                <tr key={u.uid} className="text-ice">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {iniciais(u.nome)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.nome}</p>
                        <p className="truncate text-xs text-silver">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${NIVEL_BADGE[u.nivelAtual ?? 0]}`}>
                      Nível {u.nivelAtual ?? 0}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-deep/50 px-2.5 py-1 text-xs text-silver">
                      {nomeTrilha[u.trilhaAtivaId] || u.trilhaAtivaId || '—'}
                    </span>
                  </td>
                  <td className="py-3 text-silver">{d.feitos}/{d.total || '—'}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-line/60">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${d.pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-accent">{d.pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!visiveis.length && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-silver">
                  Nenhum colaborador nesse filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
function CandidatoCard({ c, currentUid, onVotar, onStatus, onEditar, onExcluir }) {
  const t = tally(c.votos);
  const meuVoto = c.votos?.[currentUid]?.valor;
  const info = statusInfo(c.status);
  const iniciais = (c.nome || '?')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const votoBtn = (valor, Icon, corAtiva, rotulo) => (
    <button
      onClick={() => onVotar(c, valor)}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
        meuVoto === valor ? corAtiva : 'border-white/10 text-silver hover:text-ice'
      }`}
    >
      <Icon size={13} />
      {rotulo && <span>{rotulo}</span>}
      {valor === 'sim' ? t.sim : valor === 'talvez' ? t.talvez : t.nao}
    </button>
  );

  return (
    <div className="glass-panel flex flex-col gap-3 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            {iniciais}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-ice">{c.nome}</p>
            <p className="truncate text-xs text-silver">{c.areaInteresse || c.email}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${info.cls}`}>
          {info.label}
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {c.linkedin && (
          <a href={c.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-deep/50 px-2.5 py-1.5 text-xs text-silver hover:border-primary hover:text-primary">
            <Linkedin size={13} /> LinkedIn <ExternalLink size={11} />
          </a>
        )}
        {c.curriculoUrl && (
          <a href={c.curriculoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-deep/50 px-2.5 py-1.5 text-xs text-silver hover:border-primary hover:text-primary">
            <FileText size={13} /> Currículo (PDF) <ExternalLink size={11} />
          </a>
        )}
        {c.email && <span className="inline-flex items-center rounded-lg px-1 py-1.5 text-xs text-silver">{c.email}</span>}
      </div>

      {/* Votação */}
      <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-deep/40 p-2.5">
        <span className="text-xs font-semibold text-silver">Votação da equipe</span>
        <div className="flex items-center gap-2">
          {votoBtn('sim', ThumbsUp, 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300')}
          {votoBtn('talvez', Minus, 'border-amber-400/40 bg-amber-500/10 text-amber-300', 'Talvez')}
          {votoBtn('nao', ThumbsDown, 'border-red-500/40 bg-red-500/10 text-red-300')}
        </div>
      </div>

      {/* Ações: mover no funil */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          className={`${inputCls} w-40`}
          value={c.status}
          onChange={(e) => onStatus(c, e.target.value)}
        >
          {STATUS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <button className={btnGhost} onClick={onEditar}>Editar</button>
        <button
          className="ml-auto rounded-lg border border-red-500/30 p-2 text-red-300 hover:bg-red-500/10"
          onClick={onExcluir}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
function CandidatoModal({ candidato, onSalvar, onFechar }) {
  const [c, setC] = useState(candidato);
  const set = (campo, valor) => setC((x) => ({ ...x, [campo]: valor }));
  const novo = !candidato.id;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-elevated p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ice">{novo ? 'Novo candidato' : 'Editar candidato'}</h3>
          <button onClick={onFechar} className="rounded-lg p-1.5 text-silver hover:bg-deep hover:text-ice">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-silver">Nome completo</label>
            <input className={inputCls} value={c.nome} onChange={(e) => set('nome', e.target.value)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-silver">E-mail</label>
              <input className={inputCls} value={c.email} onChange={(e) => set('email', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-silver">Área / trilha de interesse</label>
              <input className={inputCls} value={c.areaInteresse} onChange={(e) => set('areaInteresse', e.target.value)} placeholder="ex: FlutterFlow" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-silver">LinkedIn (link)</label>
            <input className={inputCls} value={c.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-silver">Currículo — link do PDF</label>
            <input className={inputCls} value={c.curriculoUrl} onChange={(e) => set('curriculoUrl', e.target.value)} placeholder="Link do Drive / PDF" />
          </div>
          {novo ? (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ThumbsUp size={14} /> Começa na votação da equipe
              </div>
              <p className="mt-1 text-xs text-silver">
                Todo novo candidato entra na etapa <span className="font-semibold text-ice">Votação</span>, onde a
                equipe vota primeiro. As próximas etapas (Interessado → Aprovado → Reunião → Contratado/Reprovado) são
                liberadas depois, no card do candidato.
              </p>
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-xs font-semibold text-silver">Etapa</label>
              <select className={inputCls} value={c.status} onChange={(e) => set('status', e.target.value)}>
                {STATUS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className={btnGhost} onClick={onFechar}>Cancelar</button>
          <button
            className={btnPrimary}
            onClick={() => c.nome.trim() && onSalvar(c)}
            disabled={!c.nome.trim()}
          >
            Salvar candidato
          </button>
        </div>
      </div>
    </div>
  );
}
