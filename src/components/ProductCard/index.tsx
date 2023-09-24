import {
  Box,
  Rating,
  Card as CardBase,
  Typography,
  CardContent,
  CardActionArea,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/Modal'
import useCart from '@/hooks/useCart'
import { styled } from '@mui/material/styles'
import { Product, WithContext } from 'schema-dts'
import IProduct from '@/interfaces/IProduct'

const Card = styled(CardBase)(({ theme }) => ({
  width: 300,
  borderRadius: 20,
  backgroundColor: theme.palette.mode === 'dark' ? 'rbg(100, 100, 100)' : '#FFFFFF',
}))

interface ItemProps {
  itemCard: IProduct
  isActive?: boolean
  isModalOpen: boolean
  handleClickOpen: (cardIndex: number) => void
  handleClose: () => void
  cardIndex: number
}

export default function ProductCard({
  itemCard,
  isActive,
  isModalOpen,
  handleClickOpen,
  handleClose,
  cardIndex,
}: ItemProps) {
  const { addItemToCart, removeCartItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }
  function handleDecrease() {
    setQuantity((state) => state - 1)
  }
  function handleAddToCart() {
    const itemToAdd = {
      ...itemCard,
      quantity,
    }
    addItemToCart(itemToAdd)
  }
  function handleRemove() {
    removeCartItem(itemCard.id)
  }

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    productID: itemCard.id,
    name: itemCard.name,
    image: itemCard.avatar,
    description: itemCard.description,
    category: itemCard.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: itemCard.rating,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: itemCard.price,
      priceCurrency: 'BRL',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Card elevation={isActive ? 5 : 1}>
        <CardActionArea onClick={() => handleClickOpen(cardIndex)}>
          <Box sx={{ position: 'relative', height: '200px' }}>
            <Image
              alt={`Representação do produto ${itemCard.name}`}
              src={itemCard.avatar}
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>

          <CardContent sx={{ height: '200px' }}>
            <Chip
              label={itemCard?.category?.toLowerCase()}
              color="info"
              size="small"
              sx={{ opacity: '0.8', fontSize: '0.8em' }}
            />
            <Typography sx={{ fontWeight: 500 }} variant="h6" component="h5">
              {itemCard.name}
            </Typography>

            <Box
              mt={1}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={1}
            >
              <Typography variant="body2" color="text.secondary">
                {itemCard.rating}
              </Typography>

              <Rating
                name="read-only"
                value={itemCard.rating}
                readOnly
                precision={0.1}
                size="small"
              />
            </Box>

            <Box
              mt={1}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'baseline'}
              gap={1}
            >
              <Typography
                variant="h5"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                R$ {itemCard.price}
              </Typography>

              <Typography>à vista</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {isActive && (
        <Modal
          open={isModalOpen}
          handleClose={handleClose}
          handleAddToCart={handleAddToCart}
          handleRemove={handleRemove}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          quantity={quantity}
          product={itemCard}
        />
      )}
    </>
  )
}
