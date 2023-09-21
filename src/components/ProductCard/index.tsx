import {
  Box,
  Rating,
  Card,
  Typography,
  CardContent,
  CardActionArea,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/Modal'
import useModal from '@/hooks/useModal'
import useCart from '@/hooks/useCart'

interface IProductCard {
  id: number
  name: string
  avatar: string
  price: number
  rating: number
  category: string
}

interface itemProps {
  itemCard: IProductCard
}

export default function ProductCard({ itemCard }: itemProps) {
  const { handleClickOpen, handleClose, open } = useModal()
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
  return (
    <>
      <Card
        sx={{ width: 300, boxShadow: 'lg', borderRadius: 5 }}
        style={{
          boxShadow:
            'box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
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
              label={itemCard.category.toLowerCase()}
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
      <Modal
        open={open}
        handleClose={handleClose}
        handleAddToCart={handleAddToCart}
        handleRemove={handleRemove}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        quantity={quantity}
      />
    </>
  )
}
