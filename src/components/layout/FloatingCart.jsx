import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiShoppingBag } from 'react-icons/fi';
import { selectCartCount } from '../../redux/slices/cartSlice';

export default function FloatingCart({ setIsCartOpen }) {
  const cartCount = useSelector(selectCartCount);

  if (cartCount === 0) return null;

  const handleClick = (e) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="fixed bottom-32 right-4 sm:right-6 z-40"
      >
        <Link to="/cart" onClick={handleClick}>
          <button className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 flex items-center justify-center text-white">
            <FiShoppingBag size={28} />
            <motion.span
              key={cartCount}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-danger rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </motion.span>
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
