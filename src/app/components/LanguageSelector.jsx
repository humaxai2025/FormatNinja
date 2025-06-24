'use client'

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="flex items-center gap-2">
      <label>Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
      </select>
    </div>
  )
}