import { createContext } from 'react'

export interface CartItem {
  id: number
  name: string
  avatar: string
  description: string
  price: string
  rating: number
  category: string
  quantity: number
}
interface CartContextType {
  cartItem: CartItem[]
}

export const CartContext = createContext({} as CartContextType)