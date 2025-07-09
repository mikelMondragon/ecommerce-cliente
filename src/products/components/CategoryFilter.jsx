import React, { useState } from 'react'

export const CategoryFilter = ({ onCategorySelect }) => {
    const [selected, setSelected] = useState(null);
    const categories = ['Tools', 'Miniatures', 'Paints'];

    const handleClick = (category) => {
        if (selected === category) {
            setSelected(null);
            onCategorySelect(""); // 🔄 Deselect: remove filter
        } else {
            setSelected(category);
            onCategorySelect(category); // ✅ Select category
        }
    };

    return (
        <div>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleClick(cat)}
                    style={{
                        backgroundColor: selected === cat ? 'lightblue' : 'blue',
                        marginRight: '10px'
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter
