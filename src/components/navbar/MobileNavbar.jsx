// src/components/navbar/MobileNavbar.jsx
import { Home, Wrench, Hammer, User, ShoppingCart } from 'lucide-react';
import { useCart } from "../../context/CartContext";

export default function MobileNavbar({ currentPage, onNavigate }) {
    const { openCart, getCartCount } = useCart();
    const cartCount = getCartCount();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'workshop', label: 'Power', icon: Wrench },
        { id: 'tools', label: 'Hand', icon: Hammer },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-1 z-50 shadow-lg">
            <div className="flex items-center justify-around max-w-sm mx-auto">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 ${isActive ? 'text-orange-600' : 'text-gray-400'
                                }`}
                        >
                            <IconComponent
                                size={20}
                                className="mb-1"
                                strokeWidth={isActive ? 2 : 1.5}
                            />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* Cart Button */}
                <button
                    onClick={openCart}
                    className="relative flex flex-col items-center py-2 px-3 text-orange-600"
                >
                    <ShoppingCart size={20} className="mb-1" strokeWidth={2} />
                    <span className="text-xs font-medium">Cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}