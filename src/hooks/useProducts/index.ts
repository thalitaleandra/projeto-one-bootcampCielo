import fetchProducts from '@/services/product/fetchProducts'
import { useQuery } from '@tanstack/react-query'

export default function useProducts() {
  const {
    data: products,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return { products, isFetching, error }
}
