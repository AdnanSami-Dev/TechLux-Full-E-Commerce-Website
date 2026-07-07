import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../cards/ProductCard";
import Button from "../ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductSection({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllText = "View All",
  layout = "grid",
  onQuickView,
}) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />
        <div className="mt-10">
          {layout === "slider" ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              navigation
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex">
                  <ProductCard
                    product={product}
                    onQuickView={onQuickView}
                    className="h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex"
                >
                  <ProductCard
                    product={product}
                    onQuickView={onQuickView}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          )}
          {showViewAll && (
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg">
                {viewAllText}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
