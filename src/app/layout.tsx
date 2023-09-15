
import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { AuthProvider } from './auth'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const lato = Lato({ subsets: ['latin'], weight: "700" })

export const metadata: Metadata = {
  title: 'Spotify Remote(Taylor\'s Version)',
  description: 'A spotify remote control for low end tablets',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={lato.className}>
          <AuthProvider session={session}>
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}
