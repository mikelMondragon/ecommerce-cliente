import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from "../cart/context/CartContext";
import { apiFetch } from '../utils/apiFetch';
import { OrderCard } from '../orders/OrderCard';

export const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const { clearCart } = useCart();
    const [orderData, setOrderData] = useState({})
    useEffect(() => {
        const verifySession = async () => {
            try {
                const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
                const data = await apiFetch(`${urlBase}/api/v1/orders/session/${sessionId}`);
                setOrderData(data);
                console.log("sesion data: ", data)
                if (data?.paymentStatus === 'paid') {
                    clearCart()
                } else {
                    console.warn('Session not valid or not paid.')
                }
            } catch (err) {
                console.error('Error verifying Stripe session:', err)
            }
        }

        if (sessionId) verifySession()
    }, [sessionId])

    return (
        <div>
            <h2>¡Pago exitoso! Gracias por tu compra.</h2>
            {orderData.paymentStatus === 'paid' && <OrderCard orderData={orderData} />}
        </div>
    )
}
