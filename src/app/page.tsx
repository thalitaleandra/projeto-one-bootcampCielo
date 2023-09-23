'use client'

import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import FilterSidebar from '@/components/FilterSidebar'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'
import useModal from '@/hooks/useModal'

export default function Home() {
  const [currentCard, setCurrentCard] = useState(-1)
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(100)
  const { products, isFetching, error, refetch } = useProducts({
    productsPerPage: perPage,
    page,
    search: text,
  })

  const { handleClickOpen, handleClose, open } = useModal()

  const handleModalOpen = (cardIndex: number) => {
    handleClickOpen()
    setCurrentCard(cardIndex)
  }

  if (error) {
    console.error(error)
  }
  const handleInputChange = (value: string) => {
    setText(value)
  }

  const handleNext = () => {
    setCurrentCard((prevIndex) => prevIndex + 1)
  }

  const handlePrev = () => {
    setCurrentCard((prevIndex) => prevIndex - 1)
  }

  // ! WIP: criar modulo separado
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext()
      } else if (event.key === 'ArrowLeft' && currentCard > -1) {
        handlePrev()
      } else if (event.key === 'Enter' && currentCard > -1) {
        handleClickOpen()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [currentCard])

  useEffect(() => {
    refetch()
  }, [text, page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  return (
    <>
      <Header onInputChange={handleInputChange} />
      <Box p={4}>
        <Box display={'flex'} mt={5}>
          <FilterSidebar
            onClose={() => {
              console.log('fechou')
            }}
            onSubcategoryChange={(subcategory: string) => {
              console.log(subcategory)
            }}
            onPriceChange={(priceRange: number[]) => {
              console.log(priceRange)
            }}
            onRatingChange={(rating: number) => {
              console.log(rating)
            }}
            onCategoryChange={(category: string) => {
              console.log(category)
            }}
            open={true}
          />
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
                  <ProductCard
                    itemCard={product}
                    isActive={index === currentCard}
                    cardIndex={index}
                    handleClickOpen={handleModalOpen}
                    handleClose={handleClose}
                    isModalOpen={open}
                  />
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
      </Box>
    </>
  )
}
