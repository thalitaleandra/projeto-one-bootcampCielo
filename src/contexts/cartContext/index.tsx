import { createContext, ReactNode, useState } from 'react'

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
interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  return (
    <CartContext.Provider value={{ cartItems }}>
      {children}
    </CartContext.Provider>
  )
}
