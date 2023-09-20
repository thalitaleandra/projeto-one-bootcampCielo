'use client'

import { Box } from '@mui/joy'
import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'
import { useTheme } from '@/contexts/themeContext'

export default function Home() {
  const { products, isFetching, error } = useProducts({
    productsPerPage: 15,
    page: 1,
  })
  if (error) {
    console.error(error)
  }

  if (isFetching && !products) {
    return <h4>buscando produtos, por favor aguarde....</h4>
  }

  return (
    <main>
      <Header />
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {products?.map((product, index) => (
            <Grid item key={index}>
              <ProductCard
                name={product.name}
                image={product.avatar}
                category={product.category}
                price={product.price}
                rating={product.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </main>
  )
}
