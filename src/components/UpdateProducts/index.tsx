import { Box, Button } from '@mui/material'

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
      <Button
        sx={{
          display: { xs: 'flex', sm: 'flex' },
          color: '#696969',
          borderRadius: 5,
          textTransform: 'none',
        }}
        variant="outlined"
        size="medium"
        color={'inherit'}
        onClick={handleUpdateProducts}
      >
        <CachedIcon style={{ marginRight: '10px' }} />
        Atualizar produtos
      </Button>
    </Box>
  )
}
