import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Copiloto Comercial B2B',
  description: 'Dados, inteligência e ação para acelerar receita B2B.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-surface-primary text-neutral-50`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
