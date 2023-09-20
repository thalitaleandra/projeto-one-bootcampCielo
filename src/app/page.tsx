'use client'

import useProducts from '@/hooks/useProducts'
import Header from '@/components/Header'
import { Box } from '@mui/material'

export default function Home() {
  const { products, isFetching, error } = useProducts()
  if (error) {
    console.error(error)
  }

  if (isFetching && !products) {
    return <h4>buscando produtos, por favor aguarde....</h4>
  }

  return (
    <main>
      <Header />

      {products?.map((product, index) => (
        <Box sx={{ marginBottom: 5, marginTop: 5 }} key={index}>
          <h2>{product.name}</h2>
          <p>R$ {product.price}</p>
        </Box>
      ))}
    </main>
  )
}
