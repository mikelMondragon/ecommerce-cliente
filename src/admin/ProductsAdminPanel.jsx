import React, { useState } from 'react'
import { ProductCardContainer } from '../products/ProductCardContainer'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../products/ProductCard';
import ProductFilter from '../products/components/ProductFilter';
import { useFetch } from '../hooks/useFetch';


const ProductsAdminPanel = () => {
    const naviate = useNavigate();

    const [query, setQuery] = useState('');
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const fullUrl = `${urlBase}/api/v1/products${query}`;
    const { data, loading, error, setData } = useFetch(fullUrl);

    return (
        <div>
            <h1>Porducts admin panel</h1>
            <button onClick={() => naviate("/admin/createProduct")}>Create new product</button>
            <ProductFilter onChange={(queryString) => setQuery(queryString)} />
            <ProductCardContainer Card={ProductCard} data={data} error={error} setData={setData} />
            {/* Pagination */}
        </div>
    );
}

export default ProductsAdminPanel
