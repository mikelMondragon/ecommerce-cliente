import React, { useState } from 'react';

export const SearchFilter = () => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (!search.trim()) return;
        console.log("🔍 Searching for:", search);
        // Aquí podrías hacer algo como:
        // navigate(`/products?name=${search}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};