import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URl || 'http://localhost:3000',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
