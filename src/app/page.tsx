'use client'

import useProducts from '@/hooks/useProducts'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const { products, isFetching, error } = useProducts()
  if (error) {
    console.error(error)
  }

  if (isFetching && !products) {
    return <h4>buscando produtos, por favor aguarde....</h4>
  }

  return (
    <main>
      <Header />

      {products
        ?.filter((prod, index) => index < 5)
        .map((product, index) => (
          <ProductCard
            name={product.name}
            image={product.avatar}
            category={product.category}
            price={product.price}
            rating={product.rating}
            key={index}
          />
        ))}
    </main>
  )
}
