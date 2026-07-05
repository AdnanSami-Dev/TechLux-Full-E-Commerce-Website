import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'John Doe',
    email: 'john@doe.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  orders: [
    { id: 'ORD-001', date: '2026-07-01', status: 'delivered', total: 249.99, items: 2 },
    { id: 'ORD-002', date: '2026-06-28', status: 'processing', total: 199.99, items: 1 },
    { id: 'ORD-003', date: '2026-06-20', status: 'cancelled', total: 99.99, items: 1 },
    { id: 'ORD-004', date: '2026-06-15', status: 'delivered', total: 599.99, items: 3 }
  ],
  wallet: {
    balance: 250.00,
    transactions: [
      { id: 'TRX-001', date: '2026-07-02', type: 'credit', amount: 50.00, description: 'Referral bonus' },
      { id: 'TRX-002', date: '2026-07-01', type: 'debit', amount: -39.99, description: 'Order payment' },
      { id: 'TRX-003', date: '2026-06-25', type: 'credit', amount: 100.00, description: 'Top up' },
      { id: 'TRX-004', date: '2026-06-20', type: 'debit', amount: -99.99, description: 'Order payment' }
    ]
  },
  rewards: {
    points: 5000,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 3000,
    history: [
      { id: 'RH-001', date: '2026-07-02', points: 50, description: 'Order review' },
      { id: 'RH-002', date: '2026-07-01', points: 250, description: 'Purchase' },
      { id: 'RH-003', date: '2026-06-28', points: 100, description: 'Referral' }
    ]
  },
  referrals: {
    code: 'JOHN123',
    count: 15,
    earnings: 750.00,
    list: [
      { id: 'REF-001', name: 'Jane Smith', date: '2026-07-01', status: 'completed', reward: 50.00 },
      { id: 'REF-002', name: 'Mike Johnson', date: '2026-06-28', status: 'pending', reward: 50.00 },
      { id: 'REF-003', name: 'Sarah Williams', date: '2026-06-20', status: 'completed', reward: 50.00 }
    ]
  },
  invoices: [
    { id: 'INV-001', date: '2026-07-01', orderId: 'ORD-001', total: 249.99, status: 'paid' },
    { id: 'INV-002', date: '2026-06-28', orderId: 'ORD-002', total: 199.99, status: 'paid' },
    { id: 'INV-003', date: '2026-06-20', orderId: 'ORD-003', total: 99.99, status: 'cancelled' }
  ],
  addresses: [
    { id: 'ADDR-001', type: 'Home', name: 'John Doe', phone: '+1 (555) 123-4567', address: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA', isDefault: true },
    { id: 'ADDR-002', type: 'Work', name: 'John Doe', phone: '+1 (555) 987-6543', address: '456 Business Ave', city: 'New York', state: 'NY', zipCode: '10005', country: 'USA', isDefault: false }
  ],
  notifications: [
    { id: 'NOT-001', title: 'Order delivered', message: 'Your order ORD-001 has been delivered!', date: '2026-07-02', read: false, type: 'order' },
    { id: 'NOT-002', title: 'Reward points earned', message: 'You earned 250 reward points from your last purchase!', date: '2026-07-01', read: false, type: 'reward' },
    { id: 'NOT-003', title: 'Referral bonus', message: 'Your friend Jane Smith has made their first purchase!', date: '2026-07-01', read: true, type: 'referral' }
  ],
  timeline: [
    { id: 'TL-001', date: '2026-07-02', title: 'Order delivered', description: 'Your order ORD-001 was delivered successfully.', icon: 'check-circle', color: 'success' },
    { id: 'TL-002', date: '2026-07-01', title: 'Welcome to Gold tier', description: 'Congratulations! You have reached Gold tier!', icon: 'award', color: 'primary' },
    { id: 'TL-003', date: '2026-06-28', title: 'Referral bonus earned', description: 'Your referral has been completed!', icon: 'gift', color: 'accent' }
  ]
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.read = true;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    setDefaultAddress: (state, action) => {
      state.addresses.forEach(a => a.isDefault = false);
      const address = state.addresses.find(a => a.id === action.payload);
      if (address) address.isDefault = true;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const { markNotificationRead, markAllNotificationsRead, setDefaultAddress, updateUserProfile } = dashboardSlice.actions;

export default dashboardSlice.reducer;
