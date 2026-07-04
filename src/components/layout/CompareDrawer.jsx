import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiTrash2, FiColumns } from "react-icons/fi";

// Mock data
const mockCompareItems = [
  {
    id: 1,
    name: "Gaming Laptop A",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Gaming Laptop B",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1593642532956-d415d92da5e6?auto=format&fit=crop&q=80&w=200",
  },
];

export default function CompareDrawer({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Compare Products" position="right">
      {mockCompareItems.length === 0 ? (
        <div className="text-center py-10">
          <FiColumns size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No products to compare</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockCompareItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-medium text-secondary mb-1 line-clamp-2">{item.name}</h4>
                <p className="text-primary font-semibold mb-2">${item.price.toFixed(2)}</p>
                <button className="text-danger hover:text-danger/80 flex items-center gap-1">
                  <FiTrash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
          {mockCompareItems.length >= 2 && (
            <Button className="w-full mt-4">
              Compare Now
            </Button>
          )}
        </div>
      )}
    </Drawer>
  );
}
