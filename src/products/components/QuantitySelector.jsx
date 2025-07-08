import React from 'react';

export const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
    const handleDecrease = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrease = () => {
        if (value < max) onChange(value + 1);
    };

    const handleInputChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
            onChange(Math.min(Math.max(val, min), max));
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
                -
            </button>
            <input
                type="number"
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
                className="w-16 text-center border rounded"
            />
            <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
                +
            </button>
        </div>
    );
};
