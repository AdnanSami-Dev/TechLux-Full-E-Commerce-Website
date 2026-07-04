import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function SearchModal({ isOpen, onClose }) {
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
            className="fixed inset-0 bg-black/60 z-[60] flex items-start justify-center pt-20"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed z-[61] left-1/2 top-20 -translate-x-1/2 w-full max-w-3xl px-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <Input
                  placeholder="Search for products, brands, categories..."
                  className="pl-12 pr-12 text-lg py-4"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <FiX size={20} />
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-text-secondary mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Gaming Laptop", "Wireless Headphones", "Mechanical Keyboard", "GPU", "Monitor"].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
