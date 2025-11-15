import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import HomePage from './pages/HomePage';
import WorkshopPage from './pages/PowerToolsPage';
import ToolsPage from './pages/HandToolsPage';
import ProfilePage from './pages/ProfilePage';
import SplashScreen from './pages/Splashscreen';
import PWABadge from './PWABadge';
import { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="App">
        <DesktopNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <MobileNavbar />
        <PWABadge />
      </div>
    </Router>
  );
}

export default App;