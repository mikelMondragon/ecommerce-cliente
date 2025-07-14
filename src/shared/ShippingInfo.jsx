import React from 'react'

export const ShippingInfo = () => {
    const items = [
        {
            icon: "lni-delivery",
            title: "Free Shipping",
            subtitle: "On order over $99",
        },
        {
            icon: "lni-support",
            title: "24/7 Support.",
            subtitle: "Live Chat Or Call.",
        },
        {
            icon: "lni-credit-cards",
            title: "Online Payment.",
            subtitle: "Secure Payment Services.",
        },
        {
            icon: "lni-reload",
            title: "Easy Return.",
            subtitle: "Hassle Free Shopping.",
        },
    ];

    return (
        <section className="shipping-info py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <ul className="flex flex-col md:flex-row md:justify-between gap-6">
                    {items.map(({ icon, title, subtitle }, idx) => (
                        <li key={idx} className="flex items-center space-x-4">
                            <div className="media-icon text-4xl text-blue-600">
                                <i className={`lni ${icon}`}></i>
                            </div>
                            <div className="media-body">
                                <h5 className="text-lg font-semibold">{title}</h5>
                                <span className="text-gray-600 text-sm">{subtitle}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
