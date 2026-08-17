// =====================================================================
// ModuloQuiz.jsx — Mini-quiz obrigatório no fim de um módulo.
// A pessoa precisa acertar TODAS as perguntas para concluir o módulo e
// liberar o próximo. Permite tentar de novo. Se `jaConcluido`, mostra
// como aprovado (não precisa refazer).
// =====================================================================
import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

export default function ModuloQuiz({ quiz, jaConcluido, onAprovado }) {
  const [respostas, setRespostas] = useState({}); // qi -> índice escolhido
  const [enviado, setEnviado] = useState(false);

  const total = quiz.length;
  const acertos = quiz.reduce((n, q, qi) => n + (respostas[qi] === q.correta ? 1 : 0), 0);
  // Aprova permitindo 1 erro (mas em quiz de 1 pergunta, tem que acertar).
  const maxErros = total <= 1 ? 0 : 1;
  const minAcertos = total - maxErros;
  const aprovado = acertos >= minAcertos;
  const passou = enviado && aprovado;
  const respondeuTudo = quiz.every((_, qi) => respostas[qi] != null);

  const enviar = () => {
    setEnviado(true);
    if (aprovado) onAprovado?.();
  };
  const refazer = () => {
    setRespostas({});
    setEnviado(false);
  };

  if (jaConcluido) {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-300">
        <Award size={16} /> Quiz concluído — módulo aprovado.
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4 rounded-xl border border-white/10 bg-deep/40 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-ice">
        <HelpCircle size={16} className="text-primary" />
        Quiz do módulo
        <span className="ml-auto text-xs font-normal text-silver">
          {maxErros === 0
            ? `Acerte para concluir (${total} pergunta)`
            : `Acerte ${minAcertos} de ${total} para concluir`}
        </span>
      </div>

      {quiz.map((q, qi) => {
        const escolhido = respostas[qi];
        return (
          <div key={qi} className="space-y-2">
            <p className="text-sm font-semibold text-ice">
              {qi + 1}. {q.pergunta}
            </p>
            <div className="grid gap-1.5">
              {q.opcoes.map((op, oi) => {
                const selecionado = escolhido === oi;
                const ehCorreta = q.correta === oi;
                let cls = 'border-white/10 bg-elevated text-silver hover:border-primary/50 hover:text-ice';
                let Icon = null;
                if (enviado && selecionado && ehCorreta) {
                  cls = 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200';
                  Icon = CheckCircle2;
                } else if (enviado && selecionado && !ehCorreta) {
                  cls = 'border-red-500/50 bg-red-500/10 text-red-200';
                  Icon = XCircle;
                } else if (enviado && ehCorreta) {
                  cls = 'border-emerald-400/40 bg-emerald-500/5 text-emerald-300';
                  Icon = CheckCircle2;
                } else if (selecionado) {
                  cls = 'border-primary bg-primary/10 text-ice';
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={enviado}
                    onClick={() => setRespostas((r) => ({ ...r, [qi]: oi }))}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all ${cls} ${
                      enviado ? 'cursor-default' : ''
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                        selecionado ? 'border-current' : 'border-white/20 text-silver'
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{op}</span>
                    {Icon && <Icon size={15} className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Ações / resultado */}
      {!enviado ? (
        <button
          type="button"
          onClick={enviar}
          disabled={!respondeuTudo}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:bg-primary-hover disabled:opacity-50"
        >
          Enviar respostas
        </button>
      ) : passou ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
          <CheckCircle2 size={16} /> Você passou! ({acertos}/{total}) Módulo concluído.
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
            <XCircle size={16} /> Você acertou {acertos}/{total}. Revise e tente de novo.
          </span>
          <button
            type="button"
            onClick={refazer}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-silver transition-colors hover:border-primary hover:text-primary"
          >
            <RotateCcw size={14} /> Refazer
          </button>
        </div>
      )}
    </div>
  );
}
