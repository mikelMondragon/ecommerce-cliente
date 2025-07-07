import React, { useState } from 'react';
import { SearchFilter } from '../products/components/SearchFilter'
import { ProductCardContainer } from '../products/ProductCardContainer'

const HomePage = () => {
    const [queryString, setQueryString] = useState('');
    return (
        <div>
            <h1>Home page</h1>
            <SearchFilter onSearch={(query) => setQueryString(`?name=${query}`)} />
            <ProductCardContainer queries={queryString} />
        </div>
    )
}

export default HomePage
