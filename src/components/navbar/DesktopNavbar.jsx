// src/components/navbar/DesktopNavbar.jsx
import { ShoppingCart } from 'lucide-react';
import { useCart } from "../../context/CartContext";
import logoUrl from '../../assets/LOGORN.png';

export default function DesktopNavbar({ currentPage, onNavigate }) {
    const { openCart, getCartCount } = useCart();
    const cartCount = getCartCount();

    const navItems = [
        { id: 'home', label: 'Beranda' },
        { id: 'workshop', label: 'Power Tools' },
        { id: 'tools', label: 'Hand Tools' },
        { id: 'profile', label: 'Profile' }
    ];

    return (
        <nav className="hidden md:block shadow-lg border-b border-orange-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
                    >
                        <div className="relative group">
                            <img
                                src={logoUrl}
                                alt="Workshop Logo"
                                className="w-12 h-12 object-contain filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-60" />
                            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-orange-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '300ms' }} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                                Workshop
                            </h1>
                            <h2 className="text-base font-semibold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent -mt-1">
                                Tools & Equipment
                            </h2>
                        </div>
                    </button>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-10">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`px-4 py-3 text-base font-medium transition-all duration-200 border-b-2 ${currentPage === item.id
                                    ? 'text-orange-600 border-orange-500'
                                    : 'text-slate-600 border-transparent hover:text-orange-500 hover:border-orange-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Cart Button */}
                        <button
                            onClick={openCart}
                            className="relative bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}