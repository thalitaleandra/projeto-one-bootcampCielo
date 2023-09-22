'use client'

import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import { CartContextProvider } from '@/contexts/cartContext'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'

export default function Home() {
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(100)
  const { products, isFetching, error, refetch } = useProducts({
    productsPerPage: perPage,
    page,
    search: text,
  })
  if (error) {
    console.error(error)
  }
  const handleInputChange = (value: string) => {
    setText(value)
  }

  useEffect(() => {
    refetch()
  }, [text, page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    // Atualize o estado da página quando o usuário clicar em outra página
    setPage(value)
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
            <Pagination
              count={totalPage}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </CartContextProvider>
    </main>
  )
}
