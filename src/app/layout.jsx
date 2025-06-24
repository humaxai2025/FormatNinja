import './globals.css'

export const metadata = {
  title: 'Modern Formatter',
  description: 'Format JSON, XML, and YAML with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}