import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import HomeFeed from "@/pages/HomeFeed";
import SettingsScreen from "@/pages/SettingsScreen";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import MobileNavigation from "@/components/MobileNavigation";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const handleSplashFinish = () => {
    setShowSplash(false);
    navigate('/');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') navigate('/home');
    else if (tab === 'settings') navigate('/settings');
  };

  // Update active tab based on route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/home' || path === '/') setActiveTab('home');
    else if (path === '/settings') setActiveTab('settings');
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onFinish={handleSplashFinish} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background"
        >
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomeFeed />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {!['/login', '/signup'].includes(window.location.pathname) && (
              <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            )}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AppContent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
