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
    <div className={`p-4 rounded-md ${isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onFormat}
            className={`px-4 py-2 rounded-md font-medium ${
              isDarkMode 
                ? 'bg-primary-dark hover:bg-blue-700' 
                : 'bg-primary-light hover:bg-blue-500'
            } text-white`}
          >
            Format
          </button>
          
          <button
            onClick={onMinify}
            className={`px-4 py-2 rounded-md font-medium ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Minify
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label>Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className={`px-2 py-1 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              } border`}
            >
              {[0, 1, 2, 4, 8].map((num) => (
                <option key={num} value={num}>
                  {num === 0 ? 'Minified' : num}
                </option>
              ))}
            </select>
          </div>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTree}
              onChange={() => setShowTree(!showTree)}
              className="rounded text-primary-light focus:ring-primary-light"
            />
            <span>Tree View</span>
          </label>
        </div>
      </div>
    </div>
  )
}