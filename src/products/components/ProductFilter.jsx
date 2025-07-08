import React, { useState, useEffect } from 'react';
import { SearchFilter } from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import AvailableFilter from './AvailableFilter';
import { PriceFilter } from './PriceFilter';

const ProductFilter = ({ onChange, queryMinPrice, queryMaxPrice }) => {
    const [filters, setFilters] = useState({
        inStock: 'true', // Checked by default
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

    // Notify parent of query change
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
        <div className="p-4 bg-black rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Filters</h2>

            <AvailableFilter onChange={handleAvailableChange} defaultChecked />
            <SearchFilter onSearch={handleSearch} />
            <PriceFilter min={queryMinPrice} max={queryMaxPrice} onChange={handlePriceChange} />
            <CategoryFilter onCategorySelect={handleCategoryClick} selectedCategory={filters.category} />
        </div>
    );
};

export default ProductFilter;
