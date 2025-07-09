import React, { useState } from 'react'
import { ImageVisualizer } from './components/ImageVisualizer'
import { ConfiguratorVisualizer } from './components/ConfiguratorVisualizer';
import { QuantitySelector } from './components/QuantitySelector';


const ProductVisualizer = ({ product }) => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const [ammount, setAmmount] = useState(1);
    const slots = product.models.map((element) => ({
        slot: element.slot,
        files: element.files,
        previews: element.files.filter(file => file != "").map(file => ({
            url: `${urlBase}/${file.replace(/\\/g, '/')}`
        }))
    }))

    const onAmmountChange = (newAmmount) => {
        setAmmount(newAmmount)
    }

    const onAddToCart = () => {

    }
    const onBuyNow = () => {

    }

    return (
        <article>
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
            <ImageVisualizer images={product.images.map
                (img => urlBase + "/" + img)} />

            {slots.length > 0 && <ConfiguratorVisualizer slots={slots} />}
            <QuantitySelector value={ammount} onChange={onAmmountChange} max={product.stock} />
            <button onClick={onAddToCart}>add to cart</button>
            <button onClick={onBuyNow}>buy now</button>
        </article>
    )
}

export default ProductVisualizer
