import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiRepeat, FiX } from "react-icons/fi";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ProductRating from "./ProductRating";
import {
  DiscountBadge,
  NewBadge,
  StockBadge,
  EMIBadge,
  CashbackBadge,
  DeliveryBadge,
} from "./ProductBadges";
import { cn } from "../../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToCompare, removeFromCompare } from "../../redux/slices/compareSlice";
import toast from "react-hot-toast";

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const compareList = useSelector(state => state.compare.items);
  const isWishlisted = product ? wishlist.some(item => item.id === product.id) : false;
  const isCompared = product ? compareList.some(item => item.id === product.id) : false;
  
  const [selectedImage, setSelectedImage] = useState(0);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  if (!product) return null;

  const isDiscounted = product.discount && product.originalPrice;
  const savings = isDiscounted ? product.originalPrice - product.price : 0;

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const handleCompare = () => {
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

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
    onClose();
  };

  const images = [
    product.image,
    product.hoverImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick View"
      className="max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-gray-50 rounded-2xl overflow-hidden"
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    i === selectedImage
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNew && <NewBadge size="md" />}
            {isDiscounted && <DiscountBadge discount={product.discount} size="md" />}
            <StockBadge inStock={product.inStock !== false} />
          </div>

          <div>
            <p className="text-text-muted mb-1">{product.category}</p>
            <h2 className="text-2xl font-bold text-secondary">{product.name}</h2>
          </div>

          <ProductRating
            rating={product.rating || 4.5}
            reviewCount={product.reviews || 0}
            className="text-lg"
          />

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {isDiscounted && (
                <span className="text-xl text-text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {isDiscounted && savings > 0 && (
              <p className="text-success font-medium">
                Save ${savings.toFixed(2)} ({product.discount}% off)
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Bottom Badges */}
          <div className="flex flex-wrap gap-2">
            {product.emi && <EMIBadge amount={product.emi} size="sm" />}
            {product.cashback && <CashbackBadge amount={product.cashback} size="sm" />}
            {product.freeDelivery !== false && <DeliveryBadge free={true} size="sm" />}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full"
              size="lg"
              leftIcon={<FiShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleWishlist}
                leftIcon={<FiHeart className={cn(isWishlisted && "fill-current")} />}
              >
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>

              <Button
                variant="outline"
                onClick={handleCompare}
                leftIcon={<FiRepeat />}
              >
                {isCompared ? "Compared" : "Compare"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
