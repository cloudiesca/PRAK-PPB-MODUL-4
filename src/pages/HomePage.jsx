// src/pages/HomePage.jsx
import { useState } from 'react';
import { WorkshopItems } from '../data/workshop';
import { HandTools } from '../data/tools';
import HeroSection from '../components/home/HeroSection';
import FeaturedWorkshopSection from '../components/home/FeaturedWorkshopSection';
import FeaturedToolsSection from '../components/home/FeaturedToolsSection';
import ProductDetailModal from '../components/ProductDetailModal';

export default function HomePage({ onNavigate }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const featuredWorkshop = Object.values(WorkshopItems.items).slice(0, 3);
    const featuredTools = Object.values(HandTools.items).slice(0, 2);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <HeroSection onNavigate={onNavigate} />

            <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 pb-20 md:pb-8">
                <FeaturedWorkshopSection
                    featuredItems={featuredWorkshop}
                    onNavigate={onNavigate}
                    onViewDetail={setSelectedProduct}
                />
                <FeaturedToolsSection
                    featuredTools={featuredTools}
                    onNavigate={onNavigate}
                    onViewDetail={setSelectedProduct}
                />
            </main>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}