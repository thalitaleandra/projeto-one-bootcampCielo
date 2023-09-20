import fetchProducts, {
  ProductQueryParams,
} from '@/services/product/fetchProducts'
import { useQuery } from '@tanstack/react-query'

export default function useProducts({
  productsPerPage,
  page,
}: ProductQueryParams = {}) {
  const {
    data: products,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({ productsPerPage, page }),
  })

  return { products, isFetching, error }
}
