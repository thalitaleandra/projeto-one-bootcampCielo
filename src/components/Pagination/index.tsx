import { Box } from '@mui/material'
import PaginationBase from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'

const StyledPagination = styled(PaginationBase)(({ theme }) => ({
  color: 'red',
  '& .MuiPaginationItem-root': {
    color: theme.palette.primary.main,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}))

interface Props {
  count: number
  page?: number
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void
}

export default function Pagination({ count, page, onChange }: Props) {
  return (
    <Box display={'flex'} justifyContent={'center'} mt={3} mb={3}>
      <StyledPagination count={count} page={page} onChange={onChange} />
    </Box>
  )
}
