import axiosInstance from '@/libs/axios'

export default async function fetchProducts() {
  const response = await axiosInstance('/products')

  return response.data
}
