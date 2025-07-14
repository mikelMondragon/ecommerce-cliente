import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product, onDelete }) => {
    const imageUrl = product.images?.[0];
    const navigate = useNavigate();

    const handleCardClick = () => {
        console.log("ID: ", product._id)
        navigate(`/admin-dashboard/edit-product/${product._id}`);
    }

    return (
        <article
            onClick={() => handleCardClick()}
            className="bg-white shadow-md rounded-md p-4 flex flex-col items-center max-w-xs mx-auto"
        >
            <h4 className="text-lg font-semibold mb-3 text-center text-black">{product.name}</h4>
            {imageUrl && (
                <img
                    src={`${import.meta.env.VITE_SERVER_URL_BASE}/${imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                />
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product._id);
                }}
            >
                Delete
            </button>
        </article>
    );
};
