import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";

// Mock data
const mockCartItems = [
  {
    id: 1,
    name: "Premium Gaming Laptop RTX 4080",
    price: 1499.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Mechanical Keyboard RGB Backlit",
    price: 129.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200",
  },
];

export default function CartDrawer({ isOpen, onClose }) {
  const total = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart" position="right">
      {mockCartItems.length === 0 ? (
        <div className="text-center py-10">
          <FiShoppingBag size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-medium text-secondary mb-1 line-clamp-2">{item.name}</h4>
                  <p className="text-primary font-semibold mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button className="px-2 py-1 hover:bg-muted transition-colors">
                        <FiMinus size={14} />
                      </button>
                      <span className="px-3 py-1 border-x border-border">{item.quantity}</span>
                      <button className="px-2 py-1 hover:bg-muted transition-colors">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <button className="text-danger hover:text-danger/80">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-secondary">Total</span>
              <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg">
              Checkout
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}
