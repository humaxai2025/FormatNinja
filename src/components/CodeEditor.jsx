import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CodeEditor({ 
  value, 
  onChange, 
  language, 
  isReadOnly = false, 
  isDarkMode 
}) {
  const style = isDarkMode ? atomDark : tomorrow
  
  return (
    <div className="relative rounded-md overflow-hidden">
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
            overflow: 'auto'
          }}
          wrapLongLines={true}
        >
          {value}
        </SyntaxHighlighter>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 font-mono text-sm rounded-md min-h-[300px] max-h-[500px] overflow-auto ${
            isDarkMode 
              ? 'bg-surface-dark text-gray-200 border-gray-600' 
              : 'bg-surface-light text-gray-800 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-primary-light`}
          spellCheck="false"
        />
      )}
    </div>
  )
}