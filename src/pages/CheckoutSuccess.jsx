import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from "../cart/context/CartContext";
import { apiFetch } from '../utils/apiFetch';

export const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const { clearCart } = useCart();

    useEffect(() => {
        const verifySession = async () => {
            try {
                const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
                const data = await apiFetch(`${urlBase}/api/v1/orders/session/${sessionId}`);

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
        </div>
    )
}
