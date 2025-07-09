import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from "../cart/context/CartContext"

export const CatalogProductCard = ({ product, onClick, onCart }) => {
    const { addItem } = useCart();
    const imageUrl = product.images?.[0];
    const navigate = useNavigate();


    const handleCardClick = () => {
        navigate(`/${product._id}`);
        console.log("ID: ", id)
    }
    const handleCartClick = () => {
        addItem(product._id, 1, product);
    }

    return (
        <article
            onClick={handleCardClick}
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
                    //onCart(product._id);
                    handleCartClick();
                }}
            >
                Add to cart
            </button>
        </article>
    );
};
