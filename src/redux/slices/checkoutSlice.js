import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0, // 0: Billing, 1: Shipping, 2: Payment, 3: Review
  billing: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
  shippingSameAsBilling: true,
  shipping: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
  paymentMethod: 'card',
  card: {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  },
  useWallet: false,
  walletAmount: 0,
  useRewardPoints: false,
  rewardPoints: 0,
  orderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateBilling: (state, action) => {
      state.billing = { ...state.billing, ...action.payload };
    },
    setShippingSameAsBilling: (state, action) => {
      state.shippingSameAsBilling = action.payload;
      if (action.payload) {
        state.shipping = { ...state.billing };
      }
    },
    updateShipping: (state, action) => {
      state.shipping = { ...state.shipping, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    updateCard: (state, action) => {
      state.card = { ...state.card, ...action.payload };
    },
    toggleUseWallet: (state, action) => {
      state.useWallet = action.payload;
    },
    setWalletAmount: (state, action) => {
      state.walletAmount = action.payload;
    },
    toggleUseRewardPoints: (state, action) => {
      state.useRewardPoints = action.payload;
    },
    setRewardPoints: (state, action) => {
      state.rewardPoints = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setCurrentStep,
  updateBilling,
  setShippingSameAsBilling,
  updateShipping,
  setPaymentMethod,
  updateCard,
  toggleUseWallet,
  setWalletAmount,
  toggleUseRewardPoints,
  setRewardPoints,
  setOrderId,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
