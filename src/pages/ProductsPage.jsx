import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch';
import ProductFilter from '../products/components/ProductFilter';
import { ProductCardContainer } from '../products/ProductCardContainer';
import { CatalogProductCard } from '../products/CatalogProductCard';
import { useParams, useSearchParams } from 'react-router-dom';

export const ProductsPage = () => {

    const [searchParams] = useSearchParams();
    const initialQuery = `?name=${searchParams.get("name")}`;
    const [query, setQuery] = useState(initialQuery);
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const fullUrl = `${urlBase}/api/v1/products${query}`;
    const { data, loading, error, setData } = useFetch(fullUrl);
    console.log({ query })
    return (
        <div>
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
}
