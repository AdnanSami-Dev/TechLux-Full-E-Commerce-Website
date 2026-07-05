import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

export default function ServerError() {
  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-8xl md:text-9xl font-black text-danger opacity-20 mb-6">500</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Something Went Wrong</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              We're sorry, but something went wrong on our end. Please try again later.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button variant="primary" size="lg" leftIcon={<FiHome />}>
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FiRefreshCw />}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
