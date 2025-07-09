import React, { useState } from 'react'
import { QuantitySelector } from '../products/components/QuantitySelector';
import { useCart } from './context/CartContext';

export const CartProductCard = ({ product }) => {
    const imageUrl = product?.images?.[0];
    const [ammount, setAmmount] = useState(1);
    const { addItem, removeItem } = useCart()

    const onAmmountChange = (newAmmount) => {
        if (newAmmount > 0) {
            const dif = newAmmount - ammount
            setAmmount(newAmmount)
            addItem(product._id, dif, product)
        }
        else {
            removeItem(product._id)
        }

    }

    return (
        <article
            className="bg-orange-800">
            {imageUrl && (
                <img
                    src={`${import.meta.env.VITE_SERVER_URL_BASE}/${imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                />
            )}
            <p className="bg-black">{product.price}</p>
            <QuantitySelector value={ammount} onChange={onAmmountChange} min={0} max={product.stock} />
        </article>
    )
}

