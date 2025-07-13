import React, { useState, useEffect } from 'react';
import { SearchFilter } from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import AvailableFilter from './AvailableFilter';
import { PriceFilter } from './PriceFilter';

const ProductFilter = ({ onChange, queryMinPrice, queryMaxPrice }) => {
    const [filters, setFilters] = useState({
        inStock: 'true',
        minPrice: queryMinPrice,
        maxPrice: queryMaxPrice
    });

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            minPrice: queryMinPrice,
            maxPrice: queryMaxPrice,
        }));
    }, [queryMinPrice, queryMaxPrice]);

    const buildQueryString = (paramsObj) => {
        const sanitized = Object.fromEntries(
            Object.entries(paramsObj).filter(([_, v]) => v !== '' && v !== undefined && v !== null)
        );
        const params = new URLSearchParams(sanitized);
        return params.toString() ? `?${params.toString()}` : '';
    };

    useEffect(() => {
        if (onChange) onChange(buildQueryString(filters));
    }, [filters, onChange]);

    const handleSearch = (name) => {
        setFilters(prev => ({ ...prev, name }));
    };

    const handleCategoryClick = (category) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? '' : category
        }));
    };

    const handleAvailableChange = (isChecked) => {
        setFilters(prev => ({
            ...prev,
            inStock: isChecked ? 'true' : undefined
        }));
    };

    const handlePriceChange = ([min, max]) => {
        setFilters(prev => ({
            ...prev,
            minPrice: min,
            maxPrice: max
        }));
    };

    return (
        <div className="flex justify-center items-center w-full"> {/* 🔄 centrado horizontal (y vertical si se quiere) */}
            <div className="p-6 bg-white/5 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10 space-y-6 w-full max-w-md text-center">
                <h2 className="text-xl font-bold text-white tracking-wide">Filters</h2>

                <SearchFilter onSearch={handleSearch} />
                <AvailableFilter onChange={handleAvailableChange} defaultChecked />
                <PriceFilter min={queryMinPrice} max={queryMaxPrice} onChange={handlePriceChange} />
                <CategoryFilter onCategorySelect={handleCategoryClick} selectedCategory={filters.category} />
            </div>
        </div>
    );
};

export default ProductFilter;
