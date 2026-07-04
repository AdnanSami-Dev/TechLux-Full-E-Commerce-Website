import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function DiscountBanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-danger/10 to-warning/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 px-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Up to <span className="text-danger">50% OFF</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Limited time! Don't miss out on our biggest sale of the season!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Shop Deals</Button>
            <Button variant="outline" size="lg">View All</Button>
          </div>
        </motion.div>
      </Container>
      </section>
  );
}
