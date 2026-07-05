import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';

export default function Cookies() {
  return (
    <MainLayout>
      <section className="py-20">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12">Cookie Policy</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">1. What are Cookies?</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  Cookies are small text files stored on your device that help websites remember your preferences and improve your browsing experience.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">2. Types of Cookies We Use</h2>
                <ul className="list-disc list-inside text-text-muted text-lg space-y-2">
                  <li>Essential cookies: Required for basic website functionality</li>
                  <li>Performance cookies: Help us improve our website performance</li>
                  <li>Functional cookies: Remember your preferences</li>
                  <li>Marketing cookies: Show you relevant ads</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">3. Managing Cookies</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  You can manage your cookie preferences in your browser settings at any time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-secondary mb-4">4. Contact Us</h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  If you have any questions about our Cookie Policy, please contact us at privacy@techlux.com.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
