import React from 'react'
import { ImageVisualizer } from './components/ImageVisualizer'
import { ConfiguratorVisualizer } from './components/ConfiguratorVisualizer';
import { QuantitySelector } from './components/QuantitySelector';


const ProductVisualizer = ({ product }) => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const slots = product.models.map((element) => ({
        slot: element.slot,
        files: element.files,
        previews: element.files.filter(file => file != "").map(file => ({
            url: `${urlBase}/${file.replace(/\\/g, '/')}`
        }))
    }))

    return (
        <article>
            <h1>{product.name}</h1>
            <ImageVisualizer images={product.images.map
                (img => urlBase + "/" + img)} />

            {slots.length > 0 && <ConfiguratorVisualizer slots={slots} />}
            <QuantitySelector />
        </article>
    )
}

export default ProductVisualizer
