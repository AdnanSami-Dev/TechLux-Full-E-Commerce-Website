import { useState } from "react";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiHeart, FiTrash2, FiShoppingCart, FiShare2, FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

export default function WishlistDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [shareMessage, setShareMessage] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleShareWishlist = () => {
    const shareText = "Check out my wishlist on TechLux!";
    if (navigator.share) {
      navigator.share({ title: "My TechLux Wishlist", text: shareText });
    } else {
      setShareMessage("Link copied to clipboard!");
      setTimeout(() => setShareMessage(null), 3000);
    }
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title="My Wishlist" 
      position="right"
    >
      <div className="space-y-4">
        {/* Top Actions */}
        {wishlistItems.length > 0 && (
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-border">
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<FiShare2 />}
              onClick={handleShareWishlist}
            >
              Share
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-danger hover:bg-danger/10 hover:text-danger"
              onClick={() => dispatch(clearWishlist())}
            >
              Clear All
            </Button>
          </div>
        )}

        {shareMessage && (
          <p className="text-success text-sm">{shareMessage}</p>
        )}

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <FiHeart size={64} className="text-danger opacity-50" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-secondary">Your wishlist is empty</h3>
              <p className="text-text-muted">Add your favorite items to your wishlist</p>
            </div>
            <Link to="/shop" onClick={onClose}>
              <Button variant="primary">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Items */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {wishlistItems.map((product) => (
                <div 
                  key={product.id} 
                  className="flex gap-4 bg-muted/30 rounded-xl p-3"
                >
                  {/* Image */}
                  <Link 
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link 
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="hover:text-primary transition-colors"
                      >
                        <h4 className="font-semibold text-secondary line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-text-muted hover:text-danger transition-colors flex-shrink-0"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-text-muted line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="flex-1"
                        leftIcon={<FiShoppingCart size={14} />}
                        onClick={() => handleAddToCart(product)}
                        disabled={product.inStock === false}
                      >
                        {product.inStock === false ? "Out of Stock" : "Add to Cart"}
                      </Button>
                      <Link to={`/product/${product.id}`} onClick={onClose}>
                        <Button variant="outline" size="sm" leftIcon={<FiExternalLink size={14} />}>
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="pt-4 border-t border-border space-y-3">
              <Link to="/wishlist" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  View Full Wishlist
                </Button>
              </Link>
              <Link to="/shop" onClick={onClose}>
                <Button variant="primary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}
