import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronRight } from "react-icons/fi";
import Button from "../ui/Button";

const categories = [
  {
    name: "Desktop",
    sub: ["Gaming PC", "Workstation", "All-in-One", "Custom Build"],
  },
  {
    name: "Laptop",
    sub: ["Gaming Laptop", "Ultrabook", "Business Laptop", "2-in-1 Laptop"],
  },
  {
    name: "Components",
    sub: ["Processor", "Graphics Card", "Motherboard", "RAM", "SSD"],
  },
  {
    name: "Accessories",
    sub: ["Keyboard", "Mouse", "Headphones", "Webcam"],
  },
  {
    name: "Gaming",
    sub: ["Consoles", "Controllers", "VR"],
  },
];

export default function MobileNavigation({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[70]"
          />
          {/* Nav */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border shadow-2xl z-[71] overflow-y-auto"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary">Menu</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <FiX size={20} />
              </Button>
            </div>
            <div className="p-4">
              {categories.map((cat) => (
                <div key={cat.name} className="mb-1">
                  <button
                    className="w-full flex items-center justify-between py-2 font-medium text-secondary"
                    onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                  >
                    {cat.name}
                    <FiChevronRight
                      size={18}
                      className={`transition-transform ${expandedCategory === cat.name ? "rotate-90" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedCategory === cat.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 overflow-hidden"
                      >
                        {cat.sub.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block py-1.5 text-text-secondary hover:text-primary"
                            onClick={onClose}
                          >
                            {sub}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
