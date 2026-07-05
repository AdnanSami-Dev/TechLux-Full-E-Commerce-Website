import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';

export default function ShippingPolicy() {
  return (
    <MainLayout>
      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12">Shipping Policy</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">1. Shipping Methods</h2>
                <ul className="list-disc list-inside text-text-muted text-lg space-y-2">
                  <li>Standard: 5-7 business days ($4.99)</li>
                  <li>Express: 2-3 business days ($14.99)</li>
                  <li>Overnight: 1 business day ($29.99)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">2. Free Shipping</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Enjoy free standard shipping on all orders over $100!
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">3. International Shipping</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  We ship to over 100 countries worldwide. Shipping rates and delivery times vary by destination.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">4. Tracking</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Once your order has been shipped, you will receive an email with a tracking number and a link to track your package.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">5. Order Processing</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
