import React from 'react'
import { ProductCard } from './ProductCard'
import { useFetch } from '../hooks/useFetch';

export const ProductCardContainer = () => {
    const fullUrl = `${import.meta.env.VITE_SERVER_URL_BASE}/api/v1/products`;
    const { data, loading, error } = useFetch(fullUrl);



    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
            ProductCardContainer
            {data.products?.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </section>
    )
}
