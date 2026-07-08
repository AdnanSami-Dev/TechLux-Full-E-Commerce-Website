import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye, FiRepeat } from "react-icons/fi";
import { cn } from "../../utils/cn";
import ProductRating from "./ProductRating";
import {
  DiscountBadge,
  NewBadge,
  StockBadge,
  EMIBadge,
  CashbackBadge,
  DeliveryBadge,
} from "./ProductBadges";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToCompare, removeFromCompare } from "../../redux/slices/compareSlice";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  className,
  onQuickView,
  variant = "default", // default | compact | featured
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const compareList = useSelector(state => state.compare.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isCompared = compareList.some(item => item.id === product.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    if (isCompared) {
      dispatch(removeFromCompare(product.id));
      toast.success('Removed from compare');
    } else {
      if (compareList.length >= 4) {
        toast.error('You can only compare up to 4 products');
        return;
      }
      dispatch(addToCompare(product));
      toast.success('Added to compare');
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const isDiscounted = product.discount && product.originalPrice;
  const savings = isDiscounted ? product.originalPrice - product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group bg-card rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-border flex flex-col h-full",
        variant === "featured" && "border-primary/20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={isHovered ? "hover" : "main"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={
              isHovered && product.hoverImage
                ? product.hoverImage
                : product.image
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && <NewBadge />}
          {isDiscounted && <DiscountBadge discount={product.discount} />}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <StockBadge inStock={product.inStock !== false} />
        </div>

        {/* Quick Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center gap-3 z-20"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all",
                  isWishlisted
                    ? "bg-danger text-white"
                    : "bg-white text-secondary hover:bg-primary hover:text-white"
                )}
              >
                <FiHeart
                  className={cn("w-5 h-5", isWishlisted && "fill-current")}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompare}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all",
                  isCompared
                    ? "bg-primary text-white"
                    : "bg-white text-secondary hover:bg-primary hover:text-white"
                )}
              >
                <FiRepeat className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                className="w-12 h-12 bg-white text-secondary rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all"
              >
                <FiEye className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        {/* Category */}
        <p className="text-sm text-text-muted mb-1">{product.category}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <ProductRating
            rating={product.rating || 4.5}
            reviewCount={product.reviews || 0}
          />
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {isDiscounted && (
            <span className="text-sm text-text-muted line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings */}
        {isDiscounted && savings > 0 && (
          <p className="text-xs text-success mb-3 font-medium">
            Save ${savings.toFixed(2)}
          </p>
        )}

        {/* Bottom Badges (EMI, Cashback, Delivery) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.emi && <EMIBadge amount={product.emi} />}
          {product.cashback && <CashbackBadge amount={product.cashback} />}
          {product.freeDelivery !== false && <DeliveryBadge free={true} />}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="mt-auto"></div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          className="w-full"
          size={variant === "compact" ? "sm" : "md"}
          onClick={handleAddToCart}
          leftIcon={<FiShoppingCart className="w-4 h-4" />}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
