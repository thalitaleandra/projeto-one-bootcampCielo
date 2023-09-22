import * as React from 'react'
import useProducts from '@/hooks/useProducts'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CloseIcon from '@mui/icons-material/Close'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'

export default function ResponsiveDialog({ open, handleClose, handleAddToCart, handleRemove, onIncrease, onDecrease, quantity, product }) {

  const { products } = useProducts()
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
      <DialogTitle id="responsive-dialog-title">
        {product.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <img src={product.avatar} alt={product.name} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
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
        <input type="number" readOnly value={quantity} style={{ width: '3rem', textAlign: 'center' }} />
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
