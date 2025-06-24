'use client'

export default function FormatOptions({ 
  onFormat, 
  onMinify, 
  indent, 
  setIndent, 
  showTree, 
  setShowTree,
  isDarkMode 
}) {
  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onFormat}
            className={`px-4 py-2 rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600 transition`}
          >
            Format
          </button>
          
          <button
            onClick={onMinify}
            className={`px-4 py-2 rounded-md font-medium transition ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Minify
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label>Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className={`px-2 py-1 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
            >
              {[0, 1, 2, 4].map((num) => (
                <option key={num} value={num}>
                  {num === 0 ? 'Minified' : num}
                </option>
              ))}
            </select>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTree}
              onChange={() => setShowTree(!showTree)}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <span>Tree View</span>
          </label>
        </div>
      </div>
    </div>
  )
}