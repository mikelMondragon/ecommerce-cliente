import React from 'react';
import { Banner } from './Banner';

export const CategoriesBanners = () => {
    return (
        <section className="banner section px-4 py-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-wrap -mx-3">




                    {/* Miniatures */}
                    <Banner title={"Tools"} description={"High quality tools for all your projects."} image={"assets/images/banner/banner-1-bg.jpg"} />
                    <Banner title={"Paints"} description={"Premium paints for your miniatures and models."} image={"assets/images/banner/banner-paints.png"} />
                    <Banner title={"Miniatures"} description={"Collectible miniatures for your gaming adventures."} image={"assets/images/banner/banner-1-bg.jpg"} />


                </div>
            </div>
        </section>
    );
};
