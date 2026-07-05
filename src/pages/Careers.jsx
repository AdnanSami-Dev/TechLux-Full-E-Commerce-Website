import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';

const jobs = [
  {
    title: 'Senior Product Designer',
    location: 'New York, NY',
    type: 'Full-Time',
    salary: '$120k-$150k',
    description: 'We are looking for an experienced product designer to help us shape the future of luxury tech.'
  },
  {
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$100k-$130k',
    description: 'Join our engineering team and build beautiful, performant web experiences for our customers.'
  },
  {
    title: 'Marketing Manager',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    salary: '$90k-$120k',
    description: 'Lead our marketing efforts and help us grow our customer base worldwide.'
  },
  {
    title: 'Customer Support Specialist',
    location: 'Remote',
    type: 'Part-Time',
    salary: '$40k-$50k',
    description: 'Help our customers with their questions and provide world-class support.'
  }
];

export default function Careers() {
  return (
    <MainLayout>
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <Container className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Help us build the future of luxury tech. We're always looking for talented people to join our team.
          </motion.p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-secondary">{job.title}</h3>
                  </div>
                  <Button variant="primary">Apply Now</Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 mb-4 text-text-muted">
                  <div className="flex items-center gap-2">
                    <FiMapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock size={18} />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign size={18} />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <p className="text-text-muted">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
