import React from 'react'
import { SearchFilter } from '../products/components/SearchFilter'
import { ProductCardContainer } from '../products/ProductCardContainer'

const HomePage = () => {
    return (
        <div>
            <h1>Home page</h1>
            <SearchFilter />
            <ProductCardContainer queries='/' />
        </div>
    )
}

export default HomePage
