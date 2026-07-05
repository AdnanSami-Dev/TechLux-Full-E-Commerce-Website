import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Container from '../components/ui/Container';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import ProductRating from '../components/cards/ProductRating';
import { FiTrash2, FiShoppingCart, FiHeart, FiColumns, FiCheck, FiX } from 'react-icons/fi';
import { removeFromCompare, clearCompare } from '../redux/slices/compareSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

export default function Compare() {
  const dispatch = useDispatch();
  const compareItems = useSelector(state => state.compare.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [highlightDifferences, setHighlightDifferences] = useState(true);

  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  const handleRemove = (id) => {
    dispatch(removeFromCompare(id));
    toast.success('Product removed from compare');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const handleWishlistToggle = (product) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    toast.success('Compare list cleared');
  };

  // Helper to check if all values are the same for a row
  const areAllSame = (getter) => {
    if (compareItems.length < 2) return true;
    const firstValue = getter(compareItems[0]);
    return compareItems.every(item => getter(item) === firstValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  if (compareItems.length === 0) {
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
              <FiColumns size={64} className="text-primary opacity-60" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-secondary mb-4"
            >
              No products to compare
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-muted mb-8 max-w-md mx-auto text-lg"
            >
              Add products to your compare list to see them side by side and make the best choice!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/shop">
                <Button variant="primary" size="lg" className="shadow-lg shadow-primary/20">
                  Browse Products
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Compare', href: '/compare', active: true },
                ]}
                className="mb-8"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Compare Products</h1>
                <p className="text-text-muted">
                  Comparing {compareItems.length} product{compareItems.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant={highlightDifferences ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setHighlightDifferences(!highlightDifferences)}
                >
                  {highlightDifferences ? 'Highlight Differences' : 'Show All'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-danger hover:bg-danger/10"
                  onClick={handleClearAll}
                >
                  Clear All
                </Button>
              </div>
            </motion.div>

            {/* Comparison Table */}
            <motion.div 
              variants={itemVariants}
              className="overflow-x-auto rounded-2xl border border-border shadow-sm bg-card"
            >
              <table className="w-full">
                <tbody>
                  {/* Product Info Row */}
                  <tr className="bg-gradient-to-r from-muted/50 to-muted/30">
                    <td className="p-6 font-bold text-secondary w-48 border-r border-border"></td>
                    {compareItems.map((product, index) => (
                      <motion.td
                        key={product.id}
                        as="td"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="p-6 text-center border-r border-border last:border-r-0"
                      >
                        <div className="flex flex-col items-center gap-5">
                          <div className="relative group">
                            <Link to={`/product/${product.id}`} className="block">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="w-48 h-48 mx-auto overflow-hidden rounded-2xl border border-border shadow-sm"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemove(product.id)}
                              className="absolute -top-3 -right-3 bg-gradient-to-r from-danger to-danger/80 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                              <h3 className="font-bold text-secondary line-clamp-2 text-lg">{product.name}</h3>
                            </Link>
                            <div className="flex items-baseline justify-center gap-3">
                              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-text-muted line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <ProductRating rating={product.rating} reviewCount={product.reviews} />
                          </div>
                          <div className="flex gap-3 w-full">
                            <Button
                              variant="primary"
                              size="md"
                              className="flex-1 shadow-md shadow-primary/20"
                              leftIcon={<FiShoppingCart />}
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                            >
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <Button
                              variant={isWishlisted(product.id) ? "primary" : "outline"}
                              size="md"
                              leftIcon={<FiHeart className={isWishlisted(product.id) ? 'fill-current' : ''} />}
                              onClick={() => handleWishlistToggle(product)}
                              className={isWishlisted(product.id) ? "bg-danger hover:bg-danger/90 border-danger shadow-md shadow-danger/20" : ""}
                            >
                              {isWishlisted(product.id) ? 'Wishlisted' : 'Wishlist'}
                            </Button>
                          </div>
                        </div>
                      </motion.td>
                    ))}
                  </tr>

                  {/* Brand Row */}
                  <tr>
                    <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">Brand</td>
                    {compareItems.map(product => {
                      const same = areAllSame(p => p.brand);
                      const highlight = highlightDifferences && !same;
                      return (
                        <td
                          key={product.id}
                          className={cn(
                            "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                            highlight ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold" : "bg-transparent"
                          )}
                        >
                          {product.brand}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Category Row */}
                  <tr>
                    <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">Category</td>
                    {compareItems.map(product => {
                      const same = areAllSame(p => p.category);
                      const highlight = highlightDifferences && !same;
                      return (
                        <td
                          key={product.id}
                          className={cn(
                            "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                            highlight ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold" : "bg-transparent"
                          )}
                        >
                          {product.category}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Rating Row */}
                  <tr>
                    <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">Rating</td>
                    {compareItems.map(product => {
                      const same = areAllSame(p => p.rating);
                      const highlight = highlightDifferences && !same;
                      return (
                        <td
                          key={product.id}
                          className={cn(
                            "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                            highlight ? "bg-gradient-to-r from-primary/15 to-primary/5" : "bg-transparent"
                          )}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-bold text-primary">{product.rating}</span>
                            <span className="text-text-muted">({product.reviews} reviews)</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Stock Row */}
                  <tr>
                    <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">In Stock</td>
                    {compareItems.map(product => {
                      const same = areAllSame(p => p.inStock !== false);
                      const highlight = highlightDifferences && !same;
                      return (
                        <td
                          key={product.id}
                          className={cn(
                            "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                            highlight ? "bg-gradient-to-r from-primary/15 to-primary/5" : "bg-transparent"
                          )}
                        >
                          {product.inStock !== false ? (
                            <span className="inline-flex items-center gap-1.5 text-success font-bold">
                              <FiCheck size={16} /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-danger font-bold">
                              <FiX size={16} /> No
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Specifications Rows */}
                  {compareItems.some(product => product.specifications?.length > 0) && (
                    <>
                      <tr className="bg-gradient-to-r from-muted/50 to-muted/30">
                        <td colSpan={compareItems.length + 1} className="p-5 font-bold text-secondary border-t border-border">
                          <span className="text-lg">Specifications</span>
                        </td>
                      </tr>
                      {(() => {
                        const allSpecNames = new Set();
                        compareItems.forEach(product => {
                          product.specifications?.forEach(spec => allSpecNames.add(spec.name));
                        });
                        return Array.from(allSpecNames).map(specName => (
                          <tr key={specName}>
                            <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">
                              {specName}
                            </td>
                            {compareItems.map(product => {
                              const spec = product.specifications?.find(s => s.name === specName);
                              const same = areAllSame(p => {
                                const s = p.specifications?.find(sp => sp.name === specName);
                                return s?.value;
                              });
                              const highlight = highlightDifferences && !same;
                              return (
                                <td
                                  key={`${product.id}-${specName}`}
                                  className={cn(
                                    "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                                    highlight ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold" : "bg-transparent"
                                  )}
                                >
                                  {spec?.value || '-'}
                                </td>
                              );
                            })}
                          </tr>
                        ));
                      })()}
                    </>
                  )}

                  {/* Description Row */}
                  <tr className="bg-gradient-to-r from-muted/50 to-muted/30">
                    <td colSpan={compareItems.length + 1} className="p-5 font-bold text-secondary border-t border-border">
                      <span className="text-lg">Description</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 font-semibold text-secondary w-48 border-r border-border border-t border-border bg-muted/20">Overview</td>
                    {compareItems.map(product => {
                      const same = areAllSame(p => p.description);
                      const highlight = highlightDifferences && !same;
                      return (
                        <td
                          key={product.id}
                          className={cn(
                            "p-6 text-center border-r border-border border-t border-border last:border-r-0 transition-colors duration-300",
                            highlight ? "bg-gradient-to-r from-primary/15 to-primary/5" : "bg-transparent"
                          )}
                        >
                          <p className="text-text-secondary leading-relaxed">{product.description}</p>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </motion.div>

            {/* Add More Products CTA */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-center"
            >
              {compareItems.length < 4 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-text-muted mb-6 text-lg"
                >
                  You can add up to <span className="font-bold text-primary">{4 - compareItems.length}</span> more product{4 - compareItems.length > 1 ? 's' : ''} to compare!
                </motion.p>
              )}
              <Link to="/shop">
                <Button variant="outline" size="lg" className="shadow-sm">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
