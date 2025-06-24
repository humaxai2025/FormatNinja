'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CodeEditor({ 
  value, 
  onChange, 
  language, 
  isReadOnly = false, 
  isDarkMode 
}) {
  const style = isDarkMode ? atomDark : ghcolors
  
  return (
    <div className="relative rounded-lg overflow-hidden border">
      {isReadOnly ? (
        <SyntaxHighlighter
          language={language}
          style={style}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            minHeight: '300px',
            maxHeight: '500px',
            overflow: 'auto',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff'
          }}
          wrapLongLines={true}
        >
          {value}
        </SyntaxHighlighter>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 font-mono text-sm min-h-[300px] max-h-[500px] overflow-auto ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-200 border-gray-600' 
              : 'bg-white text-gray-800 border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          spellCheck="false"
        />
      )}
    </div>
  )
}