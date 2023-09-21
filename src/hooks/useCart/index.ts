import { useContext } from 'react'
import { CartContext } from '@/contexts/cartContext'

export default function useCart() {
  const context = useContext(CartContext)
  return context
}
