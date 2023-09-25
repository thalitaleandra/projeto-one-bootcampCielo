'use client'

import { ReactNode, createContext, useState, useEffect } from 'react'
import { produce } from 'immer'
import IProduct from '@/interfaces/IProduct'

export interface CartItem extends IProduct {
  quantity: number
}
interface CartContextType {
  cartItems: CartItem[]
  cartQuantity: number
  addItemToCart: (item: CartItem) => void
  removeCartItem: (cartItemId: string) => void
  cleanCart: () => void
}
interface CartContextProviderProps {
  children: ReactNode
}
const ITEMS_STORAGE_KEY = 'adaEcommerce:cartItems'

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem(ITEMS_STORAGE_KEY)
      if (storedCartItems) {
        return JSON.parse(storedCartItems)
      }
    }

    return []
  })
  const cartQuantity = cartItems.length

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
  function removeCartItem(cartItemId: string) {
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
  function cleanCart() {
    setCartItems([])
  }
  useEffect(() => {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        addItemToCart,
        removeCartItem,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
