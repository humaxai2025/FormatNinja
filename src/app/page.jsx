'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LanguageSelector from './components/LanguageSelector'
import CodeEditor from './components/CodeEditor'
import FormatOptions from './components/FormatOptions'
import FileHandler from './components/FileHandler'
import TreeView from './components/TreeView'
import ThemeToggle from './components/ThemeToggle'
import { formatJson, formatXml, formatYaml } from './lib/formatters'
import { validateJson, validateXml, validateYaml } from './lib/validators'

export default function Home() {
  const [language, setLanguage] = useState('json')
  const [input, setInput] = useState('{\n  "example": "JSON",\n  "features": ["formatting", "validation"],\n  "active": true\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [indent, setIndent] = useState(2)
  const [showTree, setShowTree] = useState(false)
  const [treeData, setTreeData] = useState(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

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
          parsed = { xml: 'XML tree view' }
          break
        case 'yaml':
          parsed = { yaml: 'YAML tree view' }
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

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            Modern Formatter
          </h1>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <FileHandler 
                language={language} 
                setInput={setInput}
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

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Output</h2>
              {output && (
                <button 
                  onClick={() => navigator.clipboard.writeText(output)}
                  className={`px-3 py-1 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  Copy
                </button>
              )}
            </div>
            
            {error ? (
              <div className={`p-4 rounded-md ${isDarkMode ? 'bg-red-900' : 'bg-red-100'} text-${isDarkMode ? 'white' : 'red-800'}`}>
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
              <div className={`p-8 rounded-md text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p>Your formatted content will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}