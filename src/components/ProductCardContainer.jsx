import React from 'react'
import { ProductCard } from './ProductCard'
import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../utils/apiFetch';
import { useNavigate } from "react-router-dom";



export const ProductCardContainer = () => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const fullUrl = `${urlBase}/api/v1/products`;
    const navigate = useNavigate();
    const { data, loading, error, setData } = useFetch(fullUrl);

    const handleDelete = async (id) => {
        try {
            const result = await apiFetch(`${urlBase}/api/v1/products/${id}`,
                "DELETE"
            )
            const newProducts = data.products.filter(element => element._id != id)
            const newData = { ...data, products: newProducts };
            setData(newData);

        } catch (error) {
            toast.error('Error getting products');
            console.log(error)
        }
    }

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
        console.log("ID: ", id)
    }

    return (
        loading
            ? <p>Cargando productos...</p>
            : error
                ? <p>Error: {error}</p>
                : (
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
                        {data.products?.map(product => (
                            <ProductCard key={product._id} product={product} onDelete={handleDelete} onClick={handleCardClick} />
                        ))}
                    </section>
                )
    )
}
