import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Footer Top */}
            <div className="py-10 border-b border-gray-700">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <a href="/">
                            <img src="/logo.svg" alt="Logo" className="h-12" />
                        </a>
                    </div>
                    <div className="md:w-2/3">
                        <h4 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h4>
                        <span className="block mb-4 text-sm text-gray-400">
                            Get all the latest information, Sales and Offers.
                        </span>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                name="EMAIL"
                                placeholder="Email address here..."
                                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Middle */}
            <div className="py-16 border-b border-gray-700">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Get In Touch With Us</h3>
                        <p className="text-sm mb-2">Phone: +1 (900) 33 169 7720</p>
                        <ul className="text-sm space-y-1">
                            <li><span>Monday-Friday:</span> 9.00 am - 8.00 pm</li>
                            <li><span>Saturday:</span> 10.00 am - 6.00 pm</li>
                        </ul>
                        <p className="mt-2 text-sm">
                            <a href="mailto:support@shopgrids.com" className="hover:underline">support@shopgrids.com</a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Our Mobile App</h3>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded">
                                <i className="lni lni-apple"></i>
                                <div>
                                    <div className="text-xs">Download on the</div>
                                    <div className="text-sm font-bold">App Store</div>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded">
                                <i className="lni lni-play-store"></i>
                                <div>
                                    <div className="text-xs">Download on the</div>
                                    <div className="text-sm font-bold">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Information</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Downloads</a></li>
                            <li><a href="#" className="hover:underline">Sitemap</a></li>
                            <li><a href="#" className="hover:underline">FAQs Page</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Shop Departments</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:underline">Computers & Accessories</a></li>
                            <li><a href="#" className="hover:underline">Smartphones & Tablets</a></li>
                            <li><a href="#" className="hover:underline">TV, Video & Audio</a></li>
                            <li><a href="#" className="hover:underline">Cameras, Photo & Video</a></li>
                            <li><a href="#" className="hover:underline">Headphones</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-400">
                        We Accept: <img src="assets\images\footer\credit-cards-footer.png" alt="Payments" className="inline-block h-6 ml-2" />
                    </div>
                    <div className="text-sm text-gray-400">
                        Designed and Developed by{' '}
                        <a
                            href="https://graygrids.com/"
                            target="_blank"
                            rel="nofollow"
                            className="text-white hover:underline"
                        >
                            Mikel Mondragon
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Follow Us On:</span>
                        <a href="#" className="text-white"><i className="lni lni-facebook-filled"></i></a>
                        <a href="#" className="text-white"><i className="lni lni-twitter-original"></i></a>
                        <a href="#" className="text-white"><i className="lni lni-instagram"></i></a>
                        <a href="#" className="text-white"><i className="lni lni-google"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}



