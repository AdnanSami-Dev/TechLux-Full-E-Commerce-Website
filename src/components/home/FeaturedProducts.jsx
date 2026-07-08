import ProductSection from "../common/ProductSection";
import { featuredProducts } from "../../data/products";

export default function FeaturedProducts() {
  return (
    <ProductSection
      title="Featured Products"
      subtitle="Handpicked selection of premium tech products just for you!"
      products={featuredProducts}
      layout="grid"
    />
  );
}
