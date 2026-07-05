import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import {
  removeFromCart,
  updateQuantity,
  selectCartSubtotal,
  selectCartCount
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const subtotal = useSelector(selectCartSubtotal);

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: Math.max(1, item.quantity + delta) }));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed');
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart" position="right">
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <FiShoppingBag size={48} className="text-primary opacity-60" />
          </div>
          <p className="text-text-secondary mb-6">Your cart is empty</p>
          <Link to="/shop" onClick={onClose}>
            <Button variant="primary">Browse Products</Button>
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 bg-muted/30 rounded-xl p-3 border border-border"
                >
                  <Link to={`/product/${item.id}`} onClick={onClose} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-border"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} onClick={onClose} className="hover:text-primary transition-colors">
                      <h4 className="font-medium text-secondary mb-1 line-clamp-2">{item.name}</h4>
                    </Link>
                    <p className="text-primary font-semibold mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="px-2 py-1.5 hover:bg-muted transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3 py-1.5 border-x border-border font-medium bg-white">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="px-2 py-1.5 hover:bg-muted transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-danger hover:text-danger/80 p-2"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="border-t border-border pt-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-secondary">Subtotal ({selectCartCount({ cart: { items: cartItems } })} items)</span>
              <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-text-muted text-center">
              Shipping and taxes calculated at checkout
            </p>
            <Link to="/cart" onClick={onClose} className="block">
              <Button variant="primary" className="w-full" size="lg" rightIcon={<FiArrowRight size={18} />}>
                View Cart & Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
