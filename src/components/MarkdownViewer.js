// src/components/MarkdownViewer.js
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Table } from 'react-bootstrap';

// Componentes de markdown memorizados
const markdownComponents = {
  h1: React.memo(({children}) => <h1 className="h3 mb-3 mt-4 text-primary">{children}</h1>),
  h2: React.memo(({children}) => <h2 className="h4 mb-3 mt-4">{children}</h2>),
  h3: React.memo(({children}) => <h3 className="h5 mb-2 mt-3">{children}</h3>),
  h4: React.memo(({children}) => <h4 className="h6 mb-2 mt-3">{children}</h4>),
  p: React.memo(({children}) => <p className="mb-3 text-body">{children}</p>),
  ul: React.memo(({children}) => <ul className="ms-3 mb-3">{children}</ul>),
  ol: React.memo(({children}) => <ol className="ms-3 mb-3">{children}</ol>),
  li: React.memo(({children}) => <li className="mb-2">{children}</li>),
  code: React.memo(({inline, className, children, ...props}) => {
    if (inline) {
      return <code className="bg-light px-2 py-1 rounded text-danger">{children}</code>;
    }
    
    return (
      <pre className="bg-light p-3 rounded overflow-auto mb-3">
        <code className={className}>{children}</code>
      </pre>
    );
  }),
  pre: React.memo(({children, ...props}) => {
    if (children?.props?.mdxType === 'code' || children?.type?.name === 'code') {
      return <>{children}</>;
    }
    return <pre className="bg-light p-3 rounded overflow-auto mb-3" {...props}>{children}</pre>;
  }),
  blockquote: React.memo(({children}) => (
    <blockquote className="border-start border-4 border-primary ps-3 my-3 text-muted">
      {children}
    </blockquote>
  )),
  table: React.memo(({children}) => (
    <div className="table-responsive my-3">
      <Table striped bordered hover size="sm">
        {children}
      </Table>
    </div>
  )),
  a: React.memo(({href, children}) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
      {children}
    </a>
  )),
  hr: React.memo(() => <hr className="my-4" />),
  strong: React.memo(({children}) => <strong className="fw-bold">{children}</strong>),
  em: React.memo(({children}) => <em className="fst-italic">{children}</em>)
};

const MarkdownViewer = React.memo(({ content }) => {
  // Limpiar el contenido una sola vez
  const cleanedContent = useMemo(() => {
    if (!content) return '';
    
    let cleaned = content.trim();
    
    // Limpiar tags HTML y backticks
    const preCodePattern = /<pre[^>]*>[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/gi;
    const codePattern = /<code[^>]*>([\s\S]*?)<\/code>/gi;
    
    let match = preCodePattern.exec(cleaned);
    if (match) {
      cleaned = match[1];
    } else {
      match = codePattern.exec(cleaned);
      if (match) {
        cleaned = match[1];
      }
    }
    
    // Decodificar entidades HTML
    const textarea = document.createElement('textarea');
    textarea.innerHTML = cleaned;
    cleaned = textarea.value;
    
    // Eliminar backticks
    if (cleaned.startsWith('```markdown') || cleaned.startsWith('```md')) {
      cleaned = cleaned.replace(/^```(markdown|md)\n?/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\n?/, '');
    }
    
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.replace(/\n?```$/, '');
    }
    
    return cleaned.trim();
  }, [content]);

  return (
    <div className="markdown-rendered">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {cleanedContent}
      </ReactMarkdown>
    </div>
  );
});

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer;