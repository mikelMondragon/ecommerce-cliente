import React, { useState } from 'react'
import { ImageVisualizer } from './components/ImageVisualizer'
import { ConfiguratorVisualizer } from './components/ConfiguratorVisualizer';
import { QuantitySelector } from './components/QuantitySelector';
import { useCart } from '../cart/context/CartContext';
import { useNavigate } from 'react-router-dom';


const ProductVisualizer = ({ product }) => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [ammount, setAmmount] = useState(1);
    const slots = product?.models?.map((element) => ({
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
        addItem(product._id, ammount, product);
    }
    const onBuyNow = () => {
        addItem(product._id, ammount, product);
        navigate("/checkout")
    }

    return (
        <article className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div>
                <ImageVisualizer images={product.images.map(img => `${urlBase}/${img}`)} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <h3 className="text-2xl text-green-600 font-semibold mb-4">{product.price}€</h3>
                    <p className="text-gray-700 mb-6">{product.description}</p>

                    {slots.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-lg font-medium mb-2">Configuration</h4>
                            <ConfiguratorVisualizer slots={slots} />
                        </div>
                    )}

                    <div className="mb-6 flex flex-col items-center">
                        <h4 className="text-lg font-medium mb-2">Quantity</h4>
                        <QuantitySelector value={ammount} onChange={onAmmountChange} max={product.stock} />
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onAddToCart}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={onBuyNow}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </article>

    )
}

export default ProductVisualizer
