'use client'

import { Box, Grid } from '@mui/material'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'
import Pagination from '@/components/Pagination'
import { CartContextProvider } from '@/contexts/cartContext'

export default function Home() {
  const { products, isFetching, error } = useProducts({
    productsPerPage: 15,
    page: 1,
  })
  if (error) {
    console.error(error)
  }

  return (
    <main>
      <CartContextProvider>
        <Header />
        <Box display={'flex'} mt={5}>
          <Box component={'aside'}>barra lateral para filtros...</Box>
          <Box component={'main'} flex={1} sx={{ flexGrow: 1 }}>
            {isFetching && !products ? (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <h4>buscando produtos, por favor aguarde...</h4>
              </Box>
            ) : null}
            <Grid
              container
              rowSpacing={3}
              columnSpacing={4}
              justifyContent="center"
            >
              {products?.map((product, index) => (
                <Grid item key={index}>
                  <ProductCard itemCard={product} />
                </Grid>
              ))}
            </Grid>
            <Pagination />
          </Box>
        </Box>
      </CartContextProvider>
    </main>
  )
}