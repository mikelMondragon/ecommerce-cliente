import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { ProductCardContainer } from '../products/ProductCardContainer';
import { CartProductCard } from './CartProductCard';
import { useNavigate } from 'react-router-dom';

export const CartVisualizer = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const totalAmount = cart?.reduce((acc, item) => acc + (item.productData.price * item.quantity), 0) ?? 0;
    const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

    const products = cart?.map(item => ({
        ...item.productData,
        quantity: item.quantity,
    })) ?? [];

    return (
        <div className="shopping-item bg-white shadow-lg rounded-md w-80 p-4 overflow-x-hidden">
            <div className="dropdown-cart-header flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                <span className="font-semibold text-gray-700">{totalItems} Item{totalItems !== 1 ? 's' : ''}</span>
                <a href="/cart" className="text-blue-600 hover:underline text-sm">View Cart</a>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto">
                {products.length > 0 ? (
                    products.map(product => (
                        <CartProductCard key={`cart-${product._id}`} product={product} />
                    ))
                ) : (
                    <p className="text-gray-400">Your cart is empty.</p>
                )}
            </div>

            <div className="bottom border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <div className="total font-semibold text-gray-700">Total</div>
                <div className="total-amount font-bold text-gray-900">${totalAmount.toFixed(2)}</div>
                <button
                    onClick={() => navigate('/checkout')}
                    className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Checkout
                </button>
            </div>
        </div>

    );
};
