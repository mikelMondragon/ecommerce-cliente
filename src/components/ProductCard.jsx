import React from 'react'

export const ProductCard = ({ product }) => {
    const imageUrl = product.images?.length > 0 ? product.images[0] : "";
    return (
        <article className="bg-white shadow-md rounded-md p-4 flex flex-col items-center max-w-xs mx-auto">
            <h4 className="text-lg font-semibold mb-3 text-center text-black">{product.name}</h4>
            {imageUrl && (
                <img
                    src={`${import.meta.env.VITE_SERVER_URL_BASE}/${imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                />
            )}
        </article>
    )
}
