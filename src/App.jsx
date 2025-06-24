import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LanguageSelector from './components/LanguageSelector'
import CodeEditor from './components/CodeEditor'
import FormatOptions from './components/FormatOptions'
import FileHandler from './components/FileHandler'
import TreeView from './components/TreeView'
import ThemeToggle from './components/ThemeToggle'
import { formatJson, formatXml, formatYaml } from '../lib/formatters'
import { validateJson, validateXml, validateYaml } from '../lib/validators'

export default function App() {
  const [language, setLanguage] = useState('json')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [indent, setIndent] = useState(2)
  const [showTree, setShowTree] = useState(false)
  const [treeData, setTreeData] = useState(null)

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
    
    // Set default input based on language
    setDefaultInput()
  }, [language])

  const setDefaultInput = () => {
    switch (language) {
      case 'json':
        setInput('{\n  "example": "JSON",\n  "features": ["formatting", "validation"],\n  "active": true\n}')
        break
      case 'xml':
        setInput('<root>\n  <example>XML</example>\n  <features>\n    <feature>formatting</feature>\n    <feature>validation</feature>\n  </features>\n  <active>true</active>\n</root>')
        break
      case 'yaml':
        setInput('example: YAML\nfeatures:\n  - formatting\n  - validation\nactive: true')
        break
      default:
        setInput('')
    }
  }

  const handleFormat = () => {
    try {
      setError('')
      let formatted = ''
      let validationError = ''
      
      switch (language) {
        case 'json':
          validationError = validateJson(input)
          formatted = formatJson(input, indent)
          break
        case 'xml':
          validationError = validateXml(input)
          formatted = formatXml(input, indent)
          break
        case 'yaml':
          validationError = validateYaml(input)
          formatted = formatYaml(input, indent)
          break
        default:
          formatted = input
      }
      
      if (validationError) {
        setError(validationError)
        setOutput('')
        setTreeData(null)
      } else {
        setOutput(formatted)
        generateTreeData(formatted)
      }
    } catch (err) {
      setError(err.message)
      setOutput('')
      setTreeData(null)
    }
  }

  const generateTreeData = (data) => {
    try {
      let parsed
      switch (language) {
        case 'json':
          parsed = JSON.parse(data)
          break
        case 'xml':
          // For simplicity, we'll just show a basic tree for XML
          parsed = { xml: 'XML tree view not fully implemented' }
          break
        case 'yaml':
          // Similarly for YAML
          parsed = { yaml: 'YAML tree view not fully implemented' }
          break
        default:
          parsed = null
      }
      setTreeData(parsed)
    } catch {
      setTreeData(null)
    }
  }

  const handleMinify = () => {
    try {
      setError('')
      let minified = ''
      
      switch (language) {
        case 'json':
          minified = formatJson(input, 0)
          break
        case 'xml':
          minified = formatXml(input, 0)
          break
        case 'yaml':
          // YAML doesn't minify well, so we'll just remove extra spaces
          minified = input.replace(/\n\s+/g, '\n').trim()
          break
        default:
          minified = input
      }
      
      setOutput(minified)
      generateTreeData(minified)
    } catch (err) {
      setError(err.message)
      setOutput('')
      setTreeData(null)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-background-dark text-white' : 'bg-background-light text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
            Modern Formatter
          </h1>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <FileHandler 
                language={language} 
                setInput={setInput} 
                input={input}
                isDarkMode={isDarkMode}
              />
            </div>
            
            <CodeEditor 
              value={input}
              onChange={setInput}
              language={language}
              isDarkMode={isDarkMode}
            />
            
            <FormatOptions 
              onFormat={handleFormat}
              onMinify={handleMinify}
              indent={indent}
              setIndent={setIndent}
              showTree={showTree}
              setShowTree={setShowTree}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Output</h2>
              {output && (
                <button 
                  onClick={() => navigator.clipboard.writeText(output)}
                  className={`px-3 py-1 rounded-md ${isDarkMode ? 'bg-surface-dark hover:bg-gray-600' : 'bg-surface-light hover:bg-gray-200'}`}
                >
                  Copy
                </button>
              )}
            </div>
            
            {error ? (
              <div className={`p-4 rounded-md ${isDarkMode ? 'bg-error-dark' : 'bg-error-light'}`}>
                <p className="font-mono text-sm">{error}</p>
              </div>
            ) : output ? (
              <>
                <CodeEditor 
                  value={output}
                  onChange={setOutput}
                  language={language}
                  isReadOnly={true}
                  isDarkMode={isDarkMode}
                />
                {showTree && treeData && (
                  <TreeView data={treeData} isDarkMode={isDarkMode} />
                )}
              </>
            ) : (
              <div className={`p-8 rounded-md text-center ${isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'}`}>
                <p>Your formatted content will appear here</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}