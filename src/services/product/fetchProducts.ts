import axiosInstance from '@/libs/axios'

export interface Product {
  id: string
  name: string
  avatar: string
  description: string
  price: number
  rating: number
  category: string
}

export interface ProductQueryParams {
  productsPerPage?: number
  page?: number
  search?: string
}

export default async function fetchProducts({
  productsPerPage,
  page,
  search,
}: ProductQueryParams = {}): Promise<Product[]> {
  const response = await axiosInstance.get('/products', {
    params: {
      pageSize: productsPerPage,
      pageNumber: page,
      search,
    },
  })
  return response.data
}
