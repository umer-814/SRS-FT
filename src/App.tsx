import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { CryptoProvider } from './contexts/CryptoContext';
import AuthGuard from './components/AuthGuard';
import Sidebar from './components/Sidebar';
import LandingAnimation from './components/LandingAnimation';
import HeroSection from './components/HeroSection';
import FloatingHelp from './components/FloatingHelp';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import RecoveryTool from './pages/RecoveryTool';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [hasShownLanding, setHasShownLanding] = useState(false);

  useEffect(() => {
    const landingShown = sessionStorage.getItem('landingShown');
    const heroShown = sessionStorage.getItem('heroShown');

    if (landingShown) {
      setShowLanding(false);
      setHasShownLanding(true);

      if (!heroShown) {
        setShowHero(true);
      }
    }
  }, []);

  const handleLandingComplete = () => {
    setShowLanding(false);
    setHasShownLanding(true);
    sessionStorage.setItem('landingShown', 'true');

    const heroShown = sessionStorage.getItem('heroShown');
    if (!heroShown) {
      setShowHero(true);
    }
  };

  const handleHeroComplete = () => {
    setShowHero(false);
    sessionStorage.setItem('heroShown', 'true');
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <AnimatePresence>
        {showLanding && !hasShownLanding && (
          <LandingAnimation onComplete={handleLandingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-dark-primary overflow-y-auto"
          >
            <HeroSection onComplete={handleHeroComplete} standalone={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {(!showLanding || hasShownLanding) && !showHero && (
        <>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <>
                <div className="flex h-screen overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/forecast" element={
                        <AuthGuard>
                          <Forecast />
                        </AuthGuard>
                      } />
                      <Route path="/recovery" element={
                        <AuthGuard>
                          <RecoveryTool />
                        </AuthGuard>
                      } />
                      <Route path="/alerts" element={
                        <AuthGuard>
                          <Alerts />
                        </AuthGuard>
                      } />
                      <Route path="/reports" element={
                        <AuthGuard>
                          <Reports />
                        </AuthGuard>
                      } />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
                <FloatingHelp />
              </>
            } />
          </Routes>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CryptoProvider>
        <Router>
          <AppContent />
        </Router>
      </CryptoProvider>
    </AuthProvider>
  );
}

export default App;