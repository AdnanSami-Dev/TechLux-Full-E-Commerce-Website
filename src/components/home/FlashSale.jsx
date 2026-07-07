import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../cards/ProductCard";
import { flashSaleProducts } from "../../data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Button from "../ui/Button";

export default function FlashSale({ onQuickView }) {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-danger/5 to-warning/5">
      <Container>
        <SectionTitle title="⚡ Flash Sale" subtitle="Limited time offers! Grab them before they're gone" />
        <div className="mt-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-danger">Ending in:</div>
            <div className="flex gap-2">
              {["12", "45", "30"].map((time, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-danger text-white rounded-lg flex flex-col items-center justify-center"
                >
                  <span className="font-bold">{time}</span>
                  <span className="text-[10px] uppercase">{["Hrs", "Mins", "Secs"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {flashSaleProducts.map((product) => (
            <SwiperSlide key={product.id} className="flex">
              <ProductCard product={product} onQuickView={onQuickView} className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
