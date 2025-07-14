import React, { useState } from 'react'
import { QuantitySelector } from '../products/components/QuantitySelector'
import { useCart } from './context/CartContext'

export const CartProductCard = ({ product }) => {
    const imageUrl = product?.images?.[0]
    const { addItem, removeItem, getItemAmmount } = useCart()
    const ammount = getItemAmmount(product._id)

    const onAmmountChange = (newAmmount) => {
        if (newAmmount > 0) {
            const dif = newAmmount - ammount
            addItem(product._id, dif, product)
        } else {
            removeItem(product._id)
        }
    }

    return (
        <article className="flex items-center space-x-2 w-full">
            {/* Remove button */}
            <button
                onClick={() => removeItem(product._id)}
                title="Remove this item"
                className="text-gray-400 hover:text-red-600 transition p-1"
            >
                <i className="lni lni-close text-lg"></i>
            </button>

            {/* Image */}
            <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                {imageUrl ? (
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL_BASE}/${imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>

            {/* Textual content */}
            <div className="min-w-0 max-w-[calc(100%-7rem)]">
                <h4 className="text-sm font-semibold text-gray-900">
                    <a href={`/product-details/${product._id}`} className="hover:text-blue-600">
                        {product.name}
                    </a>
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                    {ammount}x - <span className="font-semibold">€{(product.price * ammount).toFixed(2)}</span>
                </p>
            </div>

            {/* Quantity Selector */}
            <div className="w-20">
                <QuantitySelector value={ammount} onChange={onAmmountChange} min={0} max={product.stock} />
            </div>
        </article>
    )
}
