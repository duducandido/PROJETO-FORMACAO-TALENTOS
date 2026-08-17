// =====================================================================
// Markdown.jsx — Renderiza texto Markdown com estilo Zello (.md-prose).
// Suporta GFM (tabelas, listas de tarefas, ~~riscado~~). Links sempre
// abrem em nova aba. Uso: <Markdown>{textoMd}</Markdown>
// =====================================================================
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`md-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => <a target="_blank" rel="noreferrer" {...props} />,
        }}
      >
        {children || ''}
      </ReactMarkdown>
    </div>
  );
}
