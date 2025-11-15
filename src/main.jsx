// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext'
import SplashScreen from './pages/Splashscreen';
import HomePage from './pages/HomePage';
import PowerToolsPage from './pages/PowerToolsPage';
import HandToolsPage from './pages/HandToolsPage';
import ProfilePage from './pages/ProfilePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import CartSidebar from './components/CartSidebar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'workshop':
        return <PowerToolsPage />;
      case 'tools':
        return <HandToolsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>

        <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

        {/* Cart Sidebar */}
        <CartSidebar />

        <PWABadge />
      </div>
    </CartProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)