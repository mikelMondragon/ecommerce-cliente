import React from 'react'
import { ProductCardContainer } from '../products/ProductCardContainer';
import { useCart } from '../cart/context/CartContext';
import { apiFetch } from '../utils/apiFetch';
import { CartProductCard } from '../cart/CartProductCard';

export const CheckoutPage = () => {
    const { cart } = useCart();
    console.log({ cart })

    const products = cart.map(element => ({
        ...element.productData,
        quantity: element.quantity
    }))

    async function handleCheckout() {
        try {

            const data = await apiFetch('http://localhost:5000/api/v1/orders/createCheckoutSession', "POST", {}, products)

            if (data.url) {
                window.location.href = data.url; // Redirige a Stripe
            } else {
                // manejar error
                console.error('No URL in response');
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    }


    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            {cart.length > 0 ? (
                <>
                    <ProductCardContainer Card={CartProductCard} products={products} />
                    <button onClick={handleCheckout}>Checkout</button>
                </>
            ) : (
                <p className="text-gray-400">Your cart is empty.</p>
            )}
        </div>
    );
}
