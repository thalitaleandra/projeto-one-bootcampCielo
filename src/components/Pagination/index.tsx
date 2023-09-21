import { Box } from '@mui/material'
import PaginationBase from '@mui/material/Pagination'

export default function Pagination() {
  return (
    <Box display={'flex'} justifyContent={'center'} mt={3} mb={3}>
      <PaginationBase count={10} />
    </Box>
  )
}
