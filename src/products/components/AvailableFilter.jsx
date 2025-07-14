import React, { useState } from 'react';

const AvailableFilter = ({ onChange }) => {
    const [available, setAvailable] = useState(true);

    const handleToggle = () => {
        const newValue = !available;
        setAvailable(newValue);
        onChange(newValue);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                id="available-checkbox"
                type="checkbox"
                checked={available}
                onChange={handleToggle}
                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="available-checkbox" className="text-sm text-black select-none">
                Only show available products
            </label>
        </div>
    );
};

export default AvailableFilter;
