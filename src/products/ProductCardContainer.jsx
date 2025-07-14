import React from 'react'

import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../utils/apiFetch';
import { useNavigate } from "react-router-dom";



export const ProductCardContainer = ({ Card, products = [], loading, error, setProducts, origin = "main" }) => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const navigate = useNavigate();
    console.log({ products })
    const handleDelete = async (id) => {
        try {
            await apiFetch(`${urlBase}/api/v1/products/${id}`, "DELETE");
            const newProducts = products.filter(p => p._id !== id);
            setProducts(newProducts);
        } catch (error) {
            toast.error('Error deleting product');
            console.log(error);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };

    return error ? (
        <p>Error: {error}</p>
    ) : (
        <section
            className={`${origin === "cart"
                ? "flex flex-col space-y-2 p-2 max-h-96 overflow-y-auto w-full"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen"
                }`}

        >
            {products.map(product => (
                <Card
                    key={`${origin}-${product._id}`}
                    product={product}
                    onCart={() => { }}
                    onDelete={handleDelete}
                    onClick={handleCardClick}
                />
            ))}
        </section>

    );
};

