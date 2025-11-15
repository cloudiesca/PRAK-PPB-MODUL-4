// src/components/home/FeaturedWorkshopSection.jsx
import { Star, ShoppingCart, Eye, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedWorkshopSection({ featuredItems, onNavigate, onViewDetail }) {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const itemRefs = useRef([]);

    useEffect(() => {
        const observerItems = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);
                    setTimeout(() => {
                        setVisibleItems(prev => new Set(prev).add(index));
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        itemRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.dataset.index = index;
                observerItems.observe(ref);
            }
        });

        return () => {
            observerItems.disconnect();
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-8 h-8 text-orange-600" />
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Power Tools Terlaris</h2>
                    </div>
                    <p className="text-slate-600 font-medium">Peralatan listrik berkualitas dengan harga terbaik</p>
                </div>
                <button
                    onClick={() => onNavigate('workshop')}
                    className="hidden md:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <span>Lihat Semua</span>
                    <Eye className="w-5 h-5" />
                </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.map((item, index) => (
                    <div
                        key={item.id}
                        ref={el => itemRefs.current[index] = el}
                        className={`group transform transition-all duration-700 ${visibleItems.has(index)
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                            }`}
                    >
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200">

                            {/* Image */}
                            <div className="relative h-56 overflow-hidden bg-slate-100">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80';
                                    }}
                                />

                                {/* Badges */}
                                {item.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        -{item.discount}%
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-bold text-slate-900">{item.rating}</span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => onViewDetail(item)}
                                        className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-xl"
                                    >
                                        <Eye className="w-5 h-5" />
                                        <span>Lihat Detail</span>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-3">
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-900 mb-2 text-lg line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
                                    {item.name}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                    <span>Terjual {item.sold}</span>
                                    <span>•</span>
                                    <span className="text-green-600 font-semibold">Stok: {item.stock}</span>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    {item.discount > 0 ? (
                                        <div>
                                            <div className="text-sm text-slate-400 line-through">
                                                {formatPrice(item.price)}
                                            </div>
                                            <div className="text-2xl font-black text-orange-600">
                                                {formatPrice(calculateDiscount(item.price, item.discount))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-2xl font-black text-slate-900">
                                            {formatPrice(item.price)}
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Tambah Keranjang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View All Button */}
            <div className="md:hidden mt-6">
                <button
                    onClick={() => onNavigate('workshop')}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg"
                >
                    <span>Lihat Semua Power Tools</span>
                    <Eye className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
}