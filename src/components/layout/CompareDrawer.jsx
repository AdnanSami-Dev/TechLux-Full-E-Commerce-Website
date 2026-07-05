import { motion } from "framer-motion";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiTrash2, FiColumns, FiShoppingCart, FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCompare, clearCompare } from "../../redux/slices/compareSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function CompareDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const compareItems = useSelector(state => state.compare.items);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCompare(productId));
    toast.success('Product removed from compare');
  };

  const handleWishlistToggle = (product) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    toast.success('Compare list cleared');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Compare Products" position="right">
      {compareItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <FiColumns size={48} className="text-primary opacity-60" />
          </div>
          <p className="text-text-secondary mb-6 text-lg">No products to compare</p>
          <Link to="/shop" onClick={onClose}>
            <Button variant="primary" className="shadow-lg shadow-primary/20">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {compareItems.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className="flex gap-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${item.id}`} onClick={onClose} className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-border">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.id}`} onClick={onClose} className="hover:text-primary transition-colors">
                  <h4 className="font-semibold text-secondary mb-1 line-clamp-2">{item.name}</h4>
                </Link>
                <p className="text-primary font-bold mb-3 text-lg">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant={isWishlisted(item.id) ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handleWishlistToggle(item)}
                    leftIcon={<FiHeart className={isWishlisted(item.id) ? "fill-current" : ""} />}
                    className={isWishlisted(item.id) ? "bg-danger hover:bg-danger/90 border-danger" : ""}
                  >
                    {isWishlisted(item.id) ? 'Wishlisted' : 'Wishlist'}
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemove(item.id)}
                    className="text-danger hover:text-danger/80 flex items-center gap-1.5 font-medium"
                  >
                    <FiTrash2 size={16} /> Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            variants={itemVariants}
            className="pt-4 border-t border-border space-y-3"
          >
            {compareItems.length >= 2 && (
              <Link to="/compare" onClick={onClose} className="block">
                <Button className="w-full shadow-lg shadow-primary/20">
                  Compare Now
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              className="w-full text-danger hover:bg-danger/10 font-medium"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </motion.div>
        </motion.div>
      )}
    </Drawer>
  );
}
