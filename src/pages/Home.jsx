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
import ShopByCategory from "../components/home/ShopByCategory";
import RecommendedProducts from "../components/home/RecommendedProducts";
import FrequentlyBoughtTogether from "../components/home/FrequentlyBoughtTogether";
import RecentlyViewed from "../components/home/RecentlyViewed";
import Testimonials from "../components/home/Testimonials";
import InstagramFeed from "../components/home/InstagramFeed";
import PartnerBrands from "../components/home/PartnerBrands";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <Brands />
      <FlashSale />
      <TodaysDeal />
      <TrendingProducts />
      <FeaturedProducts />
      <TopRated />
      <BestSellers />
      <NewArrivals />
      <AdvertisementBanner />
      <ShopByCategory />
      <RecommendedProducts />
      <FrequentlyBoughtTogether />
      <RecentlyViewed />
      <Testimonials />
      <InstagramFeed />
      <PartnerBrands />
      <Newsletter />
    </MainLayout>
  );
}

export default Home;
