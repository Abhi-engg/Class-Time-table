import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-indigo-500/25',
  secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 dark:text-white shadow-gray-500/25',
  danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-500/25',
  success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-green-500/25',
  outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30 shadow-indigo-500/25',
  glass: 'backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-white/25',
  neon: 'bg-transparent border-2 border-indigo-500 text-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:border-indigo-400 hover:text-indigo-400 shadow-indigo-500/25',
};

const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const animations = {
  bounce: {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  },
  slide: {
    hover: { x: [0, -4, 4, 0], transition: { duration: 0.4 } },
    tap: { scale: 0.98 }
  },
  pulse: {
    hover: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    tap: { scale: 0.95 }
  },
  glow: {
    hover: { 
      boxShadow: "0 0 20px rgba(99,102,241,0.5)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  }
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  animation = 'bounce',
  ripple = true,
  ...props
}) => {
  const [rippleEffect, setRippleEffect] = React.useState([]);

  const handleRipple = (e) => {
    if (!ripple) return;
    
    const button = e.currentTarget.getBoundingClientRect();
    const diameter = Math.max(button.width, button.height);
    const radius = diameter / 2;

    setRippleEffect([...rippleEffect, {
      x: e.clientX - button.left - radius,
      y: e.clientY - button.top - radius,
      size: diameter,
      id: Date.now()
    }]);
  };

  const removeRipple = (id) => {
    setRippleEffect(rippleEffect.filter(ripple => ripple.id !== id));
  };

  return (
    <motion.button
      whileHover={animations[animation].hover}
      whileTap={animations[animation].tap}
      disabled={disabled || isLoading}
      onClick={handleRipple}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center rounded-lg font-medium
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        disabled:opacity-60 disabled:cursor-not-allowed
        shadow-md hover:shadow-lg
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {/* Ripple Effects */}
      {rippleEffect.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.7 }}
          onAnimationComplete={() => removeRipple(ripple.id)}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Loading Spinner */}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </motion.div>
      ) : (
        <motion.div className="flex items-center">
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </motion.div>
      )}
    </motion.button>
  );
};

export default Button;