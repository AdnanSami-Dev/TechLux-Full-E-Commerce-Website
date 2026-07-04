import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";

const categories = [
  {
    name: "Desktop",
    sub: [
      { name: "Gaming PC", href: "#" },
      { name: "Workstation", href: "#" },
      { name: "All-in-One", href: "#" },
      { name: "Custom Build", href: "#" },
    ],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Laptop",
    sub: [
      { name: "Gaming Laptop", href: "#" },
      { name: "Ultrabook", href: "#" },
      { name: "Business Laptop", href: "#" },
      { name: "2-in-1 Laptop", href: "#" },
    ],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Components",
    sub: [
      { name: "Processor", href: "#" },
      { name: "Graphics Card", href: "#" },
      { name: "Motherboard", href: "#" },
      { name: "RAM", href: "#" },
      { name: "SSD", href: "#" },
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Accessories",
    sub: [
      { name: "Keyboard", href: "#" },
      { name: "Mouse", href: "#" },
      { name: "Headphones", href: "#" },
      { name: "Webcam", href: "#" },
    ],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Gaming",
    sub: [
      { name: "Consoles", href: "#" },
      { name: "Controllers", href: "#" },
      { name: "VR", href: "#" },
    ],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400",
  },
];

export default function MegaNavigation() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <nav className="hidden lg:block border-t border-border bg-card">
      <Container className="flex items-center gap-8 py-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative group"
            onMouseEnter={() => setActiveCategory(cat.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button className="font-semibold text-secondary hover:text-primary transition-colors py-2">
              {cat.name}
            </button>
            <AnimatePresence>
              {activeCategory === cat.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-[700px] bg-card shadow-2xl border border-border rounded-xl overflow-hidden z-50"
                >
                  <div className="grid grid-cols-3">
                    <div className="col-span-2 p-6">
                      <h4 className="font-bold text-secondary mb-4">{cat.name}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {cat.sub.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="text-text-secondary hover:text-primary transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 flex items-center justify-center">
                      <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-4">
          <button className="text-danger font-bold hover:underline">Hot Deals</button>
          <Button variant="outline" size="sm">
            PC Builder
          </Button>
        </div>
      </Container>
    </nav>
  );
}
