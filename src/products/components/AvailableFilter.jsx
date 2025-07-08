import React, { useState } from 'react'

const AvailableFilter = ({ onChange }) => {
    const [available, setAvailable] = useState(true); // ✅ Checked by default

    const handleToggle = () => {
        const newValue = !available;
        setAvailable(newValue);
        onChange(newValue);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={available}
                onChange={handleToggle}
            />
            Only show available products
        </label>
    );
};

export default AvailableFilter
