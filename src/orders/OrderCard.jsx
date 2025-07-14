import React from 'react';

export const OrderCard = ({ orderData }) => {
    const {
        user,
        products,
        total,
        currency,
        stripeSessionId,
        paymentStatus,
        createdAt,
        shippingAddress
    } = orderData;

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-6 space-y-4 border">
            <h2 className="text-2xl font-bold text-green-600">Order Summary</h2>

            <div className="text-sm text-gray-600">
                <p><span className="font-semibold">Order ID:</span> {stripeSessionId}</p>
                <p><span className="font-semibold">User:</span> {user}</p>
                <p><span className="font-semibold">Status:</span>
                    <span className={`ml-1 font-medium ${paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                        {paymentStatus}
                    </span>
                </p>
                <p><span className="font-semibold">Date:</span> {new Date(createdAt).toLocaleString()}</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p>{shippingAddress.line1}</p>
                {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                <p>{shippingAddress.postal_code}, {shippingAddress.city}</p>
                <p>{shippingAddress.state}, {shippingAddress.country}</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                <ul className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                            </div>
                            <p className="font-semibold">
                                {(product.price * product.quantity).toFixed(2)} {currency.toUpperCase()}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="text-right">
                <p className="text-xl font-bold">Total: {total.toFixed(2)} {currency.toUpperCase()}</p>
            </div>
        </div>
    );
};
