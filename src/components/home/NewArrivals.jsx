import ProductSection from "../common/ProductSection";
import { newArrivalsProducts } from "../../data/products";

export default function NewArrivals() {
  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Check out our latest products!"
      products={newArrivalsProducts}
      layout="grid"
    />
  );
}
