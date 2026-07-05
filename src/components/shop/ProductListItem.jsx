import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye, FiRepeat } from "react-icons/fi";
import { cn } from "../../utils/cn";
import ProductRating from "../cards/ProductRating";
import {
  DiscountBadge,
  NewBadge,
  StockBadge,
  EMIBadge,
  CashbackBadge,
  DeliveryBadge,
} from "../cards/ProductBadges";
import Button from "../ui/Button";

export default function ProductListItem({
  product,
  onWishlistToggle,
  onCompareToggle,
  onQuickView,
  onAddToCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isDiscounted = product.discount && product.originalPrice;
  const savings = isDiscounted ? product.originalPrice - product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row gap-6 bg-card rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-border p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full md:w-64 h-64 md:h-48 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <NewBadge />}
          {isDiscounted && <DiscountBadge discount={product.discount} />}
        </div>

        <div className="absolute top-3 right-3">
          <StockBadge inStock={product.inStock !== false} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted mb-1">{product.category}</p>
          <h3 className="font-semibold text-secondary text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mb-3">
            <ProductRating
              rating={product.rating || 4.5}
              reviewCount={product.reviews || 0}
            />
          </div>
          <p className="text-text-secondary text-sm line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {isDiscounted && (
              <>
                <span className="text-sm text-text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs text-success font-medium">
                  Save ${savings.toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Bottom Badges */}
          <div className="flex flex-wrap gap-2">
            {product.emi && <EMIBadge amount={product.emi} />}
            {product.cashback && <CashbackBadge amount={product.cashback} />}
            {product.freeDelivery !== false && <DeliveryBadge free={true} />}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="primary"
            leftIcon={<FiShoppingCart className="w-4 h-4" />}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onWishlistToggle(product)}
              className={cn(
                product.isWishlisted ? "bg-danger text-white border-danger" : ""
              )}
            >
              <FiHeart
                className={cn("w-4 h-4", product.isWishlisted && "fill-current")}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onCompareToggle(product)}
              className={cn(
                product.isCompared ? "bg-primary text-white border-primary" : ""
              )}
            >
              <FiRepeat className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuickView(product)}
            >
              <FiEye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
