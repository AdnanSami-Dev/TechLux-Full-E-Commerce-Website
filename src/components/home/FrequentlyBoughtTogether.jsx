import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../cards/ProductCard";
import { frequentlyBoughtProducts } from "../../data/products";
import Button from "../ui/Button";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function FrequentlyBoughtTogether({ onQuickView }) {
  const dispatch = useDispatch();
  
  const handleAddAllToCart = () => {
    frequentlyBoughtProducts.forEach(product => {
      dispatch(addToCart(product));
    });
    toast.success('All products added to cart!');
  };

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionTitle title="🛒 Frequently Bought Together" subtitle="Save more when you buy together!" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {frequentlyBoughtProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex"
            >
              <ProductCard product={product} onQuickView={onQuickView} className="h-full" />
              {index < frequentlyBoughtProducts.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <FiPlus size={16} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" onClick={handleAddAllToCart}>
            <FiArrowRight className="mr-2" /> Add All To Cart
          </Button>
        </div>
      </Container>
    </section>
  );
}
