// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  const testimonialRef = useRef(null);
  const { scrollYProgress: testimonialScrollYProgress } = useScroll({
    target: testimonialRef,
    offset: ["start end", "end start"]
  });

  const x = useSpring(useTransform(testimonialScrollYProgress, [0, 1], [0, -1000]), {
    stiffness: 100,
    damping: 30,
    mass: 0.8
  });

  const testimonials = [
    {
      quote: "TimeTable Pro has completely transformed how I manage my classes. The interface is intuitive and the scheduling features are exactly what I needed!",
      name: "Saurabh Yadav",
      role: "AIML Student",
      year: "3rd Year",
      avatar: "/avatars/student1.jpg" // Add actual path to avatar images
    },
    {
      quote: "The exam planning feature helped me maintain a perfect balance between studies and extracurriculars. Highly recommended!",
      name: "Mandlesh Yadav",
      role: "Engineering Student",
      year: "2nd Year",
      avatar: "/avatars/student2.jpg"
    },
    {
      quote: "As a class representative, this tool makes it incredibly easy to coordinate with professors and manage schedule changes.",
      name: "Biswa Prakash Maharana",
      role: "Data Engineering Student",
      year: "4th Year",
      avatar: "/avatars/student3.jpg"
    },
    {
      quote: "The mobile app notifications ensure I never miss a class. It's like having a personal academic assistant!",
      name: "Satya Prakash",
      role: "AIML Student",
      year: "3rd Year",
      avatar: "/avatars/student4.jpg"
    },
    {
      quote: "The interface is so user-friendly, and the customer support team is always there to help. Great experience overall!",
      name: "Roshan Maurya",
      role: "IT Student",
      year: "2nd Year",
      avatar: "/avatars/student5.jpg"
    },
    {
      quote: "Being able to sync my timetable with my calendar app has made my academic life so much more organized.",
      name: "Satyam Vishwakarma",
      role: "Computer Science Student",
      year: "4th Year",
      avatar: "/avatars/student6.jpg"
    }
  ];

    return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">TimeTable Pro</h1>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Smart Class Scheduling for Modern Education
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Streamline your academic journey with our intelligent timetable management system
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="border-slate-400 text-slate-400 hover:bg-slate-400/10"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Animated Timetable Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-[400px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg backdrop-blur-xl border border-slate-700 p-4">
                {/* Timetable Header */}
                <div className="grid grid-cols-6 gap-2 mb-4">
                  <div className="h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-slate-300 text-sm">Time</span>
                  </div>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                    <motion.div
                      key={day}
                      className="h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-slate-300 text-sm">{day}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Timetable Body */}
                {[9, 10, 11, 12].map((hour, rowIndex) => (
                  <motion.div
                    key={hour}
                    className="grid grid-cols-6 gap-2 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIndex * 0.1 }}
                  >
                    <div className="h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">
                        {`${hour}:00`}
                      </span>
                    </div>
                    {[...Array(5)].map((_, i) => {
                      const isClass = Math.random() > 0.5;
                      return (
                        <motion.div
                          key={i}
                          className={`h-16 rounded ${
                            isClass 
                              ? 'bg-blue-500/20 border-blue-500/30' 
                              : 'bg-white/5 border-white/10'
                          } border flex items-center justify-center p-2`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {isClass && (
                            <div className="text-center">
                              <div className="text-blue-400 text-xs font-medium mb-1">
                                {['Math-4', 'Data Structures', 'DBMS', 'Mechanics', 'Operating System'][Math.floor(Math.random() * 5)]}
                              </div>
                              <div className="text-slate-400 text-xs">
                                Room {Math.floor(Math.random() * 300) + 100}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ))}

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="opacity-30"
                  >
                    <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
                    <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="2" className="text-purple-500" opacity="0.7" />
                    <circle cx="60" cy="60" r="60" stroke="currentColor" strokeWidth="2" className="text-indigo-500" opacity="0.4" />
                  </svg>
                </div>

                {/* Clock Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Calendar Icon */}
                <div className="absolute -top-4 right-8 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Features for Modern Education
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need for efficient academic scheduling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Scheduling",
                description: "AI-powered timetable generation that adapts to your preferences",
                icon: "📚"
              },
              {
                title: "Class Notifications",
                description: "Never miss a class with real-time alerts and reminders",
                icon: "🔔"
              },
              {
                title: "Exam Planning",
                description: "Organize your exam schedule and study time effectively",
                icon: "📝"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Testimonials Section */}
      <div className="bg-slate-900 py-24" ref={testimonialRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Voices of Our Students
            </h2>
            <p className="text-xl text-slate-400">
              Hear what our community has to say
            </p>
          </motion.div>

          {/* Grid Layout for Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Content */}
                <div className="mb-6">
                  <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-slate-400 text-sm">{testimonial.role}</p>
                      <p className="text-blue-400 text-xs">{testimonial.year}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Academic Experience?
          </h2>
          <p className="text-white/80 mb-8">
            Join thousands of students already using TimeTable Pro
          </p>
          <Button
            variant="glass"
            size="lg"
            onClick={() => navigate('/register')}
            className="backdrop-blur-xl"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 