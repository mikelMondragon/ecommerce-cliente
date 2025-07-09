import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();
const localStorageKey = 'cart';
const initialState = () => {
    const returnValue = JSON.parse(localStorage.getItem(localStorageKey)) || {
        items: []
    }
    console.log({ returnValue })
    return returnValue
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existing = state.items.find(item => item.productId === action.payload.productId);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.productId === action.payload.productId
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                };
            } else {

                return {
                    ...state,
                    items: [...state.items, action.payload]
                };
            }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.productId !== action.payload)
            };

        case 'CLEAR_CART':
            return initialState();

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState());

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [state]);

    const addItem = (productId, quantity, productData) => {

        dispatch({ type: 'ADD_ITEM', payload: { productId, quantity, productData } });
    };

    const removeItem = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            cart: state.items,
            addItem,
            removeItem,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
