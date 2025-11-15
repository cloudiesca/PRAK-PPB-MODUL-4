// src/components/ProductDetailModal.jsx
import { useState } from 'react';
import { X, Star, ShoppingCart, Plus, Minus, Package, Shield, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, onClose }) {
    const [quantity, setQuantity] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const { addToCart, openCart } = useCart();

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

    const finalPrice = product.discount > 0
        ? calculateDiscount(product.price, product.discount)
        : product.price;

    const totalPrice = finalPrice * quantity;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        onClose();
        openCart();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8" />
                        <h2 className="text-2xl font-black">Detail Produk</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="grid md:grid-cols-2 gap-6 p-6">

                        {/* Left - Image */}
                        <div className="space-y-4">
                            <div className="relative rounded-2xl overflow-hidden bg-slate-100">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-80 object-cover"
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                        Hemat {product.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-green-50 p-3 rounded-xl text-center">
                                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-green-900">Garansi Resmi</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl text-center">
                                    <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                    <p className="text-xs font-bold text-blue-900">Gratis Ongkir</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-xl text-center">
                                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-1 fill-purple-600" />
                                    <p className="text-xs font-bold text-purple-900">Rating {product.rating}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="space-y-4">
                            <div>
                                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
                                    {product.category}
                                </span>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-slate-600 mb-4">{product.description}</p>

                                {/* Rating & Sales */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-slate-900">{product.rating}</span>
                                        <span className="text-slate-500 text-sm">(234 ulasan)</span>
                                    </div>
                                    <span className="text-slate-300">|</span>
                                    <span className="text-slate-600">Terjual <span className="font-bold text-orange-600">{product.sold}</span></span>
                                </div>

                                {/* Price */}
                                <div className="bg-orange-50 p-4 rounded-xl mb-4">
                                    {product.discount > 0 ? (
                                        <div>
                                            <div className="text-slate-500 line-through text-sm mb-1">
                                                {formatPrice(product.price)}
                                            </div>
                                            <div className="text-3xl font-black text-orange-600">
                                                {formatPrice(finalPrice)}
                                            </div>
                                            <div className="text-sm text-green-600 font-bold mt-1">
                                                Hemat {formatPrice(product.price - finalPrice)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-3xl font-black text-slate-900">
                                            {formatPrice(product.price)}
                                        </div>
                                    )}
                                </div>

                                {/* Stock */}
                                <div className="bg-slate-50 p-3 rounded-xl mb-4">
                                    <p className="text-sm text-slate-600">
                                        Stok tersedia: <span className="font-bold text-green-600">{product.stock} unit</span>
                                    </p>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Jumlah
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                            className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 p-3 rounded-lg transition-all"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                            className="w-20 text-center border-2 border-slate-200 rounded-lg py-2 font-bold text-lg focus:outline-none focus:border-orange-500"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                            className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 p-3 rounded-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                        <div className="flex-1 text-right">
                                            <p className="text-sm text-slate-600">Subtotal</p>
                                            <p className="text-xl font-black text-orange-600">
                                                {formatPrice(totalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="border-t pt-4">
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Spesifikasi
                                </h4>
                                <ul className="space-y-2">
                                    {product.specifications.map((spec, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <span className="text-orange-500 mt-1">•</span>
                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - Action Buttons */}
                <div className="border-t bg-slate-50 p-6 flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>+ Keranjang</span>
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Beli Sekarang
                    </button>
                </div>

                {/* Success Notification */}
                {showSuccess && (
                    <div className="absolute top-24 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideInRight z-10">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold">Ditambahkan ke keranjang!</span>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
                .animate-slideInRight {
                    animation: slideInRight 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}