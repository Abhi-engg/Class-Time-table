import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "../components/common/Button"
import { FaStar, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa"

const PricingCard = ({ title, price, features, isPopular }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${isPopular ? "border-2 border-indigo-500" : ""}`}
  >
    {isPopular && <div className="text-indigo-500 text-sm font-semibold mb-2">Most Popular</div>}
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-3xl font-bold mb-6">
      ${price}
      <span className="text-gray-500 text-base font-normal">/month</span>
    </p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <FaStar className="text-indigo-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button variant="primary" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
      Choose Plan
    </Button>
  </div>
)

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Header - removed bg-white/10, adjusted backdrop blur */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xl font-bold text-white">TimeTablePro</span>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#features" className="text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button onClick={() => navigate("/login")} className="text-white hover:text-indigo-200 transition-colors">
                Sign In
              </button>
              <Button
                variant="primary"
                onClick={() => navigate("/register")}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Rest of the content - adjust top padding to account for fixed header */}
      <div className="pt-16">
        {" "}
        {/* Add padding-top to prevent content from going under header */}
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: Math.random() * 4 + 2 + "px",
                  height: Math.random() * 4 + 2 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                TimeTable<span className="text-indigo-300">Pro</span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                Transform your academic schedule management with our intelligent timetable solution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="border-white text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Features Section */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Features that make us special</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to manage your academic schedule effectively
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Scheduling",
                  description: "AI-powered timetable management that adapts to your preferences",
                  icon: "📅",
                },
                {
                  title: "Real-time Updates",
                  description: "Stay informed with instant notifications about schedule changes",
                  icon: "🔔",
                },
                {
                  title: "Cross-platform Sync",
                  description: "Access your schedule from any device, anywhere, anytime",
                  icon: "🔄",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Don't just take our word for it - hear from some of our satisfied users
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "University Student",
                  quote: "TimeTablePro has completely transformed how I manage my classes. It's a game-changer!",
                },
                {
                  name: "Dr. Michael Lee",
                  role: "Professor",
                  quote: "As an educator, I find TimeTablePro invaluable for organizing my lectures and office hours.",
                },
                {
                  name: "Emily Chen",
                  role: "High School Teacher",
                  quote:
                    "The ease of use and flexibility of TimeTablePro has made scheduling a breeze for our entire school.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose the Perfect Plan for You</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Simple, transparent pricing that grows with you
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price={9.99}
                features={["Up to 5 schedules", "Basic analytics", "Email support"]}
                isPopular={false}
              />
              <PricingCard
                title="Pro"
                price={19.99}
                features={["Unlimited schedules", "Advanced analytics", "Priority support", "Custom integrations"]}
                isPopular={true}
              />
              <PricingCard
                title="Enterprise"
                price={49.99}
                features={["All Pro features", "Dedicated account manager", "Custom branding", "API access"]}
                isPopular={false}
              />
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-indigo-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-8">Ready to transform your academic life?</h2>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Get Started Now
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">TimeTablePro</h3>
                <p className="text-gray-400">Transforming academic scheduling for the modern era.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} TimeTablePro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage

