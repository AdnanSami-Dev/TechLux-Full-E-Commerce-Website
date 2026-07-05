import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { 
  FiCheckCircle, 
  FiTruck, 
  FiGift, 
  FiHeadphones, 
  FiGlobe, 
  FiAward, 
  FiHeart, 
  FiUsers 
} from 'react-icons/fi';

const team = [
  { name: 'John Doe', role: 'CEO & Founder', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Jane Smith', role: 'Product Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Mike Johnson', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sarah Williams', role: 'Marketing Director', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
];

const values = [
  { icon: FiAward, title: 'Quality', desc: 'We never compromise on the quality of our products and services.' },
  { icon: FiHeart, title: 'Customer First', desc: 'Our customers are at the center of everything we do.' },
  { icon: FiGlobe, title: 'Sustainability', desc: 'We are committed to making a positive impact on the environment.' },
  { icon: FiUsers, title: 'Innovation', desc: 'We constantly innovate to bring you the best products.' }
];

export default function About() {
  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <Container className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-secondary mb-6"
          >
            About TechLux
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-8"
          >
            Building premium technology experiences since 2015. We curate the best tech products with luxury design.
          </motion.p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-9xl opacity-20 text-primary">✨</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Our Story</h2>
              <p className="text-text-muted text-lg mb-4">
                TechLux was founded with a simple mission: to bring premium technology products to discerning customers who appreciate both quality and design.
              </p>
              <p className="text-text-muted text-lg mb-6">
                What started as a small boutique in New York has grown into a global destination for luxury tech accessories.
              </p>
              <Button variant="primary" size="lg">Shop Now</Button>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">{value.title}</h3>
                  <p className="text-text-muted">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-primary/20 object-cover"
                />
                <h3 className="text-xl font-semibold text-secondary mb-1">{member.name}</h3>
                <p className="text-text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Ready to Experience Luxury?</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
            Browse our collection of premium tech products and elevate your tech experience today.
          </p>
          <Button variant="primary" size="lg">Start Shopping</Button>
        </Container>
      </section>
    </MainLayout>
  );
}
