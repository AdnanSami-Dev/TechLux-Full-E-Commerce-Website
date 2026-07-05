import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiTrendingUp,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiStar,
  FiFileText,
  FiBell,
  FiImage,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiDollarSign
} from 'react-icons/fi';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { cn } from '../utils/cn';
import {
  markNotificationRead,
  markAllNotificationsRead,
  updateProductStatus,
  updateOrderStatus,
  approveReview,
  deleteReview,
  toggleBannerStatus
} from '../redux/slices/adminSlice';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/admin', icon: FiHome, label: 'Overview' },
  { path: '/admin/revenue', icon: FiDollarSign, label: 'Revenue' },
  { path: '/admin/orders', icon: FiPackage, label: 'Orders' },
  { path: '/admin/inventory', icon: FiShoppingBag, label: 'Inventory' },
  { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
  { path: '/admin/customers', icon: FiUsers, label: 'Customers' },
  { path: '/admin/products', icon: FiShoppingBag, label: 'Products' },
  { path: '/admin/coupons', icon: FiTag, label: 'Coupons' },
  { path: '/admin/reviews', icon: FiStar, label: 'Reviews' },
  { path: '/admin/blogs', icon: FiFileText, label: 'Blogs' },
  { path: '/admin/notifications', icon: FiBell, label: 'Notifications' },
  { path: '/admin/banners', icon: FiImage, label: 'Banners' }
];

function AdminDashboard() {
  const location = useLocation();
  const unreadCount = useSelector(state => state.admin.notifications.filter(n => !n.read).length);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:static z-40 w-72 bg-card border-r border-border shadow-xl lg:shadow-none h-screen overflow-y-auto"
          >
            <div className="p-6">
              <Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
                  T
                </div>
                <span className="text-xl font-bold text-secondary">TechLux Admin</span>
              </Link>

              {/* Navigation */}
              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-muted/50"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center transition-all",
                        isActive ? "bg-primary text-white" : "text-text-muted"
                      )}>
                        <Icon size={18} />
                      </div>
                      <span className={cn(
                        "font-medium transition-colors",
                        isActive ? "text-primary" : "text-secondary"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Back to Shop */}
            <div className="p-6 border-t border-border mt-auto">
              <Link to="/">
                <Button variant="ghost" className="w-full" leftIcon={<FiHome />}>
                  Back to Shop
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1">
        <div className="p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/revenue" element={<AdminRevenue />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/inventory" element={<AdminInventory />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/coupons" element={<AdminCoupons />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/blogs" element={<AdminBlogs />} />
            <Route path="/notifications" element={<AdminNotifications />} />
            <Route path="/banners" element={<AdminBanners />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Overview Page
function AdminOverview() {
  const dispatch = useDispatch();
  const { stats, products, orders, customers, notifications } = useSelector(state => state.admin);

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      color: 'from-primary/20 to-primary/5',
      icon: FiDollarSign
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: '+8.2%',
      color: 'from-success/20 to-success/5',
      icon: FiPackage
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      change: '+3.1%',
      color: 'from-accent/20 to-accent/5',
      icon: FiShoppingBag
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      change: '+5.4%',
      color: 'from-secondary/20 to-secondary/5',
      icon: FiUsers
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Dashboard Overview</h1>
        <p className="text-text-muted">Welcome back, Admin!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-primary mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-sm text-text-muted mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-secondary mb-1">{stat.value}</p>
              <p className="text-sm text-success flex items-center gap-1">
                <FiChevronRight className="rotate-[-90deg]" /> {stat.change} this month
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section (Dummy) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Revenue Overview</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">
              <FiTrendingUp size={48} className="mx-auto mb-2 opacity-30" />
              Chart placeholder
            </p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Orders Overview</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">
              <FiBarChart2 size={48} className="mx-auto mb-2 opacity-30" />
              Chart placeholder
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Recent Orders</h3>
          <div className="divide-y divide-border">
            {stats.recentOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary">{order.id}</p>
                  <p className="text-sm text-text-muted">{order.customer} • {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold",
                    order.status === 'Delivered' && "bg-success/20 text-success",
                    order.status === 'Processing' && "bg-primary/20 text-primary",
                    order.status === 'Shipped' && "bg-accent/20 text-accent",
                    order.status === 'Cancelled' && "bg-danger/20 text-danger"
                  )}>{order.status}</span>
                  <span className="font-semibold text-secondary">${order.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Top Products</h3>
          <div className="divide-y divide-border">
            {stats.topProducts.map(product => (
              <div key={product.id} className="py-3 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary truncate">{product.name}</p>
                  <p className="text-sm text-text-muted">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Revenue Page
function AdminRevenue() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Revenue</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-2">This Month</p>
          <p className="text-2xl font-bold text-secondary">$45,230</p>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-2">Last Month</p>
          <p className="text-2xl font-bold text-secondary">$39,870</p>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-2">YTD Total</p>
          <p className="text-2xl font-bold text-secondary">$124,560</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-secondary mb-4">Revenue Chart</h3>
        <div className="h-80 bg-muted/30 rounded-xl flex items-center justify-center">
          <p className="text-text-muted text-center">
            <FiTrendingUp size={48} className="mx-auto mb-2 opacity-30" />
            Revenue chart placeholder
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Orders Page
function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.admin);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
    toast.success('Order status updated');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Orders</h1>
        <Button leftIcon={<FiPlus />}>Add Order</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Order ID</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Customer</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Total</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-secondary">{order.id}</td>
                  <td className="p-4 text-text-secondary">{order.customer}</td>
                  <td className="p-4 text-text-secondary">{order.email}</td>
                  <td className="p-4 text-text-secondary">{order.date}</td>
                  <td className="p-4 font-semibold text-secondary">${order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      order.status === 'Delivered' && "bg-success/20 text-success",
                      order.status === 'Processing' && "bg-primary/20 text-primary",
                      order.status === 'Shipped' && "bg-accent/20 text-accent",
                      order.status === 'Cancelled' && "bg-danger/20 text-danger"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="border border-border rounded-lg px-3 py-1.5 bg-card text-secondary"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Inventory Page
function AdminInventory() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Inventory</h1>
        <Button leftIcon={<FiPlus />}>Add Product</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Product</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Price</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Stock</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-secondary">{product.name}</td>
                  <td className="p-4 text-text-secondary">{product.category}</td>
                  <td className="p-4 font-semibold text-secondary">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      product.stock > 50 ? "bg-success/20 text-success" : product.stock > 10 ? "bg-accent/20 text-accent" : "bg-danger/20 text-danger"
                    )}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      product.status === 'Active' && "bg-success/20 text-success",
                      product.status === 'Low Stock' && "bg-danger/20 text-danger"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
                      <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger hover:text-danger/80" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Analytics Page
function AdminAnalytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Analytics</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Traffic</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">Traffic chart placeholder</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Conversion Rate</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">Conversion chart placeholder</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Top Categories</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">Top categories chart placeholder</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Sales Funnel</h3>
          <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center">
            <p className="text-text-muted text-center">Sales funnel chart placeholder</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Customers Page
function AdminCustomers() {
  const { customers } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Customers</h1>
        <Button leftIcon={<FiPlus />}>Add Customer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xl">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-secondary">{customer.name}</h4>
                <p className="text-sm text-text-muted">{customer.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted">Orders</p>
                <p className="font-semibold text-secondary">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Total Spent</p>
                <p className="font-semibold text-secondary">{customer.spent}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-text-muted">Joined: {customer.joined}</p>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Products Page
function AdminProducts() {
  const { products } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Products</h1>
        <Button leftIcon={<FiPlus />}>Add Product</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Price</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Stock</th>
                <th className="text-left p-4 text-sm font-semibold text-secondary">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-secondary">{product.name}</td>
                  <td className="p-4 text-text-secondary">{product.category}</td>
                  <td className="p-4 font-semibold text-secondary">${product.price.toFixed(2)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      product.status === 'Active' && "bg-success/20 text-success",
                      product.status === 'Low Stock' && "bg-danger/20 text-danger"
                    )}>{product.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
                      <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Coupons Page
function AdminCoupons() {
  const { coupons } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Coupons</h1>
        <Button leftIcon={<FiPlus />}>Create Coupon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-secondary">{coupon.code}</h4>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                coupon.status === 'Active' ? "bg-success/20 text-success" : "bg-muted/50 text-text-muted"
              )}>{coupon.status}</span>
            </div>
            <p className="text-text-muted mb-2">Type: {coupon.type}</p>
            <p className="text-2xl font-bold text-primary mb-3">{coupon.value}</p>
            <p className="text-sm text-text-muted">{coupon.uses} uses</p>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
              <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Reviews Page
function AdminReviews() {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Reviews</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-secondary">{review.product}</p>
                <p className="text-sm text-text-muted">{review.customer} • {review.date}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                review.status === 'Approved' && "bg-success/20 text-success",
                review.status === 'Pending' && "bg-primary/20 text-primary"
              )}>{review.status}</span>
            </div>
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={16} className={i < review.rating ? 'text-yellow-500' : 'text-text-muted'} />
              ))}
            </div>
            <p className="text-text-secondary mb-4">Great product! Highly recommend it to everyone looking for quality.</p>
            <div className="flex items-center gap-2">
              {review.status === 'Pending' && (
                <Button variant="ghost" size="sm" leftIcon={<FiCheckCircle />} onClick={() => dispatch(approveReview(review.id))}>Approve</Button>
              )}
              <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger" onClick={() => dispatch(deleteReview(review.id))}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Blogs Page
function AdminBlogs() {
  const { blogs } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Blogs</h1>
        <Button leftIcon={<FiPlus />}>New Post</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="h-48 bg-muted/30 flex items-center justify-center">
              <p className="text-text-muted">Blog image</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">{blog.date}</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  blog.status === 'Published' && "bg-success/20 text-success",
                  blog.status === 'Draft' && "bg-muted/50 text-text-muted"
                )}>{blog.status}</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{blog.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-muted">By {blog.author} • {blog.views} views</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
                  <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Notifications Page
function AdminNotifications() {
  const dispatch = useDispatch();
  const { notifications } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Notifications</h1>
        <Button variant="ghost" onClick={() => dispatch(markAllNotificationsRead())}>Mark All as Read</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={cn(
                "p-6 flex items-start gap-4 cursor-pointer transition-colors",
                !notif.read ? "bg-primary/5" : "hover:bg-muted/30"
              )}
              onClick={() => dispatch(markNotificationRead(notif.id))}
            >
              <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-primary flex-shrink-0">
                <FiBell size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-secondary">{notif.title}</h4>
                  <p className="text-xs text-text-muted">{notif.date}</p>
                </div>
                <p className="text-text-secondary mt-1">{notif.message}</p>
              </div>
              {!notif.read && <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Banners Page
function AdminBanners() {
  const dispatch = useDispatch();
  const { banners } = useSelector(state => state.admin);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Banner Management</h1>
        <Button leftIcon={<FiPlus />}>Add Banner</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {banners.map(banner => (
          <div key={banner.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="h-48 bg-muted/30 flex items-center justify-center relative">
              <p className="text-text-muted">Banner: {banner.title}</p>
              <span className={cn(
                "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold",
                banner.status === 'Active' ? "bg-success/20 text-success" : "bg-muted/50 text-text-muted"
              )}>{banner.status}</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">{banner.title}</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" leftIcon={<FiEdit />} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(toggleBannerStatus(banner.id))}
                >
                  {banner.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<FiTrash2 />} className="text-danger" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
