import React, { useState } from 'react';
import { ProductCardContainer } from '../products/ProductCardContainer';
import ProductFilter from '../products/components/ProductFilter';
import { CatalogProductCard } from '../products/CatalogProductCard';
import { useFetch } from '../hooks/useFetch';
import { CartVisualizer } from '../cart/CartVisualizer';


export const HomePage = () => {

    const [query, setQuery] = useState('');
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const fullUrl = `${urlBase}/api/v1/products${query}`;
    const { data, loading, error, setData } = useFetch(fullUrl);

    return (
        <div>
            <h1>Home page</h1>
            <CartVisualizer />
            <ProductFilter queryMinPrice={data?.priceRange?.min} queryMaxPrice={data?.priceRange?.max} onChange={(queryString) => setQuery(queryString)} />
            <ProductCardContainer
                Card={CatalogProductCard}
                products={data?.products || []}
                error={error}
                setProducts={(newProducts) => setData({ ...data, products: newProducts })}
            />

            {/* Pagination */}
        </div>
    );
};
