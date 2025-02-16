import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content - Added pt-16 to account for fixed navbar */}
      <main className="pt-16 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Layout; 