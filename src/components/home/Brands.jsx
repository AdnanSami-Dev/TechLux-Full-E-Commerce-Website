import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const brands = [
  "Apple",
  "Samsung",
  "Intel",
  "AMD",
  "NVIDIA",
  "ASUS",
  "MSI",
  "Razer",
  "Logitech",
  "Corsair",
];

export default function Brands() {
  return (
    <section className="py-12 bg-card border-y border-border">
      <Container>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 8 },
          }}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {brands.map((brand, i) => (
            <SwiperSlide key={i}>
              <div className="py-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-text-muted hover:text-primary transition-colors">
                  {brand}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
