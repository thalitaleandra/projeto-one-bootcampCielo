import { useContext } from 'react'
import { CartContext } from '../../contexts/cartContext'

export function useCart() {
  const context = useContext(CartContext)
  return context
}
