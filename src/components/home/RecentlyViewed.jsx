import ProductSection from "../common/ProductSection";
import { recentlyViewedProducts } from "../../data/products";

export default function RecentlyViewed() {
  return (
    <ProductSection
      title="👀 Recently Viewed"
      subtitle="Products you've looked at before!"
      products={recentlyViewedProducts}
      layout="slider"
    />
  );
}
