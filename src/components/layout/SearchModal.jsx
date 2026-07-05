import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX, FiMic, FiImage, FiZap, FiClock, FiTrendingUp, FiStar, FiTag, FiPackage } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { shopProducts, categories, brands } from "../../data/shopProducts";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Link } from "react-router-dom";
import ProductCard from "../cards/ProductCard";

const POPULAR_SEARCHES = ["Gaming Laptop", "Wireless Headphones", "Mechanical Keyboard", "GPU", "Monitor", "Smart Watch"];
const TRENDING_SEARCHES = ["RTX 4090", "OLED Monitor", "Wireless Mouse", "RGB Keyboard"];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem("techluxRecentSearches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState("all");

  const debouncedQuery = useDebounce(query, 300);

  // Filter results based on debounced query
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return { products: [], categories: [], brands: [] };
    }

    const q = debouncedQuery.toLowerCase();
    return {
      products: shopProducts.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      ),
      categories: categories.filter((c) => c.toLowerCase().includes(q) && c !== "All Categories"),
      brands: brands.filter((b) => b.toLowerCase().includes(q) && b !== "All Brands"),
    };
  }, [debouncedQuery]);

  // Save recent search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newRecent = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 8);
    setRecentSearches(newRecent);
    localStorage.setItem("techluxRecentSearches", JSON.stringify(newRecent));
    onClose();
  };

  const handleRecentClick = (searchTerm) => {
    setQuery(searchTerm);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("techluxRecentSearches");
  };

  // Reset query when closing
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveTab("all");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-start justify-center pt-16"
          />
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed z-[61] left-1/2 top-16 -translate-x-1/2 w-full max-w-5xl px-4"
          >
            <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
              {/* Search Input Section */}
              <div className="p-6 pb-4 border-b border-border">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
                  <Input
                    placeholder="Search products, brands, categories with AI..."
                    className="pl-14 pr-12 text-lg py-5 rounded-2xl bg-muted/50 border-muted"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Voice Search"
                    >
                      <FiMic size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="Image Search"
                    >
                      <FiImage size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      title="AI Search"
                    >
                      <FiZap size={20} />
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={onClose}
                      className="ml-1"
                    >
                      <FiX size={22} />
                    </Button>
                  </div>
                </form>
              </div>

              {/* Results Section */}
              <div className="p-6 pt-2 max-h-[65vh] overflow-y-auto">
                {!debouncedQuery.trim() ? (
                  // Initial State: Recent, Popular, Trending
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-secondary flex items-center gap-2">
                            <FiClock size={16} className="text-primary" /> Recent
                          </h3>
                          <button
                            onClick={clearRecent}
                            className="text-xs text-text-muted hover:text-danger transition-colors"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleRecentClick(term)}
                              className="w-full text-left px-4 py-3 rounded-xl bg-muted/30 text-text-secondary hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-between"
                            >
                              <span>{term}</span>
                              <FiSearch size={14} className="opacity-50" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
                        <FiStar size={16} className="text-primary" /> Popular
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-4 py-2 bg-muted/50 rounded-full text-sm text-text-secondary hover:bg-primary hover:text-white transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trending Searches */}
                    <div>
                      <h3 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
                        <FiTrendingUp size={16} className="text-primary" /> Trending
                      </h3>
                      <div className="space-y-2">
                        {TRENDING_SEARCHES.map((term, i) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 text-secondary hover:from-primary/10 hover:to-accent/10 transition-all flex items-center gap-3"
                          >
                            <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Search Results
                  <div className="space-y-8">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-border pb-1">
                      {["all", "products", "categories", "brands"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-2 px-3 text-sm font-medium transition-colors capitalize ${
                            activeTab === tab ? "text-primary border-b-2 border-primary" : "text-text-muted hover:text-secondary"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Content based on tab */}
                    {(activeTab === "all" || activeTab === "products") && results.products.length > 0 && (
                      <div>
                        {(activeTab === "all" || (activeTab === "products")) && (
                          <h4 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
                            <FiPackage size={16} className="text-primary" /> Products ({results.products.length})
                          </h4>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {results.products.slice(0, activeTab === "all" ? 4 : 12).map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              onClick={onClose}
                            >
                              <ProductCard product={product} className="!shadow-sm !hover:shadow-lg" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeTab === "all" || activeTab === "categories") && results.categories.length > 0 && (
                      <div>
                        {(activeTab === "all" || activeTab === "categories") && (
                          <h4 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
                            <FiTag size={16} className="text-primary" /> Categories ({results.categories.length})
                          </h4>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {results.categories.map((category) => (
                            <Link
                              key={category}
                              to={`/shop`}
                              onClick={onClose}
                              className="px-4 py-3 bg-muted/50 rounded-xl text-sm text-text-secondary hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                            >
                              <FiTag size={14} /> {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeTab === "all" || activeTab === "brands") && results.brands.length > 0 && (
                      <div>
                        {(activeTab === "all" || activeTab === "brands") && (
                          <h4 className="text-sm font-semibold text-secondary mb-4 flex items-center gap-2">
                            <FiStar size={16} className="text-primary" /> Brands ({results.brands.length})
                          </h4>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {results.brands.map((brand) => (
                            <Link
                              key={brand}
                              to={`/shop`}
                              onClick={onClose}
                              className="px-4 py-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl text-sm text-text-secondary hover:from-primary/10 hover:to-accent/10 transition-all border border-primary/10"
                            >
                              {brand}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {results.products.length === 0 && results.categories.length === 0 && results.brands.length === 0 && (
                      <div className="text-center py-12">
                        <FiSearch size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
                        <p className="text-lg font-medium text-secondary mb-2">No results found</p>
                        <p className="text-text-muted text-sm">Try different keywords or check your spelling</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
