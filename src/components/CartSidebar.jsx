// src/components/CartSidebar.jsx
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        isCartOpen,
        closeCart
    } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const calculateItemPrice = (item) => {
        const price = item.discount > 0
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return price * item.quantity;
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        const total = getCartTotal();
        const itemsList = cartItems.map(item =>
            `${item.quantity}x ${item.name}`
        ).join('\n');

        alert(`🛒 CHECKOUT\n\n${itemsList}\n\nTotal: ${formatPrice(total)}\n\nTerima kasih telah berbelanja!`);
        clearCart();
        closeCart();
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col animate-slideInRight">

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8" />
                            <h2 className="text-2xl font-black">Keranjang</h2>
                        </div>
                        <button
                            onClick={closeCart}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-orange-100">
                        {cartItems.length} produk dalam keranjang
                    </p>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="w-12 h-12 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Keranjang Kosong
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Belum ada produk di keranjang Anda
                            </p>
                            <button
                                onClick={closeCart}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                Mulai Belanja
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80';
                                                }}
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 text-sm">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-2">
                                                {item.category}
                                            </p>

                                            {/* Price */}
                                            <div className="mb-3">
                                                {item.discount > 0 ? (
                                                    <div>
                                                        <div className="text-xs text-slate-400 line-through">
                                                            {formatPrice(item.price)}
                                                        </div>
                                                        <div className="text-lg font-black text-orange-600">
                                                            {formatPrice(item.price * (1 - item.discount / 100))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-lg font-black text-slate-900">
                                                        {formatPrice(item.price)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="bg-white hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 transition-all"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-bold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="bg-white hover:bg-slate-100 disabled:bg-slate-50 disabled:text-slate-300 p-1.5 rounded-lg border border-slate-200 transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="mt-2 text-right">
                                                <span className="text-xs text-slate-500">Subtotal: </span>
                                                <span className="font-bold text-slate-900">
                                                    {formatPrice(calculateItemPrice(item))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer - Total & Checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t bg-white p-6 space-y-4">
                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="w-full text-red-600 hover:bg-red-50 py-2 rounded-lg font-semibold transition-all text-sm"
                        >
                            Kosongkan Keranjang
                        </button>

                        {/* Total */}
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 font-medium">Total Belanja</span>
                                <span className="text-2xl font-black text-orange-600">
                                    {formatPrice(getCartTotal())}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">
                                Sudah termasuk diskon
                            </p>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <span>Checkout Sekarang</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out;
                }
            `}</style>
        </>
    );
}