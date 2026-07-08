import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const partnerBrands = ["Apple", "Samsung", "Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Razer", "Logitech", "Corsair", "Sony", "LG"];

export default function PartnerBrands() {
  return (
    <section className="py-12 md:py-16 bg-card border-y border-border">
      <Container>
        <SectionTitle title="Partner Brands" subtitle="Trusted by millions!" />
        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={30}
            loop
            autoplay={{ delay: 500, disableOnInteraction: false }}
            speed={1000}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 8 },
            }}
          >
            {partnerBrands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="py-4 flex items-center justify-center text-center text-2xl font-bold text-text-muted hover:text-primary transition-colors cursor-pointer">
                  {brand}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
