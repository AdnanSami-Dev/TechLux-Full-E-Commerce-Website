import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  { name: "John Doe", role: "Gamer", text: "Best tech products I've ever bought! The quality is amazing and the service was fantastic!", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Jane Smith", role: "Designer", text: "The premium products are exactly what I needed for my work setup. Highly recommend TechLux!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { name: "Mike Johnson", role: "Engineer", text: "Fast shipping, excellent packaging, and great customer support! Will definitely shop again!", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-secondary/5">
      <Container>
        <SectionTitle title="Testimonials" subtitle="What our customers are saying!" />
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-card p-8 rounded-2xl shadow-sm border border-border flex flex-col w-full h-full"
                >
                  <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                  <p className="text-text-secondary  mb-6 grow">{testimonial.text}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-secondary">{testimonial.name}</div>
                      <div className="text-sm text-text-muted">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
