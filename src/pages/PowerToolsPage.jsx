// src/pages/PowerToolsPage.jsx
import { useState } from 'react';
import { WorkshopItems } from '../data/workshop';
import { Search, Star, ShoppingCart, Eye, TrendingUp, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductDetailModal from '../components/ProductDetailModal';

export default function PowerToolsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart, openCart } = useCart();
    const allItems = Object.values(WorkshopItems.items);

    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specifications.some(spec =>
            spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'popular':
            default:
                return b.sold - a.sold;
        }
    });

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

    const handleAddToCart = (item, e) => {
        e.stopPropagation();
        addToCart(item, 1);
        openCart();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-8 h-8" />
                            <h1 className="text-4xl md:text-5xl font-black">Power Tools Collection</h1>
                        </div>
                        <p className="text-xl text-orange-100 max-w-2xl">
                            Peralatan listrik profesional untuk semua kebutuhan workshop Anda. Garansi resmi & gratis ongkir!
                        </p>
                        <div className="mt-6 flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>{allItems.length} Produk Tersedia</span>
                            </div>
                            <div>★ Rating 4.8/5.0</div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-slate-100">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari mesin las, gerinda, bor, kompresor, dll..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium"
                            />
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none font-bold bg-white cursor-pointer"
                        >
                            <option value="popular">Terpopuler</option>
                            <option value="price-low">Harga Terendah</option>
                            <option value="price-high">Harga Tertinggi</option>
                            <option value="rating">Rating Tertinggi</option>
                        </select>

                        {/* View Toggle */}
                        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-600 font-medium">
                        Menampilkan <span className="font-bold text-orange-600">{sortedItems.length}</span> produk
                        {searchQuery && ` untuk "${searchQuery}"`}
                    </div>
                </div>

                {/* Products Display */}
                {sortedItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Produk tidak ditemukan</h3>
                        <p className="text-slate-600">Coba kata kunci lain atau lihat semua produk</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    // GRID VIEW
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200 transform hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedProduct(item)}
                            >
                                <div className="relative h-56 overflow-hidden bg-slate-100">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {item.discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            -{item.discount}%
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold text-slate-900">{item.rating}</span>
                                    </div>

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                                            <Eye className="w-5 h-5" />
                                            <span>Lihat Detail</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                        {item.category}
                                    </span>

                                    <h3 className="font-bold text-slate-900 mt-3 mb-2 text-lg line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                        <span>Terjual {item.sold}</span>
                                        <span>•</span>
                                        <span className="text-green-600 font-semibold">Stok: {item.stock}</span>
                                    </div>

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

                                    <button
                                        onClick={(e) => handleAddToCart(item, e)}
                                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>+ Keranjang</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // LIST VIEW
                    <div className="space-y-4">
                        {sortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 flex cursor-pointer"
                                onClick={() => setSelectedProduct(item)}
                            >
                                <div className="relative w-48 h-48 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {item.discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                                            -{item.discount}%
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                            <h3 className="font-bold text-slate-900 mt-2 text-xl">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-bold">{item.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                                    <div className="flex items-end justify-between mt-auto">
                                        <div>
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
                                            <p className="text-xs text-slate-500 mt-1">Terjual {item.sold} • Stok {item.stock}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProduct(item);
                                                }}
                                                className="px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-xl font-bold transition-all flex items-center gap-2"
                                            >
                                                <Eye className="w-5 h-5" />
                                                <span>Detail</span>
                                            </button>
                                            <button
                                                onClick={(e) => handleAddToCart(item, e)}
                                                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>+ Keranjang</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}