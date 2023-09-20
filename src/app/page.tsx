'use client'

import useProducts from '@/hooks/useProducts'
import styles from './page.module.css'

export default function Home() {
  const { products, isFetching, error } = useProducts()
  console.log('all products', products)
  console.log('fetching products', isFetching)
  console.log('error', error)


  return (
    <main>
      <Header />
    </main>
  )
}
