import React from 'react'
import { ProductCardContainer } from '../products/ProductCardContainer'
import { useNavigate } from 'react-router-dom'

const ProductsAdminPanel = () => {
    const naviate = useNavigate();
    return (
        <div>
            <h1>Porducts admin panel</h1>
            <button onClick={() => naviate("/admin/createProduct")}>Create new product</button>
            <ProductCardContainer />
        </div>
    )
}

export default ProductsAdminPanel
