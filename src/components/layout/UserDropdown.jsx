import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { FiUser, FiHeart, FiShoppingBag, FiSettings, FiLogOut } from "react-icons/fi";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "My Account", icon: FiUser, href: "#" },
    { label: "My Orders", icon: FiShoppingBag, href: "#" },
    { label: "Wishlist", icon: FiHeart, href: "#" },
    { label: "Settings", icon: FiSettings, href: "#" },
    { label: "Logout", icon: FiLogOut, href: "#" },
  ];

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <FiUser size={20} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="font-medium text-secondary">Guest User</p>
              <p className="text-sm text-text-secondary">Sign in to continue</p>
            </div>
            <div className="py-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={16} />
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <Button className="w-full" size="sm">Sign In</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
