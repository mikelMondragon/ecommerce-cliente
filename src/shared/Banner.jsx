import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Banner = ({ title, description, image }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/?category=${encodeURIComponent(title)}`);
    };

    return (
        <div className="w-full lg:w-1/3 px-3">
            <div
                className="single-banner relative h-64 rounded-lg overflow-hidden flex flex-col justify-center items-start px-6"
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className=" bg-opacity-50 p-4 rounded text-left">
                    <h2 className="text-black text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-800 mb-4 max-w-1/2 break-words">{description}</p>
                    <a
                        onClick={handleClick}
                        // href="/products?category=miniatures"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                    >
                        {`Shop ${title}`}
                    </a>
                </div>
            </div>
        </div>
    )
}
