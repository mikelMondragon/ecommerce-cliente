import React from 'react'

import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../utils/apiFetch';
import { useNavigate } from "react-router-dom";



export const ProductCardContainer = ({ Card, queries = "", data, loading, error, setData }) => {

    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const navigate = useNavigate();
    console.log("conatiner data: ", data)
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

    const handleCart = (id) => {

    }

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
        console.log("ID: ", id)
    }

    return ( //Loading da un efecto extraño
        error
            ? <p>Error: {error}</p>
            : (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
                    {data?.products?.map(product => (
                        <Card key={product._id} product={product} onCart={handleCart} onDelete={handleDelete} onClick={handleCardClick} />
                    ))}
                </section>
            )
    )
}
