// src/components/home/FeaturedToolsSection.jsx
import { Star, ShoppingCart, Eye, Wrench } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedToolsSection({ featuredTools, onNavigate, onViewDetail }) {
    const [visibleTools, setVisibleTools] = useState(new Set());
    const toolRefs = useRef([]);

    useEffect(() => {
        const observerTools = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    setTimeout(() => {
                        setVisibleTools(prev => new Set(prev).add(index));
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        toolRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.dataset.index = index;
                observerTools.observe(ref);
            }
        });

        return () => {
            observerTools.disconnect();
        };
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const calculateDiscount = (price, discount) => {
        return price - (price * discount / 100);
    };

    return (
        <section className="py-12">
            {/* Header with different design */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Wrench className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Hand Tools Pilihan</h2>
                    </div>
                    <p className="text-slate-600 font-medium">Peralatan tangan untuk pekerjaan presisi</p>
                </div>
                <button
                    onClick={() => onNavigate('tools')}
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <span>Lihat Semua</span>
                    <Eye className="w-5 h-5" />
                </button>
            </div>

            {/* Horizontal Scroll Layout - Different from workshop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredTools.map((tool, index) => (
                    <div
                        key={tool.id}
                        ref={el => toolRefs.current[index] = el}
                        className={`group transform transition-all duration-700 ${visibleTools.has(index)
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-8 opacity-0'
                            }`}
                    >
                        {/* HORIZONTAL CARD LAYOUT - Different design */}
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 flex">

                            {/* Left - Image (Square) */}
                            <div className="relative w-48 h-full bg-slate-100 flex-shrink-0">
                                <img
                                    src={tool.image_url}
                                    alt={tool.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80';
                                    }}
                                />

                                {/* Discount Badge */}
                                {tool.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        -{tool.discount}%
                                    </div>
                                )}

                                {/* Hover View Detail */}
                                <button
                                    onClick={() => onViewDetail(tool)}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                                >
                                    <div className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        <span>Detail</span>
                                    </div>
                                </button>
                            </div>

                            {/* Right - Content */}
                            <div className="flex-1 p-5 flex flex-col">
                                <div className="mb-2">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {tool.category}
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-900 mb-2 text-base line-clamp-2 group-hover:text-blue-600 transition-colors flex-grow">
                                    {tool.name}
                                </h3>

                                {/* Rating & Sold */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold text-slate-900">{tool.rating}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs text-slate-600">Terjual {tool.sold}</span>
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    {tool.discount > 0 ? (
                                        <div>
                                            <div className="text-xs text-slate-400 line-through">
                                                {formatPrice(tool.price)}
                                            </div>
                                            <div className="text-xl font-black text-blue-600">
                                                {formatPrice(calculateDiscount(tool.price, tool.discount))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-xl font-black text-slate-900">
                                            {formatPrice(tool.price)}
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Beli Sekarang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View All Button */}
            <div className="md:hidden mt-6">
                <button
                    onClick={() => onNavigate('tools')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg"
                >
                    <span>Lihat Semua Hand Tools</span>
                    <Eye className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
}