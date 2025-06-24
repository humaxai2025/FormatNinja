export default function LanguageSelector({ language, setLanguage }) {
  const languages = [
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' }
  ]
  
  return (
    <div className="flex items-center space-x-2">
      <label>Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}