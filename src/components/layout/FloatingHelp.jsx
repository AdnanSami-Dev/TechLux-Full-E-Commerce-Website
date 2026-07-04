import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiMail, FiHeadphones } from "react-icons/fi";
import Button from "../ui/Button";

export default function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "WhatsApp", icon: FiSend, color: "bg-green-500" },
    { label: "Live Chat", icon: FiMessageCircle, color: "bg-blue-500" },
    { label: "Email", icon: FiMail, color: "bg-purple-500" },
    { label: "Support", icon: FiHeadphones, color: "bg-primary" },
  ];

  return (
    <div className="fixed right-4 bottom-20 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 flex flex-col gap-2"
          >
            {options.map((option, idx) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-white ${option.color}`}
              >
                <option.icon size={18} />
                <span className="text-sm font-medium">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <Button size="icon" className="rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={20} /> : <FiMessageCircle size={20} />}
      </Button>
    </div>
  );
}
