import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiGift, 
  FiTag, 
  FiTruck, 
  FiX,
  FiShoppingBag,
  FiArrowRight,
  FiSave,
  FiCheckCircle,
  FiDollarSign
} from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  removeFromCart,
  updateQuantity,
  saveForLater,
  moveToCart,
  removeFromSaved,
  applyCoupon,
  removeCoupon,
  applyGiftCard,
  removeGiftCard,
  setShippingMethod,
  selectCartSubtotal,
  selectCartTotal,
  selectShippingCost,
  selectTaxAmount,
  selectDiscountAmount,
  toggleUseWallet,
  setWalletAmount,
  toggleUseRewardPoints,
  setRewardPoints,
} from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const savedForLater = useSelector(state => state.cart.savedForLater);
  const coupon = useSelector(state => state.cart.coupon);
  const giftCard = useSelector(state => state.cart.giftCard);
  const shippingMethod = useSelector(state => state.cart.shippingMethod);
  const walletBalance = useSelector(state => state.cart.walletBalance);
  const userRewardPoints = useSelector(state => state.cart.userRewardPoints);
  const useWallet = useSelector(state => state.cart.useWallet);
  const walletAmount = useSelector(state => state.cart.walletAmount);
  const useRewardPoints = useSelector(state => state.cart.useRewardPoints);
  const rewardPoints = useSelector(state => state.cart.rewardPoints);
  
  const subtotal = selectCartSubtotal({ cart: { items: cartItems } });
  const shippingCost = useSelector(selectShippingCost);
  const tax = useSelector(selectTaxAmount);
  const discount = useSelector(selectDiscountAmount);
  const total = useSelector(state =>
    selectCartTotal({
      cart: {
        items: cartItems,
        coupon,
        giftCard,
        shippingMethod,
        useWallet,
        walletAmount,
        useRewardPoints,
        rewardPoints,
      },
    })
  );
  
  const [couponInput, setCouponInput] = useState('');
  const [giftCardInput, setGiftCardInput] = useState('');
  const [giftCardAmount, setGiftCardAmount] = useState('');
  const [showGiftCard, setShowGiftCard] = useState(false);

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: Math.max(1, item.quantity + delta) }));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleSaveForLater = (id) => {
    dispatch(saveForLater(id));
    toast.success('Item saved for later');
  };

  const handleMoveToCart = (id) => {
    dispatch(moveToCart(id));
    toast.success('Item moved to cart');
  };

  const handleRemoveFromSaved = (id) => {
    dispatch(removeFromSaved(id));
    toast.success('Item removed');
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      dispatch(applyCoupon(couponInput.trim()));
      if (!coupon) {
        toast.success('Coupon applied!');
      } else {
        toast.error('Invalid coupon code');
      }
      setCouponInput('');
    }
  };

  const handleApplyGiftCard = () => {
    if (giftCardInput.trim() && giftCardAmount > 0) {
      dispatch(applyGiftCard({ code: giftCardInput.trim(), amount: parseFloat(giftCardAmount) }));
      toast.success('Gift card applied!');
      setGiftCardInput('');
      setGiftCardAmount('');
      setShowGiftCard(false);
    }
  };

  const handleShippingMethodChange = (method) => {
    dispatch(setShippingMethod(method));
  };

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', cost: 4.99, days: 5 },
    { id: 'express', name: 'Express Shipping', cost: 14.99, days: 2 },
    { id: 'overnight', name: 'Overnight Shipping', cost: 29.99, days: 1 },
  ];

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <MainLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container className="py-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
            >
              <FiShoppingBag size={64} className="text-primary opacity-60" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-secondary mb-4"
            >
              Your Cart is Empty
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-muted mb-8 max-w-md mx-auto text-lg"
            >
              Looks like you haven't added anything to your cart yet. Browse our collection and find something you love!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/shop">
                <Button variant="primary" size="lg" className="shadow-lg shadow-primary/20">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </Container>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Cart', href: '/cart', active: true },
              ]}
              className="mb-8"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
                  >
                    <div className="divide-y divide-border">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                          className="p-6"
                        >
                          <div className="flex gap-4 md:gap-6">
                            {/* Product Image */}
                            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-border"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </Link>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                                <h3 className="font-semibold text-secondary line-clamp-2 mb-1">{item.name}</h3>
                              </Link>
                              <p className="text-primary font-bold text-lg mb-4">${item.price.toFixed(2)}</p>

                              <div className="flex flex-wrap items-center gap-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                    className="px-3 py-2 hover:bg-muted transition-colors"
                                  >
                                    <FiMinus size={16} />
                                  </button>
                                  <span className="px-4 py-2 border-x border-border font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, 1)}
                                    className="px-3 py-2 hover:bg-muted transition-colors"
                                  >
                                    <FiPlus size={16} />
                                  </button>
                                </div>

                                {/* Save & Remove */}
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => handleSaveForLater(item.id)}
                                    className="text-text-muted hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-medium"
                                  >
                                    <FiSave size={16} />
                                    Save for Later
                                  </button>
                                  <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="text-danger hover:text-danger/80 flex items-center gap-1.5 text-sm font-medium"
                                  >
                                    <FiTrash2 size={16} />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right hidden md:block">
                              <p className="font-bold text-secondary text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Saved For Later */}
                {savedForLater.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
                  >
                    <div className="p-6 border-b border-border bg-muted/30">
                      <h2 className="font-semibold text-secondary text-lg">Saved for Later ({savedForLater.length})</h2>
                    </div>
                    <div className="divide-y divide-border">
                      {savedForLater.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + index * 0.05 }}
                          className="p-6"
                        >
                          <div className="flex gap-4 md:gap-6">
                            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-border opacity-70">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                                <h3 className="font-semibold text-secondary line-clamp-2 mb-1 opacity-70">{item.name}</h3>
                              </Link>
                              <p className="text-primary font-bold text-lg mb-4 opacity-70">${item.price.toFixed(2)}</p>
                              <div className="flex flex-wrap items-center gap-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMoveToCart(item.id)}
                                  leftIcon={<FiShoppingBag size={16} />}
                                >
                                  Move to Cart
                                </Button>
                                <button
                                  onClick={() => handleRemoveFromSaved(item.id)}
                                  className="text-danger hover:text-danger/80 flex items-center gap-1.5 text-sm font-medium"
                                >
                                  <FiTrash2 size={16} />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden sticky top-24"
                >
                  <div className="p-6 border-b border-border">
                    <h2 className="font-semibold text-secondary text-xl">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Subtotal</span>
                      <span className="font-medium text-secondary">${subtotal.toFixed(2)}</span>
                    </div>

                    {/* Discount */}
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between items-center text-success"
                      >
                        <span>Discount</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                      </motion.div>
                    )}

                    {/* Gift Card */}
                    {giftCard && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between items-center text-primary"
                      >
                        <span>Gift Card</span>
                        <span className="font-medium">-${giftCard.amount.toFixed(2)}</span>
                      </motion.div>
                    )}

                    {/* Wallet */}
                    {useWallet && walletAmount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between items-center text-primary"
                      >
                        <span>Wallet</span>
                        <span className="font-medium">-${walletAmount.toFixed(2)}</span>
                      </motion.div>
                    )}

                    {/* Reward Points */}
                    {useRewardPoints && rewardPoints > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between items-center text-success"
                      >
                        <span>Reward Points ({rewardPoints})</span>
                        <span className="font-medium">-${(rewardPoints / 100).toFixed(2)}</span>
                      </motion.div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Shipping</span>
                      <span className={cn(
                        "font-medium",
                        shippingCost === 0 ? "text-success" : "text-secondary"
                      )}>
                        {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Tax</span>
                      <span className="font-medium text-secondary">${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-secondary text-lg">Total</span>
                        <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Shipping Methods */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-border pt-4 space-y-3">
                        <p className="font-medium text-secondary">Shipping Method</p>
                        {shippingMethods.map((method) => {
                          const isFree = method.cost === 0 || (coupon?.type === 'free_shipping') || subtotal >= 100;
                          const cost = isFree && method.id === 'standard' ? 0 : method.cost;
                          return (
                            <label
                              key={method.id}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                shippingMethod === method.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === method.id}
                                onChange={() => handleShippingMethodChange(method.id)}
                                className="w-4 h-4 text-primary"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-secondary">{method.name}</p>
                                <p className="text-sm text-text-muted">Arrives in {method.days} days</p>
                              </div>
                              <span className={cn(
                                "font-semibold",
                                isFree && method.id === 'standard' ? "text-success" : "text-secondary"
                              )}>
                                {isFree && method.id === 'standard' ? "Free" : `$${cost.toFixed(2)}`}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Coupon Code */}
                    <div className="border-t border-border pt-4 space-y-3">
                      <p className="font-medium text-secondary flex items-center gap-2">
                        <FiTag size={16} />
                        Coupon Code
                      </p>
                      {coupon ? (
                        <div className="flex items-center justify-between p-3 bg-success/10 rounded-xl border border-success/20">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-success" />
                            <span className="font-medium text-success">{coupon.code}</span>
                            <span className="text-sm text-text-muted">- {coupon.description}</span>
                          </div>
                          <button
                            onClick={() => {
                              dispatch(removeCoupon());
                              toast.success('Coupon removed');
                            }}
                            className="text-text-muted hover:text-danger"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1"
                          />
                          <Button onClick={handleApplyCoupon}>Apply</Button>
                        </div>
                      )}

                      {/* Gift Card */}
                      {!showGiftCard ? (
                        <button
                          onClick={() => setShowGiftCard(true)}
                          className="w-full text-left text-primary hover:text-primary/80 flex items-center gap-2 font-medium"
                        >
                          <FiGift size={16} />
                          Add Gift Card
                        </button>
                      ) : giftCard ? (
                        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-primary" />
                            <span className="font-medium text-primary">{giftCard.code}</span>
                            <span className="text-sm text-text-muted">- ${giftCard.amount.toFixed(2)}</span>
                          </div>
                          <button
                            onClick={() => {
                              dispatch(removeGiftCard());
                              toast.success('Gift card removed');
                            }}
                            className="text-text-muted hover:text-danger"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 p-3 border border-border rounded-xl">
                          <Input
                            value={giftCardInput}
                            onChange={(e) => setGiftCardInput(e.target.value)}
                            placeholder="Gift card code"
                          />
                          <Input
                            value={giftCardAmount}
                            onChange={(e) => setGiftCardAmount(e.target.value)}
                            placeholder="Amount"
                            type="number"
                            min="0"
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleApplyGiftCard} className="flex-1">Apply Gift Card</Button>
                            <Button variant="ghost" onClick={() => setShowGiftCard(false)}>Cancel</Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Wallet */}
                    <label className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all mt-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={useWallet}
                          onChange={(e) => {
                            dispatch(toggleUseWallet(e.target.checked));
                            if (e.target.checked) {
                              dispatch(setWalletAmount(Math.min(walletBalance, total)));
                            }
                          }}
                          className="w-5 h-5 text-primary rounded"
                        />
                        <div>
                          <p className="font-medium text-secondary flex items-center gap-2">
                            <FiGift size={16} />
                            Use Wallet
                          </p>
                          <p className="text-sm text-text-muted">Balance: ${walletBalance.toFixed(2)}</p>
                        </div>
                      </div>
                      {useWallet && (
                        <div className="w-32">
                          <Input
                            type="number"
                            value={walletAmount}
                            onChange={(e) => dispatch(setWalletAmount(parseFloat(e.target.value) || 0))}
                            min="0"
                            max={walletBalance}
                          />
                        </div>
                      )}
                    </label>

                    {/* Reward Points */}
                    <label className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all mt-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={useRewardPoints}
                          onChange={(e) => {
                            dispatch(toggleUseRewardPoints(e.target.checked));
                            if (e.target.checked) {
                              const maxPoints = Math.min(userRewardPoints, total * 100);
                              dispatch(setRewardPoints(maxPoints));
                            }
                          }}
                          className="w-5 h-5 text-primary rounded"
                        />
                        <div>
                          <p className="font-medium text-secondary flex items-center gap-2">
                            <FiDollarSign size={16} />
                            Use Reward Points
                          </p>
                          <p className="text-sm text-text-muted">{userRewardPoints.toLocaleString()} points available (100 points = $1)</p>
                        </div>
                      </div>
                      {useRewardPoints && (
                        <div className="w-32">
                          <Input
                            type="number"
                            value={rewardPoints}
                            onChange={(e) => dispatch(setRewardPoints(parseInt(e.target.value) || 0))}
                            min="0"
                            max={userRewardPoints}
                          />
                        </div>
                      )}
                    </label>

                    {/* Checkout Button */}
                    {cartItems.length > 0 && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-2"
                      >
                        <Link to="/checkout">
                          <Button
                            variant="primary"
                            size="lg"
                            className="w-full shadow-lg shadow-primary/20"
                            rightIcon={<FiArrowRight size={18} />}
                          >
                            Proceed to Checkout
                          </Button>
                        </Link>
                      </motion.div>
                    )}

                    {/* Continue Shopping */}
                    <Link to="/shop">
                      <Button variant="ghost" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
