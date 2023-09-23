'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartContextProvider } from '@/contexts/cartContext'
import { ThemeProviderWrapper } from '@/contexts/themeContext'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <CartContextProvider>{children}</CartContextProvider>
      </ThemeProviderWrapper>
    </QueryClientProvider>
  )
}
