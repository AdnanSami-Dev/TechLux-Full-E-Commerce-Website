import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';

export default function Refunds() {
  return (
    <MainLayout>
      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12">Refund Policy</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">1. Returns</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  We offer a 30-day return policy from the date of purchase for all unused and unopened products.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">2. Refund Process</h2>
                <ol className="list-decimal list-inside text-text-muted text-lg space-y-2">
                  <li>Contact our support team at support@techlux.com to initiate a return</li>
                  <li>Ship the product back to us in original packaging</li>
                  <li>We will inspect the product and process your refund within 5-7 business days</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">3. Exchanges</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  If you received a defective or wrong product, we will gladly exchange it for you free of charge.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">4. Non-returnable Items</h2>
                <ul className="list-disc list-inside text-text-muted text-lg space-y-2">
                  <li>Gift cards</li>
                  <li>Downloadable products</li>
                  <li>Personalized or custom products</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">5. Shipping Costs</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  If you are returning a product because you changed your mind, you will be responsible for return shipping costs.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
