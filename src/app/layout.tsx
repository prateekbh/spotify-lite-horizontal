
import './globals.css'
import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import { AuthProvider } from './auth'

const fira = Fira_Sans({ subsets: ['latin'], weight: "500" })

export const metadata: Metadata = {
  title: 'Spotify Remote(Taylor\'s Version)',
  description: 'A spotify remote control for low end tablets',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  
  return (
    <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={fira.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}
