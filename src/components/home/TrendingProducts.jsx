import ProductSection from "../common/ProductSection";
import { trendingProducts } from "../../data/products";

export default function TrendingProducts() {
  return (
    <ProductSection
      title="Trending Products"
      subtitle="What everyone's buying right now!"
      products={trendingProducts}
      layout="grid"
    />
  );
}
