import { FiShoppingCart } from "react-icons/fi";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function StickyAddToCart({ product, onAddToCart }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-text-muted mb-1">{product.name}</p>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-sm text-text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={onAddToCart}
          leftIcon={<FiShoppingCart />}
          className="flex-shrink-0"
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
