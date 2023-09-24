'use client'

import { useEffect, useState } from 'react'

interface IKeyboardNavigation {
  initialIndex: number
  maxIndex?: number
  enterAction: () => void
}

function useKeyboardNavigation({
  initialIndex,
  enterAction,
  maxIndex,
}: IKeyboardNavigation) {
  const [currentProduct, setCurrentProduct] = useState(initialIndex)
  const maxQtdProducts = maxIndex ?? 0

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentProduct < maxQtdProducts) {
        setCurrentProduct((prevIndex) => prevIndex + 1)
      } else if (event.key === 'ArrowLeft' && currentProduct > -1) {
        setCurrentProduct((prevIndex) => prevIndex - 1)
      } else if (
        event.key === 'Enter' &&
        currentProduct > -1 &&
        currentProduct < maxQtdProducts
      ) {
        enterAction()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [currentProduct, enterAction, maxQtdProducts])

  return { currentProduct, setCurrentProduct }
}

export default useKeyboardNavigation
