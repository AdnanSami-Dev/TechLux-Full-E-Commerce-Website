import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import Button from "./Button";

export default function Drawer({ isOpen, onClose, title, children, position = "right", className }) {
  const positions = {
    right: "right-0 top-0 h-full",
    left: "left-0 top-0 h-full",
    bottom: "bottom-0 left-0 w-full",
    top: "top-0 left-0 w-full",
  };

  const initial = {
    right: { x: "100%" },
    left: { x: "-100%" },
    bottom: { y: "100%" },
    top: { y: "-100%" },
  };

  const animate = {
    right: { x: 0 },
    left: { x: 0 },
    bottom: { y: 0 },
    top: { y: 0 },
  };

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
            className="fixed inset-0 bg-black/50 z-50"
          />
          {/* Drawer Content */}
          <motion.div
            initial={initial[position]}
            animate={animate[position]}
            exit={initial[position]}
            className={cn(
              "fixed z-50 bg-card shadow-2xl border-border border",
              positions[position],
              position === "left" || position === "right" ? "w-80" : "max-h-[80vh]",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-secondary">{title}</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <FiX size={20} />
              </Button>
            </div>
            {/* Body */}
            <div className="p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
