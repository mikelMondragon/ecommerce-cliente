import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../cart/context/CartContext";

export const CatalogProductCard = ({ product }) => {
    const { addItem } = useCart();
    const imageUrl = product.images?.[0];
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleCartClick = (e) => {
        e.stopPropagation();
        addItem(product._id, 1, product);
    };

    return (
        <article
            onClick={handleCardClick}
            className="bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition cursor-pointer max-w-xs"
        >
            {/* Image + Add to Cart button overlay */}
            <div className="relative group">
                <img
                    src={`${import.meta.env.VITE_SERVER_URL_BASE}/${imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={handleCartClick}
                        className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold hover:bg-gray-100"
                    >
                        <i className="lni lni-cart text-lg"></i> Add to Cart
                    </button>
                </div>
            </div>

            {/* Info section */}
            <div className="p-4 text-center">
                <span className="text-xs text-gray-500">{product.category || "Category"}</span>
                <h4 className="text-md font-semibold text-gray-800 mt-1 hover:text-blue-600">
                    {product.name}
                </h4>

                {/* Review stars */}
                <ul className="flex justify-center items-center text-yellow-400 text-sm mt-2 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                            <i className={`lni ${i < product.rating ? 'lni-star-filled' : 'lni-star'}`} />
                        </li>
                    ))}
                    <li>
                        <span className="text-xs text-gray-500 ml-2">{product.rating?.toFixed(1) || "0.0"} Review(s)</span>
                    </li>
                </ul>

                {/* Price */}
                <div className="price mt-2">
                    <span className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                </div>
            </div>
        </article>
    );
};
