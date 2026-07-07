import { useState } from "react";
import MainHeader from "../components/layout/MainHeader";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/layout/ScrollProgress";
import BackToTop from "../components/layout/BackToTop";
import FloatingHelp from "../components/layout/FloatingHelp";
import FloatingCart from "../components/layout/FloatingCart";
import SearchModal from "../components/layout/SearchModal";
import CartDrawer from "../components/layout/CartDrawer";
import WishlistDrawer from "../components/layout/WishlistDrawer";
import CompareDrawer from "../components/layout/CompareDrawer";
import MobileNavigation from "../components/layout/MobileNavigation";

export default function MainLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <MainHeader 
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isWishlistOpen={isWishlistOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        isCompareOpen={isCompareOpen}
        setIsCompareOpen={setIsCompareOpen}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <FloatingHelp />
      <FloatingCart setIsCartOpen={setIsCartOpen} />
      {/* Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <CompareDrawer isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} />
      <MobileNavigation isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </div>
  );
}
