import React, { useState } from 'react'
import ProductVisualizer from '../products/ProductVisualizer';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const ProductPage = () => {
    const { id } = useParams();
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const { data, loading, error } = useFetch(`${urlBase}/api/v1/products/${id}`);

    if (!data) return <p>Loading...</p>;
    if (data) console.log(data)
    return (
        loading
            ? <p>Cargando producto...</p>
            : error
                ? <p>Error: {error}</p>
                : (
                    <ProductVisualizer
                        product={data.product}
                    />
                )
    );

}

export default ProductPage
