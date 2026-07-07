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

  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  return (
    <MainLayout>
      <HeroSection />
      <Brands />
      <FlashSale onQuickView={handleQuickView} />
      <TodaysDeal onQuickView={handleQuickView} />
      <TrendingProducts onQuickView={handleQuickView} />
      <FeaturedProducts onQuickView={handleQuickView} />
      <TopRated onQuickView={handleQuickView} />
      <BestSellers onQuickView={handleQuickView} />
      <NewArrivals onQuickView={handleQuickView} />
      <AdvertisementBanner />
      <CampaignBanner />
      <ShopByCategory />
      <RecommendedProducts onQuickView={handleQuickView} />
      <FrequentlyBoughtTogether onQuickView={handleQuickView} />
      <RecentlyViewed onQuickView={handleQuickView} />
      <Testimonials />
      <InstagramFeed />
      <PartnerBrands />
      <Newsletter />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={handleCloseQuickView}
      />
    </MainLayout>
  );
}

export default Home;
