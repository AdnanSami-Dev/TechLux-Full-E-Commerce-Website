import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function AdvertisementBanner() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="bg-gradient-to-r from-secondary to-primary/80 p-10 md:p-16 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Limited Time Offer!
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Upgrade Your Tech Today
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                  Discover our premium collection with amazing discounts! Don't miss out!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg">Shop Now</Button>
                  <Button variant="outline" size="lg" className="bg-white text-secondary hover:bg-white/90 border-white">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                  alt="Advertisement"
                  className="rounded-2xl shadow-2xl max-w-md"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
