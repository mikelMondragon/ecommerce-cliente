import React, { useContext } from 'react';
import { useCart } from './context/CartContext'
import { ProductCardContainer } from '../products/ProductCardContainer';
import { CartProductCard } from './CartProductCard';
import { useNavigate } from 'react-router-dom';


export const CartVisualizer = () => {
    const { cart } = useCart();
    console.log({ cart })
    const naveigate = useNavigate()
    // const products = cart.items.map(item => ({
    //     ...item.product,
    //     quantity: item.quantity
    // }));
    const products = cart?.map(element => element.productData)

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            {cart?.length > 0 ? (
                <>
                    <ProductCardContainer Card={CartProductCard} products={products} />
                    <button onClick={() => naveigate("/checkout")}>Checkout</button>
                </>
            ) : (
                <p className="text-gray-400">Your cart is empty.</p>
            )}
        </div>
    );
};
