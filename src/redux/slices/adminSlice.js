import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Overview Stats
  stats: {
    totalRevenue: 124560,
    totalOrders: 489,
    totalProducts: 1234,
    totalCustomers: 3256,
    recentOrders: [
      { id: 'ORD-9876', customer: 'John Doe', amount: 149.99, status: 'Delivered', date: '2026-07-04' },
      { id: 'ORD-9875', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2026-07-03' },
      { id: 'ORD-9874', customer: 'Mike Johnson', amount: 199.99, status: 'Shipped', date: '2026-07-02' },
      { id: 'ORD-9873', customer: 'Sarah Williams', amount: 59.99, status: 'Cancelled', date: '2026-07-01' },
      { id: 'ORD-9872', customer: 'Tom Brown', amount: 249.99, status: 'Delivered', date: '2026-06-30' }
    ],
    topProducts: [
      { id: 'PRD-101', name: 'Premium Gaming Laptop', sales: 456, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200' },
      { id: 'PRD-102', name: 'Mechanical Keyboard', sales: 324, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200' },
      { id: 'PRD-103', name: 'Wireless Headphones', sales: 289, image: 'https://images.unsplash.com/photo-1505740420928-5d5da50e898f?auto=format&fit=crop&q=80&w=200' }
    ]
  },
  products: [
    { id: 'PRD-101', name: 'Premium Gaming Laptop', category: 'Electronics', price: 1499.99, stock: 45, status: 'Active' },
    { id: 'PRD-102', name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 120, status: 'Active' },
    { id: 'PRD-103', name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock: 8, status: 'Low Stock' },
    { id: 'PRD-104', name: 'Smart Watch', category: 'Wearables', price: 299.99, stock: 67, status: 'Active' }
  ],
  orders: [
    { id: 'ORD-9876', customer: 'John Doe', email: 'john@doe.com', date: '2026-07-04', total: 149.99, status: 'Delivered' },
    { id: 'ORD-9875', customer: 'Jane Smith', email: 'jane@smith.com', date: '2026-07-03', total: 89.99, status: 'Processing' },
    { id: 'ORD-9874', customer: 'Mike Johnson', email: 'mike@johnson.com', date: '2026-07-02', total: 199.99, status: 'Shipped' },
    { id: 'ORD-9873', customer: 'Sarah Williams', email: 'sarah@williams.com', date: '2026-07-01', total: 59.99, status: 'Cancelled' },
    { id: 'ORD-9872', customer: 'Tom Brown', email: 'tom@brown.com', date: '2026-06-30', total: 249.99, status: 'Delivered' }
  ],
  customers: [
    { id: 'CUS-001', name: 'John Doe', email: 'john@doe.com', orders: 12, spent: '$2,450', joined: '2025-01-15' },
    { id: 'CUS-002', name: 'Jane Smith', email: 'jane@smith.com', orders: 8, spent: '$1,280', joined: '2025-03-20' },
    { id: 'CUS-003', name: 'Mike Johnson', email: 'mike@johnson.com', orders: 5, spent: '$890', joined: '2025-05-10' }
  ],
  coupons: [
    { id: 'CPN-001', code: 'WELCOME10', type: 'Percentage', value: '10%', uses: 1234, status: 'Active' },
    { id: 'CPN-002', code: 'SAVE20', type: 'Percentage', value: '20%', uses: 876, status: 'Active' },
    { id: 'CPN-003', code: 'FLAT15', type: 'Fixed', value: '$15', uses: 543, status: 'Expired' }
  ],
  reviews: [
    { id: 'REV-001', product: 'Premium Gaming Laptop', customer: 'John Doe', rating: 5, date: '2026-07-04', status: 'Approved' },
    { id: 'REV-002', product: 'Mechanical Keyboard', customer: 'Jane Smith', rating: 4, date: '2026-07-03', status: 'Pending' },
    { id: 'REV-003', product: 'Wireless Headphones', customer: 'Mike Johnson', rating: 3, date: '2026-07-02', status: 'Approved' }
  ],
  notifications: [
    { id: 'NOT-001', title: 'New Order Received', message: 'You have a new order: ORD-9876', date: '2026-07-04', read: false },
    { id: 'NOT-002', title: 'Low Stock Alert', message: 'Wireless Headphones is running low on stock', date: '2026-07-03', read: true },
    { id: 'NOT-003', title: 'Review Pending', message: 'You have a new review pending approval', date: '2026-07-02', read: true }
  ],
  blogs: [
    { id: 'BLG-001', title: 'Best Tech Gadgets 2026', author: 'Admin', date: '2026-07-01', views: 1234, status: 'Published' },
    { id: 'BLG-002', title: 'How to Choose the Right Laptop', author: 'Admin', date: '2026-06-25', views: 987, status: 'Published' },
    { id: 'BLG-003', title: 'Summer Sale Preview', author: 'Admin', date: '2026-06-20', views: 765, status: 'Draft' }
  ],
  banners: [
    { id: 'BNR-001', title: 'Summer Sale 2026', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200', status: 'Active' },
    { id: 'BNR-002', title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1505740420928-5d5da50e898f?auto=format&fit=crop&q=80&w=1200', status: 'Active' },
    { id: 'BNR-003', title: 'Flash Deals', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1200', status: 'Inactive' }
  ]
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.read = true;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    updateProductStatus: (state, action) => {
      const { id, status } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) product.status = status;
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) order.status = status;
    },
    approveReview: (state, action) => {
      const review = state.reviews.find(r => r.id === action.payload);
      if (review) review.status = 'Approved';
    },
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(r => r.id !== action.payload);
    },
    toggleBannerStatus: (state, action) => {
      const banner = state.banners.find(b => b.id === action.payload);
      if (banner) banner.status = banner.status === 'Active' ? 'Inactive' : 'Active';
    }
  }
});

export const {
  markNotificationRead,
  markAllNotificationsRead,
  updateProductStatus,
  updateOrderStatus,
  approveReview,
  deleteReview,
  toggleBannerStatus
} = adminSlice.actions;

export default adminSlice.reducer;
