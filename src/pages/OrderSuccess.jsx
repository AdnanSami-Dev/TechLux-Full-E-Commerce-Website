import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import { resetCheckout } from '../redux/slices/checkoutSlice';

export default function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = useSelector(state => state.checkout.orderId);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
    return () => {
      dispatch(resetCheckout());
    };
  }, [orderId, navigate, dispatch]);

  if (!orderId) {
    return null;
  }

  return (
    <MainLayout>
      <section className="py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <FiCheckCircle size={80} className="text-primary" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-secondary mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-text-muted mb-8"
            >
              Thank you for your purchase. Your order has been received and is being processed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-8 max-w-md mx-auto mb-10"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-text-muted">Order Number</span>
                  <span className="font-bold text-secondary text-lg">{orderId}</span>
                </div>
                <p className="text-sm text-text-muted">
                  A confirmation email has been sent to your email address. You can track your order in your account.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/">
                <Button variant="primary" size="lg" leftIcon={<FiHome />}>
                  Back to Home
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" leftIcon={<FiShoppingBag />}>
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
