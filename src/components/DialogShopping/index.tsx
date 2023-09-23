import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'


export default function DialogShopping({isOpen, setIsOpen, handleClose}) {

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
    <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>
      Obrigada por comprar na Ada Ecommerce
    </DialogTitle>
    <DialogContent>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <CheckCircleOutlineIcon style={{ fontSize: '64px', marginRight: '20px', color: '#4caf50' }} />
        <span>Compra realizada com sucesso!</span>
      </div>
      <Button onClick={handleClose} variant="contained" color="primary" onClick={handleClose} fullWidth>
        OK
      </Button>
    </DialogContent>
    <IconButton
      edge="end"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
      style={{ position: 'absolute', top: '8px', right: '16px' }}
    >
      <CloseIcon />
    </IconButton>
  </Dialog>
  )
}