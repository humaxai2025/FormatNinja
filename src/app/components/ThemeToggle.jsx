'use client'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition ${
        isDarkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}