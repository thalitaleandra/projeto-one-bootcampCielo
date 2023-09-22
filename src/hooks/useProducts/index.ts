import fetchProducts, {
  ProductQueryParams,
} from '@/services/product/fetchProducts'

import { useQuery } from '@tanstack/react-query'

export default function useProducts({
  productsPerPage,
  page,
  search,
}: ProductQueryParams = {}) {
  const {
    data: products,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({ productsPerPage, page, search }),
  })

  return { products, isFetching, error, refetch }
}
