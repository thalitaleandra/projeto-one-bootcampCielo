import { createContext, ReactNode, useState } from 'react'
import { produce } from 'immer'

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
  cartItems: CartItem[]
  addItemToCart: (item: CartItem) => void
}
interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addItemToCart(item: CartItem) {
    const itemAlreadyExistsInCart = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id,
    )
    const newCart = produce(cartItems, (draft) => {
      if (itemAlreadyExistsInCart < 0) {
        draft.push(item)
      } else {
        draft[itemAlreadyExistsInCart].quantity += item.quantity
      }
    })
    setCartItems(newCart)
  }

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  )
}
