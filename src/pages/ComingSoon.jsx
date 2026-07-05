import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FiBell } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const handleNotify = (e) => {
    e.preventDefault();
    toast.success('Thanks! We will notify you when we launch!');
    setEmail('');
  };

  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20">
              <FiBell size={64} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Coming Soon!</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Something amazing is on the way. Subscribe to be the first to know when we launch!
            </p>
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Notify Me
              </Button>
            </form>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
