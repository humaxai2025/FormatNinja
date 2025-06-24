'use client'
import { FiUpload, FiDownload } from 'react-icons/fi'

export default function FileHandler({ language, setInput, isDarkMode }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      setInput(event.target.result)
    }
    reader.readAsText(file)
  }
  
  const handleDownload = () => {
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
    <div className="flex gap-2">
      <label className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-gray-200 hover:bg-gray-300'
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
        className={`flex items-center px-3 py-2 rounded-md transition ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <FiDownload className="mr-2" />
        Download
      </button>
    </div>
  )
}