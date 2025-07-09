import React, { useState, useEffect } from 'react';

export const ImageVisualizer = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    // Set initial image when images prop changes
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    if (!selectedImage) return null;

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setSelectedImage(img)}
                        className={`w-20 h-20 object-cover cursor-pointer border rounded ${img === selectedImage ? 'border-blue-500' : 'border-gray-300'
                            }`}
                    />
                ))}
            </div>

            <div className="flex-1">
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full max-h-[500px] object-contain rounded-lg shadow"
                />
            </div>
        </div>
    );
};
