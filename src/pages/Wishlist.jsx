import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import ProductCard from "../components/cards/ProductCard";
import { FiHeart, FiShoppingCart, FiShare2, FiTrash2 } from "react-icons/fi";
import { removeFromWishlist, clearWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [shareMessage, setShareMessage] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      if (item.inStock !== false) {
        dispatch(addToCart(item));
      }
    });
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Wishlist", href: "/wishlist", active: true },
  ];

  return (
    <MainLayout>
      <section className="py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-secondary mb-2">
                My Wishlist
              </h1>
              <p className="text-text-muted">
                {wishlistItems.length > 0 
                  ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} saved` 
                  : "Start adding items to your wishlist"}
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  leftIcon={<FiShare2 />}
                  onClick={handleShareWishlist}
                >
                  Share
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<FiShoppingCart />}
                  onClick={handleAddAllToCart}
                  disabled={!wishlistItems.some(item => item.inStock !== false)}
                >
                  Add All to Cart
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<FiTrash2 />}
                  className="text-danger hover:bg-danger/10"
                  onClick={() => dispatch(clearWishlist())}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {shareMessage && (
            <div className="mb-6 p-3 bg-success/10 text-success rounded-lg">
              {shareMessage}
            </div>
          )}

          {/* Empty State */}
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <FiHeart size={80} className="text-danger opacity-30" />
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-secondary">
                  Your wishlist is empty
                </h2>
                <p className="text-text-muted max-w-md mx-auto">
                  Browse our collection and save your favorite items to your wishlist for later
                </p>
              </div>
              <Link to="/shop">
                <Button variant="primary" size="lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {/* View Toggle (Optional - for future) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="flex">
                    <ProductCard product={product} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </MainLayout>
  );
}
