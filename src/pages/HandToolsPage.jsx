// src/pages/HandToolsPage.jsx
import { useState } from 'react';
import { HandTools } from '../data/tools';
import { Search, Star, ShoppingCart, Eye, Hammer, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductDetailModal from '../components/ProductDetailModal';

export default function HandToolsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart, openCart } = useCart();
    const allTools = Object.values(HandTools.items);

    const filteredTools = allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.specifications.some(spec =>
            spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedTools = [...filteredTools].sort((a, b) => {
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

    const handleAddToCart = (tool, e) => {
        e.stopPropagation();
        addToCart(tool, 1);
        openCart();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-20">
                        <Hammer className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Hammer className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black">Hand Tools Collection</h1>
                        </div>
                        <p className="text-xl text-blue-100 max-w-2xl mb-6">
                            Peralatan tangan berkualitas tinggi untuk pekerjaan presisi. Pilihan profesional dengan harga terjangkau.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold">
                                ✓ Kualitas Premium
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold">
                                ✓ Garansi Resmi
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold">
                                ✓ Harga Bersaing
                            </div>
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
                                placeholder="Cari kunci, tang, obeng, palu, meteran, dll..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-all font-medium"
                            />
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-bold bg-white cursor-pointer"
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
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-600 font-medium">
                        Menampilkan <span className="font-bold text-blue-600">{sortedTools.length}</span> produk
                        {searchQuery && ` untuk "${searchQuery}"`}
                    </div>
                </div>

                {/* Products Display */}
                {sortedTools.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Produk tidak ditemukan</h3>
                        <p className="text-slate-600">Coba kata kunci lain atau lihat semua produk</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    // GRID VIEW
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sortedTools.map((tool) => (
                            <div
                                key={tool.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 cursor-pointer"
                                onClick={() => setSelectedProduct(tool)}
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <img
                                        src={tool.image_url}
                                        alt={tool.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {tool.discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                            -{tool.discount}%
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <Eye className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <div className="p-4">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {tool.category}
                                    </span>
                                    <h3 className="font-bold text-slate-900 mt-2 mb-2 text-sm line-clamp-2 min-h-[2.5rem]">
                                        {tool.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold">{tool.rating}</span>
                                        <span className="text-xs text-slate-500">({tool.sold})</span>
                                    </div>
                                    <div className="mb-3">
                                        {tool.discount > 0 ? (
                                            <div>
                                                <div className="text-xs text-slate-400 line-through">
                                                    {formatPrice(tool.price)}
                                                </div>
                                                <div className="text-lg font-black text-blue-600">
                                                    {formatPrice(calculateDiscount(tool.price, tool.discount))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-lg font-black text-slate-900">
                                                {formatPrice(tool.price)}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => handleAddToCart(tool, e)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold transition-all text-sm flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>+ Keranjang</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // LIST VIEW
                    <div className="space-y-4">
                        {sortedTools.map((tool) => (
                            <div
                                key={tool.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 flex cursor-pointer"
                                onClick={() => setSelectedProduct(tool)}
                            >
                                <div className="relative w-48 h-48 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={tool.image_url}
                                        alt={tool.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {tool.discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                                            -{tool.discount}%
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                {tool.category}
                                            </span>
                                            <h3 className="font-bold text-slate-900 mt-2 text-xl">
                                                {tool.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-bold">{tool.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{tool.description}</p>

                                    <div className="flex items-end justify-between mt-auto">
                                        <div>
                                            {tool.discount > 0 ? (
                                                <div>
                                                    <div className="text-sm text-slate-400 line-through">
                                                        {formatPrice(tool.price)}
                                                    </div>
                                                    <div className="text-2xl font-black text-blue-600">
                                                        {formatPrice(calculateDiscount(tool.price, tool.discount))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-2xl font-black text-slate-900">
                                                    {formatPrice(tool.price)}
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-500 mt-1">Terjual {tool.sold} • Stok {tool.stock}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProduct(tool);
                                                }}
                                                className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-all flex items-center gap-2"
                                            >
                                                <Eye className="w-5 h-5" />
                                                <span>Detail</span>
                                            </button>
                                            <button
                                                onClick={(e) => handleAddToCart(tool, e)}
                                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
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