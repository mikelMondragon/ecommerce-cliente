import React, { useState } from 'react';

export const SearchFilter = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (!search.trim()) return;
        onSearch(search);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};