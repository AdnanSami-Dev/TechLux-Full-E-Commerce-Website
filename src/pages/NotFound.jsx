import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-8xl md:text-9xl font-black text-primary opacity-20 mb-6">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Page Not Found</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button variant="primary" size="lg" leftIcon={<FiHome />}>
                  Back to Home
                </Button>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-text-muted hover:text-secondary transition-colors"
              >
                <FiArrowLeft size={20} />
                Go Back
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
