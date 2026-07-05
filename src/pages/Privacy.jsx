import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';

export default function Privacy() {
  return (
    <MainLayout>
      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12">Privacy Policy</h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">1. Introduction</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Welcome to TechLux! We respect your privacy and are committed to protecting your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">2. Information We Collect</h2>
                <ul className="list-disc list-inside text-text-muted text-lg space-y-2">
                  <li>Personal identification information (name, email, phone number, address)</li>
                  <li>Payment information</li>
                  <li>Browsing and purchase history</li>
                  <li>Communications with us</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-text-muted text-lg space-y-2">
                  <li>Process your orders and payments</li>
                  <li>Provide customer support</li>
                  <li>Personalize your shopping experience</li>
                  <li>Send you updates and promotional emails (you can opt out at any time)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">4. Data Security</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  We implement appropriate security measures to protect your personal data from unauthorized access or disclosure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">5. Contact Us</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@techlux.com.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
