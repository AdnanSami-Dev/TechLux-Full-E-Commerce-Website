import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unused products. Just send us an email and we will process your return immediately.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days, and overnight shipping takes 1 business day.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to over 100 countries worldwide. Shipping rates and times vary depending on your location.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive an email with a tracking number and a link to track your package.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and our store credit.'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use industry-standard encryption to protect your personal and payment information.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <MainLayout>
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and policies.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
              >
                <button
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-secondary">{faq.question}</span>
                  {openIndex === index ? (
                    <FiChevronUp size={24} className="text-primary" />
                  ) : (
                    <FiChevronDown size={24} className="text-text-muted" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
