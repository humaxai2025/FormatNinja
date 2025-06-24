import { useState } from 'react'
import { FiUpload, FiDownload } from 'react-icons/fi'

export default function FileHandler({ language, setInput, input, isDarkMode }) {
  const [fileName, setFileName] = useState('')
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setFileName(file.name)
    const reader = new FileReader()
    
    reader.onload = (event) => {
      setInput(event.target.result)
    }
    
    reader.readAsText(file)
  }
  
  const handleDownload = () => {
    if (!input) return
    
    const blob = new Blob([input], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `formatted.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="flex space-x-2">
      <label className={`flex items-center px-3 py-1 rounded-md cursor-pointer ${
        isDarkMode 
          ? 'bg-surface-dark hover:bg-gray-600' 
          : 'bg-surface-light hover:bg-gray-200'
      }`}>
        <FiUpload className="mr-2" />
        Upload
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileUpload} 
          accept={`.${language},text/*`}
        />
      </label>
      
      <button 
        onClick={handleDownload}
        disabled={!input}
        className={`flex items-center px-3 py-1 rounded-md ${
          isDarkMode 
            ? 'bg-surface-dark hover:bg-gray-600 disabled:opacity-50' 
            : 'bg-surface-light hover:bg-gray-200 disabled:opacity-50'
        }`}
      >
        <FiDownload className="mr-2" />
        Download
      </button>
    </div>
  )
}