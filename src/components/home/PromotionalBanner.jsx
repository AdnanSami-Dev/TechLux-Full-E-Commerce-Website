import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function PromotionalBanner() {
  return (
    <section className="py-8 bg-card">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Free Shipping on Orders Over $100</h3>
            <p className="text-white/80">Limited time offer - Shop now and save on delivery</p>
          </div>
          <Button variant="secondary" className="bg-white text-secondary hover:bg-white/90">
            Shop Now
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
