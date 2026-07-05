import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  savedForLater: [],
  coupon: null,
  giftCard: null,
  shippingMethod: 'standard',
  useWallet: false,
  walletAmount: 0,
  walletBalance: 250, // Default wallet balance
  useRewardPoints: false,
  rewardPoints: 0,
  userRewardPoints: 5000, // Default reward points
};

// Shipping methods configuration
const SHIPPING_METHODS = {
  standard: { name: 'Standard Shipping', cost: 4.99, days: 5 },
  express: { name: 'Express Shipping', cost: 14.99, days: 2 },
  overnight: { name: 'Overnight Shipping', cost: 29.99, days: 1 },
  free: { name: 'Free Shipping', cost: 0, days: 7 },
};

// Coupon configuration
const COUPONS = {
  'WELCOME10': { type: 'percentage', value: 10, description: 'Welcome 10% off' },
  'SAVE20': { type: 'percentage', value: 20, description: 'Save 20% on orders' },
  'FLAT15': { type: 'fixed', value: 15, description: '$15 off your purchase' },
  'FREESHIP': { type: 'free_shipping', description: 'Free standard shipping' },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload.id;
      const existingItemIndex = state.items.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.giftCard = null;
    },
    saveForLater: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.items = state.items.filter(i => i.id !== action.payload);
        state.savedForLater.push(item);
      }
    },
    moveToCart: (state, action) => {
      const item = state.savedForLater.find(i => i.id === action.payload);
      if (item) {
        state.savedForLater = state.savedForLater.filter(i => i.id !== action.payload);
        const existingItemIndex = state.items.findIndex(i => i.id === item.id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += item.quantity;
        } else {
          state.items.push(item);
        }
      }
    },
    removeFromSaved: (state, action) => {
      state.savedForLater = state.savedForLater.filter(item => item.id !== action.payload);
    },
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      if (COUPONS[code]) {
        state.coupon = { code, ...COUPONS[code] };
      }
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    applyGiftCard: (state, action) => {
      const { code, amount } = action.payload;
      if (code && amount > 0) {
        state.giftCard = { code, amount };
      }
    },
    removeGiftCard: (state) => {
      state.giftCard = null;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    toggleUseWallet: (state, action) => {
      state.useWallet = action.payload;
    },
    setWalletAmount: (state, action) => {
      state.walletAmount = Math.min(action.payload, state.walletBalance);
    },
    toggleUseRewardPoints: (state, action) => {
      state.useRewardPoints = action.payload;
    },
    setRewardPoints: (state, action) => {
      state.rewardPoints = Math.min(action.payload, state.userRewardPoints);
    },
  },
});

// Selectors
export const selectCartSubtotal = (state) => {
  return state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  let discount = 0;
  
  // Apply coupon
  if (state.cart.coupon) {
    if (state.cart.coupon.type === 'percentage') {
      discount = subtotal * (state.cart.coupon.value / 100);
    } else if (state.cart.coupon.type === 'fixed') {
      discount = state.cart.coupon.value;
    }
  }
  
  // Apply gift card
  let giftCardAmount = state.cart.giftCard ? state.cart.giftCard.amount : 0;
  
  // Apply wallet
  let walletAmount = state.cart.useWallet ? state.cart.walletAmount : 0;
  
  // Apply reward points (100 points = $1)
  let rewardPointsValue = state.cart.useRewardPoints ? state.cart.rewardPoints / 100 : 0;
  
  // Calculate shipping
  let shippingCost = SHIPPING_METHODS[state.cart.shippingMethod]?.cost || 0;
  if (state.cart.coupon?.type === 'free_shipping') {
    shippingCost = 0;
  } else if (subtotal >= 100) {
    shippingCost = 0;
  }
  
  // Calculate tax (8.5% of subtotal minus discounts)
  const tax = Math.max(0, (subtotal - discount)) * 0.085;
  
  // Total
  let total = subtotal - discount - giftCardAmount - walletAmount - rewardPointsValue + shippingCost + tax;
  return Math.max(0, total);
};

export const selectCartCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

export const selectShippingInfo = (state) => {
  return SHIPPING_METHODS[state.cart.shippingMethod];
};

export const selectShippingCost = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (state.cart.coupon?.type === 'free_shipping') return 0;
  if (subtotal >= 100) return 0;
  return SHIPPING_METHODS[state.cart.shippingMethod]?.cost || 0;
};

export const selectTaxAmount = (state) => {
  const subtotal = selectCartSubtotal(state);
  let discount = 0;
  if (state.cart.coupon) {
    if (state.cart.coupon.type === 'percentage') {
      discount = subtotal * (state.cart.coupon.value / 100);
    } else if (state.cart.coupon.type === 'fixed') {
      discount = state.cart.coupon.value;
    }
  }
  return Math.max(0, (subtotal - discount)) * 0.085;
};

export const selectDiscountAmount = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (state.cart.coupon) {
    if (state.cart.coupon.type === 'percentage') {
      return subtotal * (state.cart.coupon.value / 100);
    } else if (state.cart.coupon.type === 'fixed') {
      return state.cart.coupon.value;
    }
  }
  return 0;
};

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  saveForLater,
  moveToCart,
  removeFromSaved,
  applyCoupon,
  removeCoupon,
  applyGiftCard,
  removeGiftCard,
  setShippingMethod,
  toggleUseWallet,
  setWalletAmount,
  toggleUseRewardPoints,
  setRewardPoints,
} = cartSlice.actions;

export default cartSlice.reducer;
