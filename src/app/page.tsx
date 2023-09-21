'use client'

import { Box, Grid } from '@mui/material'

import { CartContextProvider } from '@/contexts/cartContext'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'
import { useState } from 'react'

export default function Home() {
  const { products, isFetching, error } = useProducts({
    productsPerPage: 15,
    page: 1,
  })
  /*   if (error) {
    console.error(error)
  } */

  const [text, setText] = useState('')
  console.log('🚀 ~ file: page.tsx:22 ~ Home ~ text:', text)
  const handleInputChange = (value: string) => {
    setText(value)
  }

  return (
    <main>
      <CartContextProvider>
        <Header onInputChange={handleInputChange} />

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
