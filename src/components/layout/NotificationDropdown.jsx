import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { FiBell } from "react-icons/fi";

const mockNotifications = [
  { id: 1, title: "Order Shipped!", message: "Your order #1234 has been shipped", time: "2 hours ago", isRead: false },
  { id: 2, title: "Sale Alert", message: "Up to 50% off on gaming accessories", time: "1 day ago", isRead: true },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:text-primary transition-colors"
      >
        <FiBell size={20} />
        <span className="absolute -top-2 -right-2 bg-danger text-danger-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
          {mockNotifications.filter(n => !n.isRead).length}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <p className="font-medium text-secondary">Notifications</p>
              <button className="text-sm text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {mockNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted cursor-pointer ${!notif.isRead ? "bg-primary/5" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-secondary text-sm">{notif.title}</p>
                      <p className="text-text-secondary text-sm mt-1">{notif.message}</p>
                      <p className="text-text-muted text-xs mt-2">{notif.time}</p>
                    </div>
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border text-center">
              <Button variant="ghost" size="sm" className="w-full">
                View All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
