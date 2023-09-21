import { createContext, ReactNode, useState } from 'react'
import { produce } from 'immer'

export interface CartItem {
  id: number
  name: string
  image: string
  price: number
  rating: number
  category: string
  quantity: number
}
interface CartContextType {
  cartItems: CartItem[]
  cartQuantity: number
  addItemToCart: (item: CartItem) => void
  removeCartItem: (cartItemId: number) => void
}
interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const cartQuantity = cartItems.length

  function addItemToCart(item: CartItem) {
    console.log('chegou aqui')
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
  function removeCartItem(cartItemId: number) {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistsInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      )

      if (coffeeExistsInCart >= 0) {
        draft.splice(coffeeExistsInCart, 1)
      }
    })

    setCartItems(newCart)
  }

  return (
    <CartContext.Provider
      value={{ cartItems, cartQuantity, addItemToCart, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  )
}
