"use client";

import Header from "@/components/Header";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  const { products, isFetching, error } = useProducts();
  console.log("all products", products);
  console.log("fetching products", isFetching);
  console.log("error", error);

  return (
    <main>
      <Header />
    </main>
  );
}
