import React from 'react'
import { OrderCard } from '../orders/OrderCard';
import { useFetch } from '../hooks/useFetch';

export const UserOrders = () => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const fullUrl = `${urlBase}/api/v1/orders/userOrders`;
    const { data, loading, error, setData } = useFetch(fullUrl);
    console.log("orders: ", data.orders)
    return (
        <div>
            <h2>User Orders</h2>
            {Array.isArray(data?.orders) && data.orders.map(order => (
                <OrderCard key={order._id} orderData={order} />
            ))}
        </div>


    )
}
