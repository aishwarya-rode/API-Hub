import "./styles/globals.css"
import { Inter } from 'next/font/google'
import { NextAuthProvider } from "@/providers/NextAuthProvider"
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "API Hub GitHub Analyzer",
  description: "Get powerful insights and analytics for open source GitHub repositories",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}

