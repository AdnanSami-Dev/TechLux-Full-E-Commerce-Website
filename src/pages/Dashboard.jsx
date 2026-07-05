import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiPackage, 
  FiHeart, 
  FiCreditCard, 
  FiAward, 
  FiUsers, 
  FiFileText, 
  FiMapPin, 
  FiBell, 
  FiSettings, 
  FiClock,
  FiMenu,
  FiX,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiGift
} from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  markNotificationRead, 
  markAllNotificationsRead, 
  setDefaultAddress, 
  updateUserProfile 
} from '../redux/slices/dashboardSlice';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.dashboard.user);
  const unreadCount = useSelector(state => state.dashboard.notifications.filter(n => !n.read).length);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Overview' },
    { path: '/dashboard/orders', icon: FiPackage, label: 'Orders' },
    { path: '/dashboard/wishlist', icon: FiHeart, label: 'Wishlist' },
    { path: '/dashboard/wallet', icon: FiCreditCard, label: 'Wallet' },
    { path: '/dashboard/rewards', icon: FiAward, label: 'Rewards' },
    { path: '/dashboard/referrals', icon: FiUsers, label: 'Referrals' },
    { path: '/dashboard/invoices', icon: FiFileText, label: 'Invoices' },
    { path: '/dashboard/addresses', icon: FiMapPin, label: 'Addresses' },
    { path: '/dashboard/notifications', icon: FiBell, label: `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}` },
    { path: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
    { path: '/dashboard/timeline', icon: FiClock, label: 'Timeline' }
  ];

  const activePath = location.pathname;

  return (
    <MainLayout>
      <div className="min-h-screen bg-muted/30">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="primary" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)} leftIcon={isSidebarOpen ? <FiX /> : <FiMenu />}>
            Menu
          </Button>
        </div>

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-card border-r border-border shadow-xl lg:shadow-none"
              >
                <div className="p-6">
                  <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
                      T
                    </div>
                    <span className="text-xl font-bold text-secondary">TechLux</span>
                  </Link>

                  {/* User profile */}
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl mb-6 border border-border">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-secondary truncate">{user.name}</p>
                      <p className="text-sm text-text-muted truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePath === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-md flex items-center justify-center transition-all",
                            isActive ? "bg-primary text-white" : "text-text-muted hover:text-secondary hover:bg-muted"
                          )}>
                            <Icon size={18} />
                          </div>
                          <span className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-primary" : "text-secondary hover:text-primary"
                          )}>
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeNav"
                              className="ml-auto text-primary"
                            >
                              <FiChevronRight size={18} />
                            </motion.div>
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
                  <Link to="/" className="block">
                    <Button variant="outline" className="w-full" leftIcon={<FiHome />}>
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
          <div className="flex-1 lg:ml-0">
            <div className="p-6 lg:p-10">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/orders" element={<DashboardOrders />} />
                <Route path="/wishlist" element={<DashboardWishlist />} />
                <Route path="/wallet" element={<DashboardWallet />} />
                <Route path="/rewards" element={<DashboardRewards />} />
                <Route path="/referrals" element={<DashboardReferrals />} />
                <Route path="/invoices" element={<DashboardInvoices />} />
                <Route path="/addresses" element={<DashboardAddresses />} />
                <Route path="/notifications" element={<DashboardNotifications />} />
                <Route path="/settings" element={<DashboardSettings />} />
                <Route path="/timeline" element={<DashboardTimeline />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Overview Page
function DashboardOverview() {
  const { orders, wallet, rewards, user } = useSelector(state => state.dashboard);
  const totalSpent = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0);

  const stats = [
    { 
      title: 'Total Orders', 
      value: orders.filter(o => o.status !== 'cancelled').length, 
      change: '+12%',
      icon: FiPackage, 
      color: 'from-primary/20 to-primary/5' 
    },
    { 
      title: 'Wallet Balance', 
      value: `$${wallet.balance.toFixed(2)}`, 
      change: '+$50',
      icon: FiCreditCard, 
      color: 'from-success/20 to-success/5' 
    },
    { 
      title: 'Reward Points', 
      value: rewards.points.toLocaleString(), 
      change: '+250',
      icon: FiAward, 
      color: 'from-accent/20 to-accent/5' 
    },
    { 
      title: 'Total Spent', 
      value: `$${totalSpent.toFixed(2)}`, 
      change: '+$249',
      icon: FiFileText, 
      color: 'from-secondary/20 to-secondary/5' 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Hello, {user.name.split(' ')[0]}!</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-primary mb-4`}>
                <Icon size={28} />
              </div>
              <p className="text-sm text-text-muted mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-secondary mb-1">{stat.value}</p>
              <p className="text-sm text-success flex items-center gap-1">
                <FiChevronRight className="rotate-[-90deg]" /> {stat.change} this month
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary">Recent Orders</h2>
          <Link to="/dashboard/orders">
            <Button variant="ghost" rightIcon={<FiChevronRight />}>
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-muted">Order</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-muted">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-muted">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-muted">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map(order => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-secondary">{order.id}</p>
                    <p className="text-sm text-text-muted">{order.items} item{order.items !== 1 ? 's' : ''}</p>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">{order.date}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      order.status === 'delivered' && "bg-success/20 text-success",
                      order.status === 'processing' && "bg-primary/20 text-primary",
                      order.status === 'cancelled' && "bg-danger/20 text-danger"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-secondary">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/dashboard/wallet">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:border-primary/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center text-success mb-4">
              <FiCreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold text-secondary mb-2">Top Up Wallet</h3>
            <p className="text-text-muted">Add funds to your wallet and get bonus points</p>
          </div>
        </Link>
        <Link to="/dashboard/referrals">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:border-primary/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent mb-4">
              <FiUsers size={24} />
            </div>
            <h3 className="text-lg font-bold text-secondary mb-2">Refer Friends</h3>
            <p className="text-text-muted">Invite friends and earn $50 for each referral</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

// Orders Page
function DashboardOrders() {
  const orders = useSelector(state => state.dashboard.orders);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Orders</h1>
      </div>
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-secondary">Order History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-secondary">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-secondary">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-secondary">Items</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-secondary">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-secondary">Total</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-secondary">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-semibold text-secondary">{order.id}</td>
                  <td className="py-4 px-6 text-text-secondary">{order.date}</td>
                  <td className="py-4 px-6 text-text-secondary">{order.items}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      order.status === 'delivered' && "bg-success/20 text-success",
                      order.status === 'processing' && "bg-primary/20 text-primary",
                      order.status === 'cancelled' && "bg-danger/20 text-danger"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-secondary">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="outline" size="sm">View</Button>
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

// Wishlist Page
function DashboardWishlist() {
  const wishlistItems = useSelector(state => state.wishlist.items);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Wishlist</h1>
        <span className="text-text-muted">{wishlistItems.length} items</span>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-12 text-center">
          <FiHeart size={64} className="mx-auto text-primary/30 mb-4" />
          <h3 className="text-xl font-bold text-secondary mb-2">Your wishlist is empty</h3>
          <p className="text-text-muted mb-6">Browse products and save your favorites here</p>
          <Link to="/shop">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted/30">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Wallet Page
function DashboardWallet() {
  const wallet = useSelector(state => state.dashboard.wallet);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Wallet</h1>
        <Button variant="primary" leftIcon={<FiPlus />}>Top Up</Button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white mb-10 shadow-lg shadow-primary/20">
        <p className="text-white/80 mb-2">Available Balance</p>
        <p className="text-5xl font-bold mb-6">${wallet.balance.toFixed(2)}</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="bg-white/20 text-white border-none hover:bg-white/30">Top Up</Button>
          <Button variant="ghost" className="bg-white/20 text-white border-none hover:bg-white/30">Withdraw</Button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-secondary">Transaction History</h2>
        </div>
        <div className="divide-y divide-border">
          {wallet.transactions.map(tx => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  tx.type === 'credit' ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                )}>
                  {tx.type === 'credit' ? <FiPlus /> : <FiMinus />}
                </div>
                <div>
                  <p className="font-semibold text-secondary">{tx.description}</p>
                  <p className="text-sm text-text-muted">{tx.date}</p>
                </div>
              </div>
              <p className={cn(
                "font-bold text-lg",
                tx.type === 'credit' ? "text-success" : "text-danger"
              )}>
                {tx.type === 'credit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Rewards Page
function DashboardRewards() {
  const rewards = useSelector(state => state.dashboard.rewards);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Rewards</h1>
        <span className="text-text-muted">{rewards.points.toLocaleString()} pts</span>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border p-8 mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-text-muted mb-1">Current Level</p>
            <p className="text-3xl font-bold text-secondary">{rewards.level}</p>
          </div>
          <div className="text-right">
            <p className="text-text-muted mb-1">Next Level</p>
            <p className="text-2xl font-bold text-primary">{rewards.nextLevel}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-muted">Progress</span>
            <span className="text-sm font-semibold text-secondary">{rewards.pointsToNextLevel} pts to go</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${((rewards.points / (rewards.points + rewards.pointsToNextLevel)) * 100).toFixed(0)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-secondary">Points History</h2>
        </div>
        <div className="divide-y divide-border">
          {rewards.history.map(item => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-semibold text-secondary">{item.description}</p>
                <p className="text-sm text-text-muted">{item.date}</p>
              </div>
              <p className="font-bold text-lg text-success">+{item.points} pts</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Referrals Page
function DashboardReferrals() {
  const referrals = useSelector(state => state.dashboard.referrals);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(`https://techlux.shop/ref/${referrals.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Referrals</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-1">Total Referrals</p>
          <p className="text-3xl font-bold text-primary">{referrals.count}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-success">${referrals.earnings.toFixed(2)}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <p className="text-text-muted mb-1">Referral Code</p>
          <p className="text-2xl font-bold text-secondary">{referrals.code}</p>
        </div>
      </div>

      {/* Share link */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-10">
        <h3 className="text-lg font-semibold text-secondary mb-4">Share your link</h3>
        <div className="flex gap-3">
          <div className="flex-1 bg-muted/30 rounded-xl p-4 border border-border">
            <p className="text-secondary font-medium truncate">https://techlux.shop/ref/{referrals.code}</p>
          </div>
          <Button variant="primary" onClick={handleCopyCode} leftIcon={<FiFileText />}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-secondary">Referral History</h2>
        </div>
        <div className="divide-y divide-border">
          {referrals.list.map(ref => (
            <div key={ref.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-semibold text-secondary">{ref.name}</p>
                <p className="text-sm text-text-muted">{ref.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  ref.status === 'completed' ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                )}>
                  {ref.status}
                </span>
                <p className="font-bold text-success">+${ref.reward.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Invoices Page
function DashboardInvoices() {
  const invoices = useSelector(state => state.dashboard.invoices);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Invoices</h1>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-secondary">Your Invoices</h2>
        </div>
        <div className="divide-y divide-border">
          {invoices.map(invoice => (
            <div key={invoice.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-semibold text-secondary">{invoice.id}</p>
                <p className="text-sm text-text-muted">{invoice.date} • {invoice.orderId}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  invoice.status === 'paid' ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                )}>
                  {invoice.status}
                </span>
                <p className="font-bold text-secondary">${invoice.total.toFixed(2)}</p>
                <Button variant="outline" size="sm" leftIcon={<FiFileText />}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Addresses Page
function DashboardAddresses() {
  const { addresses } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Addresses</h1>
        <Button variant="primary" leftIcon={<FiPlus />}>Add Address</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map(addr => (
          <div key={addr.id} className={cn(
            "bg-card rounded-2xl border-2 p-6 transition-all",
            addr.isDefault ? "border-primary shadow-lg shadow-primary/10" : "border-border shadow-sm hover:border-primary/50"
          )}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                {addr.type}
              </span>
              {addr.isDefault && (
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                  Default
                </span>
              )}
            </div>
            <p className="font-semibold text-secondary mb-1">{addr.name}</p>
            <p className="text-text-secondary mb-1">{addr.phone}</p>
            <p className="text-text-secondary mb-1">{addr.address}</p>
            <p className="text-text-secondary mb-4">{addr.city}, {addr.state} {addr.zipCode}, {addr.country}</p>
            <div className="flex gap-3">
              {!addr.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => dispatch(setDefaultAddress(addr.id))}
                >
                  Set Default
                </Button>
              )}
              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Notifications Page
function DashboardNotifications() {
  const { notifications } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary">Notifications</h1>
        <Button variant="outline" onClick={() => dispatch(markAllNotificationsRead())}>Mark all as read</Button>
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
              <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center text-primary flex-shrink-0">
                {notif.type === 'order' && <FiPackage />}
                {notif.type === 'reward' && <FiAward />}
                {notif.type === 'referral' && <FiUsers />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-secondary">{notif.title}</h3>
                  <p className="text-xs text-text-muted">{notif.date}</p>
                </div>
                <p className="text-text-secondary">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Settings Page
function DashboardSettings() {
  const { user } = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    toast.success('Profile updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Settings</h1>
        <p className="text-text-muted">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-sm p-8">
            <h2 className="text-xl font-bold text-secondary mb-6">Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                <Input
                  value={formData.name.split(' ')[0]}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value + ' ' + formData.name.split(' ')[1] || '' })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                <Input
                  value={formData.name.split(' ')[1] || ''}
                  onChange={(e) => setFormData({ ...formData, name: (formData.name.split(' ')[0] || '') + ' ' + e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <Button variant="primary" type="submit">Save Changes</Button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold text-secondary mb-4">Avatar</h3>
            <div className="flex items-center gap-4">
              <img src={formData.avatar} alt={formData.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold text-secondary mb-4">Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Change Password</Button>
              <Button variant="outline" className="w-full">Two-Factor Auth</Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold text-danger mb-4">Danger Zone</h3>
            <Button variant="outline" className="w-full border-danger text-danger hover:bg-danger/10">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline Page
function DashboardTimeline() {
  const { timeline } = useSelector(state => state.dashboard);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Timeline</h1>
        <p className="text-text-muted">Your activity history</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />
        {timeline.map((item, index) => {
          const Icon = item.icon === 'check-circle' ? FiCheckCircle : item.icon === 'award' ? FiAward : FiGift;
          return (
            <div key={item.id} className="relative pl-10 md:pl-20 pb-10">
              <div className={cn(
                "absolute left-0 md:left-4 w-8 h-8 rounded-full flex items-center justify-center border-4 border-card z-10",
                item.color === 'success' ? "bg-success" : item.color === 'primary' ? "bg-primary" : "bg-accent"
              )}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-secondary text-lg">{item.title}</h3>
                  <span className="text-sm text-text-muted">{item.date}</span>
                </div>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default DashboardLayout;
