import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

export const PriceFilter = ({ min = 0, max = 1000, onChange }) => {
    const [values, setValues] = useState([min, max]);

    useEffect(() => {
        setValues([min, max]);
    }, [min, max]);

    const handleChange = (newValues) => {
        setValues(newValues);
        onChange?.(newValues);
    };

    return (
        <div className="w-full max-w-md mx-auto py-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Price Filter</h3>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Min: ${values[0]}</span>
                <span className="text-gray-600">Max: ${values[1]}</span>
            </div>
            <ReactSlider
                className="relative w-full h-2"
                thumbClassName="w-5 h-5 bg-blue-500 rounded-full shadow-md cursor-pointer -top-1"
                renderTrack={(props, state) => {
                    const { key, ...rest } = props;
                    const base = "absolute h-2 rounded-md";
                    let bgColor = "bg-white";
                    if (state.index === 1) bgColor = "bg-blue-500";

                    return <div key={key} {...rest} className={`${base} ${bgColor}`} />;
                }}
                value={values}
                onChange={handleChange}
                min={min}
                max={max}
                pearling
                minDistance={1}
            />
        </div>
    );
};
