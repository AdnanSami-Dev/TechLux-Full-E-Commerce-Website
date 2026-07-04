import ProductSection from "../common/ProductSection";
import { topRatedProducts } from "../../data/products";

export default function TopRated() {
  return (
    <ProductSection
      title="⭐ Top Rated"
      subtitle="Highest-rated products by our customers!"
      products={topRatedProducts}
      layout="grid"
    />
  );
}
