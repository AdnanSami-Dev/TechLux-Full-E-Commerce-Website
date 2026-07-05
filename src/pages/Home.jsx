import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/home/HeroSection";
import Brands from "../components/home/Brands";
import FlashSale from "../components/home/FlashSale";
import TodaysDeal from "../components/home/TodaysDeal";
import TrendingProducts from "../components/home/TrendingProducts";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TopRated from "../components/home/TopRated";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import AdvertisementBanner from "../components/home/AdvertisementBanner";
import CampaignBanner from "../components/home/CampaignBanner";
import ShopByCategory from "../components/home/ShopByCategory";
import RecommendedProducts from "../components/home/RecommendedProducts";
import FrequentlyBoughtTogether from "../components/home/FrequentlyBoughtTogether";
import RecentlyViewed from "../components/home/RecentlyViewed";
import Testimonials from "../components/home/Testimonials";
import InstagramFeed from "../components/home/InstagramFeed";
import PartnerBrands from "../components/home/PartnerBrands";
import Newsletter from "../components/home/Newsletter";
import ProductQuickView from "../components/cards/ProductQuickView";

function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  const handleWishlistToggle = (product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleCompareToggle = (product) => {
    setCompareList((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  return (
    <MainLayout>
      <HeroSection />
      <Brands />
      <FlashSale
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <TodaysDeal
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <TrendingProducts
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <FeaturedProducts
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <TopRated
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <BestSellers
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <NewArrivals
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <AdvertisementBanner />
      <CampaignBanner />
      <ShopByCategory />
      <RecommendedProducts
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <FrequentlyBoughtTogether
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <RecentlyViewed
        onQuickView={handleQuickView}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        compareList={compareList}
      />
      <Testimonials />
      <InstagramFeed />
      <PartnerBrands />
      <Newsletter />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
        onWishlistToggle={handleWishlistToggle}
        onCompareToggle={handleCompareToggle}
      />
    </MainLayout>
  );
}

export default Home;
