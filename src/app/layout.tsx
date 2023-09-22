import './globals.css'

import { CartContextProvider } from '@/contexts/cartContext'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Providers from './providers'
import { ThemeProviderWrapper } from '@/contexts/themeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce Ada Cielo - Frontend Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <Providers>
            <CartContextProvider>{children}</CartContextProvider>
          </Providers>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
