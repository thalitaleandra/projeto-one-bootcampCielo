import { Box, Fab } from '@mui/material'

import CachedIcon from '@mui/icons-material/Cached'
interface Props {
  onUpdateProducts: () => void
}
export default function UpdateProducts({ onUpdateProducts }: Props) {
  const handleUpdateProducts = () => {
    onUpdateProducts()
  }
  return (
    <Box>
      <Fab
        variant="extended"
        size="small"
        color="primary"
        onClick={handleUpdateProducts}
        style={{ textTransform: 'none' }}
      >
        <CachedIcon style={{ marginRight: '10px' }} />
        Atualizar produtos
      </Fab>
    </Box>
  )
}
