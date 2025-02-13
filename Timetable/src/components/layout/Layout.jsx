import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Navigation */}
      <Navbar />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pt-16 pb-16 md:pb-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </motion.main>
      </AnimatePresence>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Notification Toast Container */}
      <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
        {/* Toasts will be rendered here */}
      </div>
    </div>
  );
};

export default Layout; 