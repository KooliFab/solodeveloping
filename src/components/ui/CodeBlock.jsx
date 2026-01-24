import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ language, children, showLineNumbers = true }) => {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-block-container group">
      <div className="code-block-header">
        <div className="flex items-center gap-3">
          <span className="code-block-language">
            {language || 'text'}
          </span>
          {showLineNumbers && (
            <span className="text-xs text-gray-400">
              {codeString.split('\n').length} lines
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="code-block-copy-btn opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language || 'text'}
        PreTag="div"
        showLineNumbers={showLineNumbers}
        className="syntax-highlighter"
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'rgb(17 24 39)',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
        }}
        lineNumberStyle={{
          color: 'rgb(107 114 128)',
          paddingRight: '1rem',
          minWidth: '2.5rem',
          textAlign: 'right',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;