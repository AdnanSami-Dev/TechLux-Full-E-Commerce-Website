import { useState, useEffect } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { FiSearch, FiHeart, FiShoppingCart, FiColumns, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import TopAnnouncementBar from "./TopAnnouncementBar";
import MegaNavigation from "./MegaNavigation";
import { selectCartCount } from "../../redux/slices/cartSlice";

export default function MainHeader({
  isSearchOpen,
  setIsSearchOpen,
  isCartOpen,
  setIsCartOpen,
  isWishlistOpen,
  setIsWishlistOpen,
  isCompareOpen,
  setIsCompareOpen,
  isMobileNavOpen,
  setIsMobileNavOpen,
}) {
  const [isSticky, setIsSticky] = useState(false);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const cartCount = useSelector(selectCartCount);
  const compareCount = useSelector(state => state.compare.items.length);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopAnnouncementBar />
      <header
        className={`bg-card border-b border-border z-40 transition-all duration-300 ${
          isSticky ? "sticky top-0 shadow-md" : ""
        }`}
      >
        <Container className="py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
              <FiMenu size={24} />
            </Button>
            <a href="/" className="text-2xl font-bold text-secondary">
              <span className="text-primary">Tech</span>Lux
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Input
                placeholder="Search for products..."
                className="pl-12 pr-12"
                onClick={() => setIsSearchOpen(true)}
              />
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer"
                size={20}
                onClick={() => setIsSearchOpen(true)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <FiSearch size={20} />
            </Button>

            <NotificationDropdown />

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative hover:text-primary transition-colors"
            >
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative hover:text-primary transition-colors hidden sm:block"
            >
              <FiColumns size={20} />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-warning text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <UserDropdown />
          </div>
        </Container>

        {/* Mega Navigation */}
        <MegaNavigation />
      </header>
    </>
  );
}
