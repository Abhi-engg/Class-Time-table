import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const BaseCard = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <BaseCard
      className={`
        bg-white/80 dark:bg-gray-800/80
        rounded-xl shadow-sm
        border border-gray-200/50 dark:border-gray-700/50
        overflow-hidden
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400' : ''}
        ${className}
      `}
      onClick={onClick}
      {...hoverProps}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

// Card subcomponents
Card.Header = ({ children, className = '' }) => (
  <div className={`
    px-6 py-4 
    border-b border-gray-200/50 dark:border-gray-700/50
    ${className}
  `}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`px-8 py-4 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`
    px-6 py-4 
    border-t border-gray-200/50 dark:border-gray-700/50
    ${className}
  `}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Give display names to subcomponents
Card.Header.displayName = 'Card.Header';
Card.Body.displayName = 'Card.Body';
Card.Footer.displayName = 'Card.Footer';

export default Card; 