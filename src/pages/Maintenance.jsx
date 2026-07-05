import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { FiTool } from 'react-icons/fi';

export default function Maintenance() {
  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
              <FiTool size={64} className="text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Under Maintenance</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              We're currently performing scheduled maintenance. We'll be back online shortly!
            </p>
            <p className="text-text-muted text-sm">
              Expected to be back: <span className="font-semibold text-secondary">in 2 hours</span>
            </p>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
