import { Box } from '@mui/material'
import PaginationBase from '@mui/material/Pagination'

interface Props {
  count: number
  page?: number
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void
}

export default function Pagination({ count, page, onChange }: Props) {
  return (
    <Box display={'flex'} justifyContent={'center'} mt={3} mb={3}>
      <PaginationBase count={count} page={page} onChange={onChange} />
    </Box>
  )
}
