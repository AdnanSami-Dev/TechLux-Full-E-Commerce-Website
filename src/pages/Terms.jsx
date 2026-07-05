import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';

export default function Terms() {
  return (
    <MainLayout>
      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12">Terms of Service</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">1. Agreement to Terms</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  By accessing and using TechLux, you agree to be bound by these Terms of Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">2. Product Information</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  We strive to display accurate product information. However, we do not warrant that descriptions, pricing, or availability are error-free.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">3. Pricing</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Prices are subject to change without notice. The price charged at the time of purchase is the final price.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">4. User Accounts</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">5. Limitation of Liability</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  TechLux shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
