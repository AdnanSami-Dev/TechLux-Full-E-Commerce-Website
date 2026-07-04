import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "../ui/Container";
import Button from "../ui/Button";

const slides = [
  {
    id: 1,
    title: "Next-Gen Gaming",
    subtitle: "Experience the power of RTX 40 series",
    description: "Unlock ultra-performance with our premium gaming PCs and laptops",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920",
    buttonText: "Shop Now",
    buttonVariant: "primary",
  },
  {
    id: 2,
    title: "Luxury Audio",
    subtitle: "Immerse yourself in crystal clear sound",
    description: "Premium headphones and speakers for audiophiles",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1920",
    buttonText: "Explore",
    buttonVariant: "secondary",
  },
  {
    id: 3,
    title: "Productivity Redefined",
    subtitle: "Work smarter with the best tech",
    description: "Premium laptops and accessories for professionals",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1920",
    buttonText: "Discover",
    buttonVariant: "primary",
  },
];

export default function LuxuryHeroSlider() {
  return (
    <section className="overflow-hidden bg-secondary/5">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="h-[500px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-transparent" />
            <Container className="relative h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-white"
              >
                <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant={slide.buttonVariant} size="lg">
                    {slide.buttonText}
                  </Button>
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
