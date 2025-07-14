import React from 'react'

export const Hero = () => {
    return (
        <section className="hero-area py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Left Slider */}
                    <div className="w-full lg:w-8/12 px-4 mb-8 lg:mb-0">
                        <div className="slider-head space-y-6">
                            {/* Slider 1 */}
                            <div
                                className="rounded-xl bg-cover bg-center p-8 text-white h-[400px] flex flex-col justify-center"
                                style={{ backgroundImage: "url(/assets/images/hero/warhammer40k-1.jpg)" }}
                            >
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    <span className="block text-yellow-400 text-base">No restocking fee (35€ savings)</span>
                                    Warhammer 40k plague
                                </h2>
                                <p className="my-4 max-w-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <h3 className="text-xl">
                                    <span className="font-light">Now Only</span> $320.99
                                </h3>
                                <a href="/products" className="btn mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                                    Shop Now
                                </a>
                            </div>

                            {/* Slider 2 */}
                            <div
                                className="rounded-xl bg-cover bg-center p-8 text-white h-[400px] flex flex-col justify-center"
                                style={{ backgroundImage: "url(/assets/images/hero/warhammer40k-2.jpg)" }}
                            >
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    <span className="block text-yellow-400 text-base">Big Sale Offer</span>
                                    Get the Best Deal on W40K Death watch
                                </h2>
                                <p className="my-4 max-w-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <h3 className="text-xl">
                                    <span className="font-light">Combo Only:</span> $590.00
                                </h3>
                                <a href="/products" className="btn mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Banners */}
                    <div className="w-full lg:w-4/12 px-4 space-y-6">
                        {/* Banner 1 */}
                        <div
                            className="hero-small-banner rounded-xl bg-cover bg-center p-6 text-white h-[190px] flex flex-col justify-center"
                            style={{ backgroundImage: "url(/assets/images/hero/warhammer40k-3.jpg)" }}
                        >
                            <h2 className="text-xl md:text-2xl font-bold">
                                <span className="block text-yellow-300 text-base">New line required</span>
                                W40K Orcs
                            </h2>
                            <h3 className="text-lg mt-2">$259.99</h3>
                        </div>

                        {/* Banner 2 */}
                        <div className="hero-small-banner style2 bg-white border rounded-xl p-6 shadow">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Weekly Sale!</h2>
                            <p className="my-3 text-gray-600">
                                Saving up to 50% off all online store items this week.
                            </p>
                            <a href="/products" className="btn bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

