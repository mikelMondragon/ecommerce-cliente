import React from 'react';
import { Banner } from './Banner';

export const CategoriesBanners = () => {
    return (
        <section className="banner section px-4 py-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-wrap -mx-3">




                    {/* Miniatures */}
                    <Banner title={"Tools"} description={"High quality tools for all your projects."} image={"assets/images/banner/banner-1-bg.jpg"} />
                    <Banner title={"Paints"} description={"Premium paints for your miniatures and models."} image={"assets/images/banner/banner-1-bg.jpg"} />
                    <Banner title={"Miniatures"} description={"Collectible miniatures for your gaming adventures."} image={"assets/images/banner/banner-1-bg.jpg"} />
                    {/* <div className="w-full lg:w-1/3 px-3">
                        <div
                            className="single-banner relative h-64 rounded-lg overflow-hidden flex flex-col justify-center items-start px-6"
                            style={{
                                backgroundImage: "url('assets/images/banner/banner-1-bg.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className=" bg-opacity-50 p-4 rounded text-left">
                                <h2 className="text-black text-2xl font-bold mb-2">Miniatures</h2>
                                <p className="text-gray-800 mb-4 max-w-1/2 break-words">Collectible miniatures for your gaming adventures.</p>
                                <a
                                    href="/products?category=miniatures"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                                >
                                    Shop Miniatures
                                </a>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    );
};
