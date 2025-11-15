// src/components/home/HeroSection.jsx
import { Wrench, ShoppingCart, ArrowRight, Zap } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
    return (
        <section className="relative overflow-hidden py-12 md:py-0 md:min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT - Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                            <Zap className="w-4 h-4" />
                            <span>Peralatan Bengkel Terlengkap</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
                            <span className="block">Solusi</span>
                            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                                Workshop
                            </span>
                            <span className="block">Profesional</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Temukan ribuan peralatan workshop berkualitas tinggi untuk semua kebutuhan pekerjaan Anda.
                            <span className="text-orange-600 font-bold"> Gratis ongkir & garansi resmi!</span>
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-black text-orange-600">500+</div>
                                <div className="text-sm text-slate-600 font-medium">Produk</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-black text-orange-600">50K+</div>
                                <div className="text-sm text-slate-600 font-medium">Pelanggan</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-black text-orange-600">4.9★</div>
                                <div className="text-sm text-slate-600 font-medium">Rating</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => onNavigate('workshop')}
                                className="group bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <Wrench className="w-6 h-6" />
                                    <span>Belanja Sekarang</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button
                                onClick={() => onNavigate('tools')}
                                className="group bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-orange-500 transform hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                                    <span>Lihat Katalog</span>
                                </span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Garansi Resmi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Gratis Ongkir</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - Image Grid */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            {/* Main Large Image */}
                            <div className="relative mb-4 group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                                        alt="Workshop Tools"
                                        className="w-full h-64 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                                        🔥 Best Seller
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Two Images */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                                        alt="Power Tools"
                                        className="w-full h-32 md:h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                        <span className="text-white font-bold text-sm">Power Tools</span>
                                    </div>
                                </div>

                                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80"
                                        alt="Hand Tools"
                                        className="w-full h-32 md:h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                        <span className="text-white font-bold text-sm">Hand Tools</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}