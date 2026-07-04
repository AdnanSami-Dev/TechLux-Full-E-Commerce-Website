import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function CampaignBanner() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First Campaign Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-warning/10 to-accent/20 p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-warning font-semibold text-sm uppercase tracking-wider mb-2 block">Summer Sale</span>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Build Your Dream PC</h3>
                <p className="text-text-secondary mb-4">Get up to 30% off on all components</p>
                <Button variant="secondary">Shop Components</Button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"
                alt="PC Components"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Campaign Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/10 to-secondary/10 p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-success font-semibold text-sm uppercase tracking-wider mb-2 block">New Arrivals</span>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Premium Laptops</h3>
                <p className="text-text-secondary mb-4">Check out our latest collection</p>
                <Button variant="primary">View Laptops</Button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400"
                alt="Laptops"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
