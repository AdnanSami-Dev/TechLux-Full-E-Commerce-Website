import ProductSection from "../common/ProductSection";
import { bestSellersProducts } from "../../data/products";

export default function BestSellers() {
  return (
    <ProductSection
      title="🏆 Best Sellers"
      subtitle="Our most popular products of all time!"
      products={bestSellersProducts}
      layout="grid"
    />
  );
}
