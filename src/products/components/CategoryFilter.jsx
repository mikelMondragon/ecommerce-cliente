import React, { useState } from 'react';

export const CategoryFilter = ({ onCategorySelect }) => {
    const [selected, setSelected] = useState(null);
    const categories = ['Tools', 'Miniatures', 'Paints'];

    const handleClick = (category) => {
        if (selected === category) {
            setSelected(null);
            onCategorySelect('');
        } else {
            setSelected(category);
            onCategorySelect(category);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleClick(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${selected === cat
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
