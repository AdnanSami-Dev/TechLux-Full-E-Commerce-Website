import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCreditCard,
  FiTruck,
  FiHome,
  FiCheck,
  FiArrowLeft,
  FiCheckCircle,
  FiGift,
  FiTag,
  FiDollarSign,
  FiX,
} from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import {
  selectCartSubtotal,
  selectCartTotal,
  selectShippingCost,
  selectTaxAmount,
  selectDiscountAmount,
  applyCoupon,
  removeCoupon,
  applyGiftCard,
  removeGiftCard,
  setShippingMethod,
  toggleUseWallet,
  setWalletAmount,
  toggleUseRewardPoints,
  setRewardPoints,
  clearCart,
} from '../redux/slices/cartSlice';
import {
  setCurrentStep,
  updateBilling,
  setShippingSameAsBilling,
  updateShipping,
  setPaymentMethod,
  updateCard,
  resetCheckout,
  setOrderId,
} from '../redux/slices/checkoutSlice';
import { cn } from '../utils/cn';

const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', cost: 4.99, days: 5 },
  { id: 'express', name: 'Express Shipping', cost: 14.99, days: 2 },
  { id: 'overnight', name: 'Overnight Shipping', cost: 29.99, days: 1 },
];

const COUPONS = {
  'WELCOME10': { type: 'percentage', value: 10, description: 'Welcome 10% off' },
  'SAVE20': { type: 'percentage', value: 20, description: 'Save 20% on orders' },
  'FLAT15': { type: 'fixed', value: 15, description: '$15 off your purchase' },
  'FREESHIP': { type: 'free_shipping', description: 'Free standard shipping' },
};

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cart state
  const cartItems = useSelector(state => state.cart.items);
  const coupon = useSelector(state => state.cart.coupon);
  const giftCard = useSelector(state => state.cart.giftCard);
  const shippingMethod = useSelector(state => state.cart.shippingMethod);
  const walletBalance = useSelector(state => state.cart.walletBalance);
  const userRewardPoints = useSelector(state => state.cart.userRewardPoints);
  const useWallet = useSelector(state => state.cart.useWallet);
  const walletAmount = useSelector(state => state.cart.walletAmount);
  const useRewardPoints = useSelector(state => state.cart.useRewardPoints);
  const rewardPoints = useSelector(state => state.cart.rewardPoints);

  // Checkout state
  const currentStep = useSelector(state => state.checkout.currentStep);
  const billing = useSelector(state => state.checkout.billing);
  const shippingSameAsBilling = useSelector(state => state.checkout.shippingSameAsBilling);
  const shipping = useSelector(state => state.checkout.shipping);
  const paymentMethod = useSelector(state => state.checkout.paymentMethod);
  const card = useSelector(state => state.checkout.card);

  // Calculated totals
  const subtotal = selectCartSubtotal({ cart: { items: cartItems } });
  const discount = selectDiscountAmount({ cart: { items: cartItems, coupon } });
  const tax = selectTaxAmount({ cart: { items: cartItems, coupon } });
  let shippingCost = selectShippingCost({ cart: { items: cartItems, coupon, shippingMethod } });
  const total = selectCartTotal({
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
  });

  const [couponInput, setCouponInput] = useState('');
  const [giftCardInput, setGiftCardInput] = useState('');
  const [giftCardAmountInput, setGiftCardAmountInput] = useState('');
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const steps = [
    { id: 0, name: 'Billing', icon: FiHome },
    { id: 1, name: 'Shipping', icon: FiTruck },
    { id: 2, name: 'Payment', icon: FiCreditCard },
    { id: 3, name: 'Review', icon: FiCheckCircle },
  ];

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      return billing.firstName && billing.lastName && billing.email && billing.phone && billing.address && billing.city && billing.state && billing.zipCode;
    } else if (currentStep === 1) {
      return shipping.firstName && shipping.lastName && shipping.email && shipping.phone && shipping.address && shipping.city && shipping.state && shipping.zipCode;
    } else if (currentStep === 2) {
      if (paymentMethod === 'card') {
        return card.cardNumber && card.cardName && card.expiryDate && card.cvv;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (currentStep < 3) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      if (COUPONS[couponInput.trim().toUpperCase()]) {
        dispatch(applyCoupon(couponInput.trim()));
        toast.success('Coupon applied!');
      } else {
        toast.error('Invalid coupon code');
      }
      setCouponInput('');
    }
  };

  const handleApplyGiftCard = () => {
    if (giftCardInput.trim() && parseFloat(giftCardAmountInput) > 0) {
      dispatch(applyGiftCard({ code: giftCardInput.trim(), amount: parseFloat(giftCardAmountInput) }));
      toast.success('Gift card applied!');
      setGiftCardInput('');
      setGiftCardAmountInput('');
      setShowGiftCard(false);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    dispatch(setOrderId(orderId));
    dispatch(clearCart());
    setIsProcessing(false);
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return null;
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
                { label: 'Cart', href: '/cart' },
                { label: 'Checkout', href: '/checkout', active: true },
              ]}
              className="mb-8"
            />

            <div className="flex items-center justify-center mb-12 gap-4 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300",
                        currentStep > index
                          ? "bg-primary text-white"
                          : currentStep === index
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-muted/50 text-text-muted"
                      )}
                    >
                      {currentStep > index ? (
                        <FiCheck size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </motion.div>
                    <span className={cn(
                      "text-sm font-medium",
                      currentStep >= index ? "text-secondary" : "text-text-muted"
                    )}>{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-16 h-0.5 rounded-full",
                      currentStep > index ? "bg-primary" : "bg-muted/50"
                    )} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="billing"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8"
                    >
                      <h2 className="text-2xl font-bold text-secondary mb-6">Billing Address</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={billing.firstName}
                          onChange={(e) => dispatch(updateBilling({ firstName: e.target.value }))}
                          required
                        />
                        <Input
                          label="Last Name"
                          value={billing.lastName}
                          onChange={(e) => dispatch(updateBilling({ lastName: e.target.value }))}
                          required
                        />
                        <Input
                          label="Email"
                          type="email"
                          value={billing.email}
                          onChange={(e) => dispatch(updateBilling({ email: e.target.value }))}
                          required
                        />
                        <Input
                          label="Phone Number"
                          value={billing.phone}
                          onChange={(e) => dispatch(updateBilling({ phone: e.target.value }))}
                          required
                        />
                        <Input
                          label="Address"
                          className="md:col-span-2"
                          value={billing.address}
                          onChange={(e) => dispatch(updateBilling({ address: e.target.value }))}
                          required
                        />
                        <Input
                          label="Apartment, Suite, etc. (optional)"
                          className="md:col-span-2"
                          value={billing.apartment}
                          onChange={(e) => dispatch(updateBilling({ apartment: e.target.value }))}
                        />
                        <Input
                          label="City"
                          value={billing.city}
                          onChange={(e) => dispatch(updateBilling({ city: e.target.value }))}
                          required
                        />
                        <Input
                          label="State"
                          value={billing.state}
                          onChange={(e) => dispatch(updateBilling({ state: e.target.value }))}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={billing.zipCode}
                          onChange={(e) => dispatch(updateBilling({ zipCode: e.target.value }))}
                          required
                        />
                        <Input
                          label="Country"
                          value={billing.country}
                          onChange={(e) => dispatch(updateBilling({ country: e.target.value }))}
                          disabled
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-secondary">Shipping Address</h2>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={shippingSameAsBilling}
                          onChange={(e) => dispatch(setShippingSameAsBilling(e.target.checked))}
                          className="w-5 h-5 text-primary rounded"
                        />
                        <span className="text-secondary font-medium">Same as billing address</span>
                      </label>

                      {!shippingSameAsBilling && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="First Name"
                            value={shipping.firstName}
                            onChange={(e) => dispatch(updateShipping({ firstName: e.target.value }))}
                            required
                          />
                          <Input
                            label="Last Name"
                            value={shipping.lastName}
                            onChange={(e) => dispatch(updateShipping({ lastName: e.target.value }))}
                            required
                          />
                          <Input
                            label="Email"
                            type="email"
                            value={shipping.email}
                            onChange={(e) => dispatch(updateShipping({ email: e.target.value }))}
                            required
                          />
                          <Input
                            label="Phone Number"
                            value={shipping.phone}
                            onChange={(e) => dispatch(updateShipping({ phone: e.target.value }))}
                            required
                          />
                          <Input
                            label="Address"
                            className="md:col-span-2"
                            value={shipping.address}
                            onChange={(e) => dispatch(updateShipping({ address: e.target.value }))}
                            required
                          />
                          <Input
                            label="Apartment, Suite, etc. (optional)"
                            className="md:col-span-2"
                            value={shipping.apartment}
                            onChange={(e) => dispatch(updateShipping({ apartment: e.target.value }))}
                          />
                          <Input
                            label="City"
                            value={shipping.city}
                            onChange={(e) => dispatch(updateShipping({ city: e.target.value }))}
                            required
                          />
                          <Input
                            label="State"
                            value={shipping.state}
                            onChange={(e) => dispatch(updateShipping({ state: e.target.value }))}
                            required
                          />
                          <Input
                            label="ZIP Code"
                            value={shipping.zipCode}
                            onChange={(e) => dispatch(updateShipping({ zipCode: e.target.value }))}
                            required
                          />
                          <Input
                            label="Country"
                            value={shipping.country}
                            onChange={(e) => dispatch(updateShipping({ country: e.target.value }))}
                            disabled
                          />
                        </div>
                      )}

                      <div className="pt-6 border-t border-border">
                        <h3 className="text-xl font-bold text-secondary mb-4">Shipping Method</h3>
                        <div className="space-y-3">
                          {SHIPPING_METHODS.map((method) => {
                            const isFree = method.cost === 0 || (coupon?.type === 'free_shipping') || subtotal >= 100;
                            const cost = isFree && method.id === 'standard' ? 0 : method.cost;
                            return (
                              <label
                                key={method.id}
                                className={cn(
                                  "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                  shippingMethod === method.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                )}
                              >
                                <div className="flex items-center gap-4">
                                  <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === method.id}
                                    onChange={() => dispatch(setShippingMethod(method.id))}
                                    className="w-5 h-5 text-primary"
                                  />
                                  <div>
                                    <p className="font-medium text-secondary">{method.name}</p>
                                    <p className="text-sm text-text-muted">Arrives in {method.days} business days</p>
                                  </div>
                                </div>
                                <span className={cn(
                                  "font-semibold",
                                  isFree && method.id === 'standard' ? "text-success" : "text-secondary"
                                )}>{isFree && method.id === 'standard' ? 'Free' : `$${cost.toFixed(2)}`}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-secondary">Payment Method</h2>

                      <div className="space-y-3 mb-6">
                        {['card', 'paypal'].map((method) => (
                          <label
                            key={method}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                              paymentMethod === method
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === method}
                              onChange={() => dispatch(setPaymentMethod(method))}
                              className="w-5 h-5 text-primary"
                            />
                            <span className="text-secondary font-medium capitalize">{method === 'card' ? 'Credit / Debit Card' : method}</span>
                          </label>
                        ))}
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            className="md:col-span-2"
                            maxLength={19}
                            value={card.cardNumber}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              val = val.replace(/(.{4})/g, '$1 ').trim();
                              dispatch(updateCard({ cardNumber: val }));
                            }}
                            required
                          />
                          <Input
                            label="Cardholder Name"
                            className="md:col-span-2"
                            value={card.cardName}
                            onChange={(e) => dispatch(updateCard({ cardName: e.target.value }))}
                            required
                          />
                          <Input
                            label="Expiry Date"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={card.expiryDate}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.length >= 2) {
                                val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                              }
                              dispatch(updateCard({ expiryDate: val }));
                            }}
                            required
                          />
                          <Input
                            label="CVV"
                            placeholder="123"
                            maxLength={4}
                            value={card.cvv}
                            onChange={(e) => dispatch(updateCard({ cvv: e.target.value.replace(/\D/g, '') }))}
                            required
                          />
                          <label className="md:col-span-2 flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={card.saveCard}
                              onChange={(e) => dispatch(updateCard({ saveCard: e.target.checked }))}
                              className="w-5 h-5 text-primary rounded"
                            />
                            <span className="text-secondary font-medium">Save card for future purchases</span>
                          </label>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-secondary">Review Your Order</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-muted/30">
                          <h3 className="font-semibold text-secondary mb-3">Billing Address</h3>
                          <p className="text-text-secondary text-sm">{billing.firstName} {billing.lastName}</p>
                          <p className="text-text-secondary text-sm">{billing.address}</p>
                          {billing.apartment && <p className="text-text-secondary text-sm">{billing.apartment}</p>}
                          <p className="text-text-secondary text-sm">{billing.city}, {billing.state} {billing.zipCode}</p>
                          <p className="text-text-secondary text-sm">{billing.email}</p>
                          <p className="text-text-secondary text-sm">{billing.phone}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/30">
                          <h3 className="font-semibold text-secondary mb-3">Shipping Address</h3>
                          <p className="text-text-secondary text-sm">{shipping.firstName} {shipping.lastName}</p>
                          <p className="text-text-secondary text-sm">{shipping.address}</p>
                          {shipping.apartment && <p className="text-text-secondary text-sm">{shipping.apartment}</p>}
                          <p className="text-text-secondary text-sm">{shipping.city}, {shipping.state} {shipping.zipCode}</p>
                          <p className="text-text-secondary text-sm">{shipping.email}</p>
                          <p className="text-text-secondary text-sm">{shipping.phone}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h3 className="font-semibold text-secondary mb-3">Payment Method</h3>
                        <p className="text-text-secondary">{paymentMethod === 'card' ? 'Credit / Debit Card ending in ' + card.cardNumber.slice(-4) : 'PayPal'}</p>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h3 className="font-semibold text-secondary mb-3">Shipping Method</h3>
                        <p className="text-text-secondary">{SHIPPING_METHODS.find(m => m.id === shippingMethod)?.name} - Arrives in {SHIPPING_METHODS.find(m => m.id === shippingMethod)?.days} business days</p>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h3 className="font-semibold text-secondary mb-4">Items</h3>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-muted/20">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-border" />
                              <div className="flex-1">
                                <h4 className="font-medium text-secondary">{item.name}</h4>
                                <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                                <p className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-8">
                  {currentStep > 0 ? (
                    <Button variant="outline" leftIcon={<FiArrowLeft />} onClick={handlePrev}>Back</Button>
                  ) : (
                    <Link to="/cart">
                      <Button variant="outline" leftIcon={<FiArrowLeft />}>Back to Cart</Button>
                    </Link>
                  )}

                  {currentStep < 3 ? (
                    <Button variant="primary" onClick={handleNext}>Continue</Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                      disabled={isProcessing}
                    >Place Order</Button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-bold text-secondary">Order Summary</h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-medium text-secondary">${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center justify-between text-success">
                        <span>Discount</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    {giftCard && (
                      <div className="flex items-center justify-between text-primary">
                        <span>Gift Card</span>
                        <span className="font-medium">-${giftCard.amount.toFixed(2)}</span>
                      </div>
                    )}

                    {useWallet && walletAmount > 0 && (
                      <div className="flex items-center justify-between text-primary">
                        <span>Wallet</span>
                        <span className="font-medium">-${walletAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {useRewardPoints && rewardPoints > 0 && (
                      <div className="flex items-center justify-between text-success">
                        <span>Reward Points ({rewardPoints})</span>
                        <span className="font-medium">-${(rewardPoints / 100).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Shipping</span>
                      <span className={cn(
                        "font-medium",
                        shippingCost === 0 ? "text-success" : "text-secondary"
                      )}>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Tax</span>
                      <span className="font-medium text-secondary">${tax.toFixed(2)}</span>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-secondary">Total</span>
                        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border space-y-4">
                      <div>
                        <p className="font-medium text-secondary mb-3 flex items-center gap-2">
                          <FiTag size={16} /> Coupon Code
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
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-medium text-secondary flex items-center gap-2">
                            <FiGift size={16} /> Gift Card
                          </p>
                          {!giftCard && !showGiftCard && (
                            <button
                              onClick={() => setShowGiftCard(true)}
                              className="text-primary hover:text-primary/80 font-medium text-sm"
                            >Add Gift Card</button>
                          )}
                        </div>

                        {giftCard ? (
                          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <div className="flex items-center gap-2">
                              <FiCheckCircle className="text-primary" />
                              <span className="font-medium text-primary">{giftCard.code}</span>
                              <span className="text-sm text-text-muted">-${giftCard.amount.toFixed(2)}</span>
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
                        ) : showGiftCard && (
                          <div className="space-y-3 p-3 border border-border rounded-xl">
                            <Input
                              value={giftCardInput}
                              onChange={(e) => setGiftCardInput(e.target.value)}
                              placeholder="Gift card code"
                            />
                            <Input
                              value={giftCardAmountInput}
                              onChange={(e) => setGiftCardAmountInput(e.target.value)}
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

                      <label className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all">
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

                      <label className="flex items-center justify-between p-3 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
