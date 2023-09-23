import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ada Ecommerce',
  description: 'Ecommerce Ada Cielo - Frontend Challenge',
  authors: [
    {
      name: 'Samuel Molendolff Teixeira',
      url: 'https://www.linkedin.com/in/samuelmteixeira/',
    },
    {
      name: 'Thalita Leandra ',
      url: 'https://www.linkedin.com/in/thalitaleandra/',
    },
    {
      name: 'Lília Paula Neiva',
      url: 'https://www.linkedin.com/in/lilia-paula-neiva/',
    },
  ],
  keywords: ['Cielo', 'Ada tech', 'Front-End', 'Frontend Challenge'],
  openGraph: {
    title: 'Ada Ecommerce',
    type: 'website',
    description: 'Ecommerce Ada Cielo - Frontend Challenge',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
