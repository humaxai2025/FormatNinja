import { useState } from 'react'

const TreeNode = ({ node, level = 0, isDarkMode }) => {
  const [expanded, setExpanded] = useState(true)
  
  if (typeof node === 'object' && node !== null) {
    return (
      <div className="ml-4">
        <div 
          className="flex items-center cursor-pointer select-none" 
          onClick={() => setExpanded(!expanded)}
        >
          <span className="mr-1">
            {expanded ? '▼' : '▶'}
          </span>
          <span className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            {Object.keys(node)[0]}
          </span>
        </div>
        {expanded && (
          <div className="ml-4">
            {Object.entries(node).map(([key, value]) => (
              <div key={key}>
                {typeof value === 'object' ? (
                  <TreeNode node={{ [key]: value }} level={level + 1} isDarkMode={isDarkMode} />
                ) : (
                  <div className="ml-4 flex">
                    <span className={`mr-2 font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                      {key}:
                    </span>
                    <span className={isDarkMode ? 'text-green-300' : 'text-green-600'}>
                      {JSON.stringify(value)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="ml-4">
      {JSON.stringify(node)}
    </div>
  )
}

export default function TreeView({ data, isDarkMode }) {
  return (
    <div className={`mt-4 p-4 rounded-md overflow-auto max-h-64 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <h3 className="font-semibold mb-2">Tree View</h3>
      <TreeNode node={data} isDarkMode={isDarkMode} />
    </div>
  )
}