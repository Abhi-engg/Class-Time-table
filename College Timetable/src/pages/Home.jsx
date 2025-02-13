import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

function Home() {
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-300 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" data-speed="0.3"></div>
        <div className="parallax absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-indigo-300 to-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" data-speed="0.5"></div>
        <div className="parallax absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-300 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" data-speed="0.4"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <div className="text-center animate-fade-in parallax space-y-8 max-w-4xl" data-speed="0.2">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:text-7xl md:text-8xl [text-shadow:_0_4px_8px_rgb(0_0_0_/_20%)] animate-gradient-x">
            College Timetable
          </h1>
          <p className="mt-8 text-xl text-gray-600 sm:text-2xl md:text-3xl backdrop-blur-sm bg-white/30 p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300">
            Your Academic Schedule,
            <span className="block mt-4 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold animate-pulse">Simplified & Organized</span>
          </p>
          
          <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center">
            {user ? (
              <Link
                to="/dashboard"
                className="group min-w-[200px] transform hover:scale-105 transition-all duration-300 flex items-center justify-center px-12 py-6 text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-[0_8px_16px_rgb(59_130_246_/_30%)] hover:shadow-[0_12px_24px_rgb(59_130_246_/_40%)] backdrop-blur-sm relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transform group-hover:translate-y-1 transition-all duration-500"></span>
                Access Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group min-w-[200px] transform hover:scale-105 transition-all duration-300 flex items-center justify-center px-12 py-6 text-xl font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-[0_8px_16px_rgb(59_130_246_/_30%)] hover:shadow-[0_12px_24px_rgb(59_130_246_/_40%)] backdrop-blur-sm relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transform group-hover:translate-y-1 transition-all duration-500"></span>
                  Get Started
                </Link>
                <Link
                  to="/register"
                  className="group min-w-[200px] transform hover:scale-105 transition-all duration-300 flex items-center justify-center px-12 py-6 text-xl font-bold rounded-2xl text-gray-700 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 shadow-lg hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-50 transform group-hover:translate-y-1 transition-all duration-500"></span>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-24 text-center parallax animate-gradient-x" data-speed="0.15">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group bg-white/80 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl rounded-3xl transform hover:scale-105 transition-all duration-500 parallax" data-speed="0.1">
              <div className="p-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transform transition-all duration-500"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative">
                  Smart Scheduling
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed relative">
                  AI-powered timetable management that adapts to your academic needs and preferences.
                </p>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl rounded-3xl transform hover:scale-105 transition-all duration-500 parallax" data-speed="0.2">
              <div className="p-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transform transition-all duration-500"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative">
                  Real-time Updates
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed relative">
                  Stay informed with instant notifications about schedule changes and important announcements.
                </p>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl rounded-3xl transform hover:scale-105 transition-all duration-500 parallax" data-speed="0.3">
              <div className="p-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transform transition-all duration-500"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative">
                  Easy Access
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed relative">
                  Access your schedule anytime, anywhere with our responsive web application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home