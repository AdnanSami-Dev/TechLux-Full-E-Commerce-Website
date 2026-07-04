import LuxuryHeroSlider from "./LuxuryHeroSlider";
import PromotionalBanner from "./PromotionalBanner";
import CampaignBanner from "./CampaignBanner";
import DiscountBanner from "./DiscountBanner";

export default function HeroSection() {
  return (
    <>
      <LuxuryHeroSlider />
      <PromotionalBanner />
      <CampaignBanner />
      <DiscountBanner />
    </>
  );
}
