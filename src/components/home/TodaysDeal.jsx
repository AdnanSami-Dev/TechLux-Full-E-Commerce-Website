import ProductSection from "../common/ProductSection";
import { todaysDealProducts } from "../../data/products";

export default function TodaysDeal() {
  return (
    <ProductSection
      title="Today's Deal"
      subtitle="Unbeatable prices for today only!"
      products={todaysDealProducts}
      layout="grid"
    />
  );
}
