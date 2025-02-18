// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
    <div className="min-h-screen bg-[#0A192F] overflow-hidden" ref={ref}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A192F]/80 border-b border-[#112240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">
                TimeTable
              </h1>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="border-blue-300/20 text-white hover:border-blue-300/40"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-400 to-cyan-400 text-navy-900 font-semibold hover:opacity-90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
          
          {/* Enhanced floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-screen filter blur-sm"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                background: `rgba(100, 255, 218, ${Math.random() * 0.5})`,
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 1, 0],
                scale: [1, Math.random() * 1.5 + 1, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <motion.span 
              className="text-[#64FFDA] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to the future of scheduling
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              TimeTable<span className="bg-gradient-to-r from-[#64FFDA] to-[#0A192F] text-transparent bg-clip-text">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Transform your academic schedule management with our intelligent timetable solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-400 to-cyan-400 text-navy-900 font-semibold hover:opacity-90"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="border-blue-300/20 text-white hover:border-blue-300/40"
              >
                Sign In
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#64FFDA] flex justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-[#64FFDA] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* New Statistics Section */}
      <div className="py-20 bg-[#112240]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "50+", label: "Institutions" },
            { number: "99%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-[#0A192F]/50 backdrop-blur-sm border border-[#233554] hover:border-[#64FFDA] transition-all duration-300 group"
            >
              <h3 className="text-4xl font-bold text-[#64FFDA] mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-24 bg-[#112240] relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Features that make us <span className="bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text">special</span>
            </h2>
            <p className="text-xl text-blue-100">
              Everything you need to manage your academic schedule effectively
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Scheduling",
                description: "AI-powered timetable management that adapts to your preferences",
                icon: "📅",
                features: ["Machine Learning Optimization", "Conflict Resolution", "Priority Scheduling"]
              },
              {
                title: "Real-time Updates",
                description: "Stay informed with instant notifications about schedule changes",
                icon: "🔔",
                features: ["Push Notifications", "Email Alerts", "In-app Messages"]
              },
              {
                title: "Cross-platform Sync",
                description: "Access your schedule from any device, anywhere, anytime",
                icon: "🔄",
                features: ["Cloud Storage", "Offline Mode", "Multi-device Support"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group bg-[#0A192F]/80 backdrop-blur-sm rounded-xl p-8 text-center border border-[#233554] hover:border-[#64FFDA] transition-all duration-300"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#64FFDA] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#64FFDA] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* New Testimonials Section */}
      <div className="py-24 bg-[#0A192F] relative overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The best scheduling tool I've ever used!",
                author: "Sarah J.",
                role: "Student"
              },
              {
                quote: "Transformed how we manage our department schedules.",
                author: "Prof. Michael",
                role: "Department Head"
              },
              {
                quote: "Intuitive and powerful. Highly recommended!",
                author: "David K.",
                role: "Teaching Assistant"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64FFDA] transition-all duration-300"
              >
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#64FFDA]/20 flex items-center justify-center text-[#64FFDA]">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-[#0A192F] border-t border-[#233554] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Ready to transform your <span className="bg-gradient-to-r from-[#64FFDA] to-[#0A192F] text-transparent bg-clip-text">academic life</span>?
            </h2>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 font-semibold"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 