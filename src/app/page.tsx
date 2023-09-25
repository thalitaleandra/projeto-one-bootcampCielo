'use client'

import { Box, Button, CircularProgress, Grid, Drawer } from '@mui/material'
import { useEffect, useState } from 'react'

import FilterSidebar from '@/components/FilterSidebar'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation'
import useModal from '@/hooks/useModal'
import useProducts from '@/hooks/useProducts'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import UpdateProducts from '@/components/UpdateProducts'

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }

  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [totalPage] = useState(100)
  const [categories, setCategories] = useState<string[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])
  const [rating, setRating] = useState(0)

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

  const filteredProducts = products?.filter((product) => {
    const price = parseFloat(String(product.price))
    if (price < priceRange[0] || price > priceRange[1]) {
      return false
    }
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false
    }
    if (rating !== null && rating !== 0 && product.rating !== rating) {
      return false
    }

    return true
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
  }, [text, page, refetch])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handleClearFilters = () => {
    setPriceRange([])
    setRating(0)
    setCategories([])
  }

  return (
    <>
      <Header onInputChange={handleInputChange} />
      <Box p={4}>
        <Box display={'flex'}>
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            flexDirection="column"
          >
            <FilterSidebar
              onPriceChange={(priceRange: number[]) => {
                setPriceRange(priceRange)
              }}
              onRatingChange={(rating: number) => {
                setRating(rating)
              }}
              onCategoryChange={(category: string) => {
                categories.includes(category)
                  ? setCategories(categories.filter((cat) => cat !== category))
                  : setCategories([...categories, category])
              }}
            />
            <Button onClick={handleClearFilters}>Limpar filtros</Button>
          </Box>

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
                <Box
                  mb={5}
                  display="flex"
                  justifyContent={{ xs: 'center', sm: 'flex-end' }}
                  gap={2}
                >
                  <Button
                    sx={{
                      display: { xs: 'flex', sm: 'none' },
                      color: '#696969',
                      borderRadius: 5,
                      textTransform: 'none',
                    }}
                    onClick={toggleDrawer(true)}
                    variant="outlined"
                    size="medium"
                    color={'inherit'}
                  >
                    <FilterAltIcon />
                    Filtrar
                  </Button>

                  <UpdateProducts onUpdateProducts={() => refetch()} />
                </Box>

                <Grid
                  container
                  flex={1}
                  rowSpacing={3}
                  columnSpacing={4}
                  justifyContent="center"
                >
                  {filteredProducts &&
                    filteredProducts?.map((product, index) => (
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

      <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: '300px' }} px={2} py={4} flexDirection="column">
          <FilterSidebar
            onPriceChange={(priceRange: number[]) => {
              setPriceRange(priceRange)
            }}
            onRatingChange={(rating: number) => {
              setRating(rating)
            }}
            onCategoryChange={(category: string) => {
              categories.includes(category)
                ? setCategories(categories.filter((cat) => cat !== category))
                : setCategories([...categories, category])
            }}
          />
        </Box>
      </Drawer>
    </>
  )
}
