import React, { useState } from 'react';

export const SearchFilter = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        onSearch(search);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
                Search
            </button>
        </div>
    );
};
