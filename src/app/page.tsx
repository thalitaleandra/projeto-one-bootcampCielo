'use client'

import { Box, CircularProgress, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

import FilterSidebar from '@/components/FilterSidebar'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import useProducts from '@/hooks/useProducts'
import useModal from '@/hooks/useModal'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'
import UpdateProducts from '@/components/UpdateProducts'

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

  const { handleClickOpen, handleClose, open } = useModal()

  const { currentProduct, setCurrentProduct } = useKeyboardNavigation({
    initialIndex: -1,
    maxIndex: perPage,
    enterAction: handleClickOpen,
  })

  const handleModalOpen = (cardIndex: number) => {
    handleClickOpen()
    setCurrentProduct(cardIndex)
  }

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
    setPage(value)
  }

  return (
    <>
      <Header onInputChange={handleInputChange} />
      <Box p={4}>
        <Box mb={5} display="flex" justifyContent="flex-end">
          <UpdateProducts onUpdateProducts={() => refetch()} />
        </Box>
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
            {isFetching ? (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Box display="flex" justifyContent="center" mt={3} mb={3}>
                  <CircularProgress color="primary" />
                </Box>
              </Box>
            ) : (
              <>
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
                        isActive={index === currentProduct}
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
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
