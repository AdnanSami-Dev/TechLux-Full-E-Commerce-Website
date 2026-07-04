import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";

// Mock data
const mockWishlistItems = [
  {
    id: 1,
    name: "Wireless Gaming Headphones 7.1",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Ergonomic Gaming Chair",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=200",
  },
];

export default function WishlistDrawer({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Wishlist" position="right">
      {mockWishlistItems.length === 0 ? (
        <div className="text-center py-10">
          <FiHeart size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockWishlistItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-medium text-secondary mb-1 line-clamp-2">{item.name}</h4>
                <p className="text-primary font-semibold mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FiShoppingCart size={16} className="mr-1" /> Add to Cart
                  </Button>
                  <button className="text-danger hover:text-danger/80 p-2">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
