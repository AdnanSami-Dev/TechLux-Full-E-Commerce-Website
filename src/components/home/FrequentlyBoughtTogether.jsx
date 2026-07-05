import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../cards/ProductCard";
import { frequentlyBoughtProducts } from "../../data/products";
import Button from "../ui/Button";
import { FiPlus, FiArrowRight } from "react-icons/fi";

export default function FrequentlyBoughtTogether({
  onQuickView,
  onWishlistToggle,
  onCompareToggle,
  onAddToCart,
  wishlist = [],
  compareList = [],
}) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionTitle title="🛒 Frequently Bought Together" subtitle="Save more when you buy together!" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {frequentlyBoughtProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard
                product={{
                  ...product,
                  isWishlisted: wishlist.includes(product.id),
                  isCompared: compareList.includes(product.id),
                }}
                onQuickView={onQuickView}
                onWishlistToggle={onWishlistToggle}
                onCompareToggle={onCompareToggle}
                onAddToCart={onAddToCart}
              />
              {index < frequentlyBoughtProducts.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <FiPlus size={16} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg">
            <FiArrowRight className="mr-2" /> Add All To Cart
          </Button>
        </div>
      </Container>
    </section>
  );
}
