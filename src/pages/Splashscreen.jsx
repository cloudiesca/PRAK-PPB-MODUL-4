// src/pages/Splashscreen.jsx
import { useEffect, useState } from 'react';
import { Wrench, Hammer, Settings } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 2500;
        const steps = 50;
        const stepTime = duration / steps;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 300);
                    return 100;
                }
                return prev + 2;
            });
        }, stepTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 text-center px-6">
                {/* Logo Animation */}
                <div className="mb-8 relative">
                    <div className="relative inline-block">
                        {/* Rotating Gears Background */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Settings className="w-32 h-32 text-orange-500/20 animate-spin" style={{ animationDuration: '8s' }} />
                        </div>
                        <Settings className="absolute inset-0 w-32 h-32 text-orange-500/20 animate-spin m-auto" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

                        {/* Main Icons */}
                        <div className="relative flex items-center justify-center gap-4">
                            <div className="transform transition-all duration-500" style={{
                                transform: `translateY(${Math.sin(progress / 10) * 10}px)`
                            }}>
                                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-2xl">
                                    <Wrench className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <div className="transform transition-all duration-500" style={{
                                transform: `translateY(${Math.sin(progress / 10 + 2) * 10}px)`
                            }}>
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-2xl">
                                    <Hammer className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
                        WORKSHOP
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold text-orange-400 tracking-wide">
                        Tools & Equipment Store
                    </p>
                    <p className="text-sm md:text-base text-slate-400 mt-2 font-medium">
                        Professional Workshop Solutions
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-xs mx-auto">
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner mb-3">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 transition-all duration-300 ease-out rounded-full shadow-lg"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="h-full w-full bg-white/30 animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm font-mono">
                        Loading... {Math.round(progress)}%
                    </p>
                </div>

                {/* Floating Tools Animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${10 + (i % 3) * 30}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i}s`
                            }}
                        >
                            {i % 2 === 0 ? (
                                <Wrench className="w-6 h-6 text-orange-500/20" />
                            ) : (
                                <Hammer className="w-6 h-6 text-blue-500/20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 0.5;
                    }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}