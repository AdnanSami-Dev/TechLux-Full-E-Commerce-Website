import ProductSection from "../common/ProductSection";
import { recommendedProducts } from "../../data/products";

export default function RecommendedProducts() {
  return (
    <ProductSection
      title="💡 Recommended For You"
      subtitle="Products we think you'll love!"
      products={recommendedProducts}
      layout="grid"
    />
  );
}
