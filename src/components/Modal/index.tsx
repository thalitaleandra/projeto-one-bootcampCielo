import * as React from 'react'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import IProduct from '@/interfaces/IProduct'

interface Props {
  open: boolean
  handleClose: () => void
  handleAddToCart: () => void
  handleRemove: () => void
  onIncrease: () => void
  onDecrease: () => void
  quantity: number
  product: IProduct
}

export default function ResponsiveDialog({
  open,
  handleClose,
  handleAddToCart,
  handleRemove,
  onIncrease,
  onDecrease,
  quantity,
  product,
}: Props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">{product.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Image
              src={product.avatar}
              alt={product.name}
              width={1}
              height={1}
              sizes="100vw"
              placeholder="empty"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onIncrease}>
            <AddIcon />
          </Button>
          <input
            type="number"
            readOnly
            value={quantity}
            style={{ width: '3rem', textAlign: 'center' }}
          />
          <Button disabled={quantity <= 1} onClick={onDecrease}>
            <RemoveIcon />
          </Button>
        </DialogActions>
        <DialogActions>
          <Button autoFocus onClick={handleAddToCart} color="primary">
            Adicionar ao Carrinho
          </Button>
          <Button onClick={handleRemove} color="secondary" autoFocus>
            Remover do Carrinho
          </Button>
        </DialogActions>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: 'absolute', top: '8px', right: '8px' }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  )
}
