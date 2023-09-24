import IProduct from '@/interfaces/IProduct'
import axiosInstance from '@/libs/axios'

export interface ProductQueryParams {
  productsPerPage?: number
  page?: number
  search?: string
}

export default async function fetchProducts({
  productsPerPage,
  page,
  search,
}: ProductQueryParams = {}): Promise<IProduct[]> {
  const response = await axiosInstance.get('/products', {
    params: {
      pageSize: productsPerPage,
      pageNumber: page,
      search,
    },
  })
  return response.data
}
