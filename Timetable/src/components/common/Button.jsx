import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const variants = {
  primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-indigo-500/25',
  secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 dark:text-white shadow-gray-500/25',
  danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-500/25',
  success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-green-500/25',
  outline: 'border-2 border-indigo-500/50 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400/50 dark:text-indigo-400 dark:hover:bg-indigo-900/30',
  glass: 'backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20',
  neon: 'bg-transparent border-2 border-indigo-500/50 text-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:border-indigo-400 hover:text-indigo-400',
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
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  },
  slide: {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { x: -2 }
  },
  pulse: {
    initial: { scale: 1 },
    hover: { 
      scale: [1, 1.04, 1],
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  },
  glow: {
    initial: { 
      boxShadow: "0 0 0px rgba(99,102,241,0)",
      scale: 1
    },
    hover: { 
      boxShadow: "0 0 20px rgba(99,102,241,0.5)",
      scale: 1.02,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.98 }
  },
  float: {
    initial: { y: 0 },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { y: 2 }
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
  error,
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

  const errorAnimation = {
    initial: { 
      x: 0,
      borderColor: 'transparent'
    },
    animate: error ? {
      x: [0, -4, 4, -4, 4, 0],
      borderColor: ['transparent', '#EF4444', '#EF4444', '#EF4444', '#EF4444', '#EF4444'],
      transition: {
        duration: 0.6,
        ease: [0.36, 0, 0.66, -0.56],
        borderColor: { duration: 0.1 }
      }
    } : {
      x: 0,
      borderColor: 'transparent'
    }
  };

  return (
    <div className="relative">
      <motion.button
        disabled={disabled || isLoading}
        onClick={handleRipple}
        className={`
          relative overflow-hidden
          inline-flex items-center justify-center
          rounded-lg shadow-sm
          transition-all duration-200
          ${variants[variant]}
          ${sizes[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-2 border-red-500 dark:border-red-400' : ''}
          ${className}
        `}
        initial="initial"
        animate="animate"
        whileHover={!disabled && !isLoading ? "hover" : undefined}
        whileTap={!disabled && !isLoading ? "tap" : undefined}
        variants={{
          ...animations[animation],
          ...errorAnimation
        }}
        {...props}
      >
        {/* Ripple effect */}
        <AnimatePresence>
          {rippleEffect.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute bg-white/30 rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              initial={{ scale: 0, opacity: 0.35 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => removeRipple(ripple.id)}
            />
          ))}
        </AnimatePresence>

        {/* Button content */}
        <motion.div
          animate={{ opacity: isLoading ? 0 : 1 }}
          className="flex items-center gap-2"
        >
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </motion.div>

        {/* Loading spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute left-0 right-0 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm text-red-500 dark:text-red-400">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline', 'glass', 'neon']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  animation: PropTypes.oneOf(['bounce', 'slide', 'pulse', 'glow', 'float']),
  ripple: PropTypes.bool,
  error: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;