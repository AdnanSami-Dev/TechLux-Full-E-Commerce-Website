import { useState, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductCard from "../components/cards/ProductCard";
import ProductListItem from "../components/shop/ProductListItem";
import ProductQuickView from "../components/cards/ProductQuickView";
import ShopToolbar from "../components/shop/ShopToolbar";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import Pagination from "../components/shop/Pagination";
import {
  shopProducts,
  categories,
  brands,
} from "../data/shopProducts";

export default function Shop() {
  // State management
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const productsPerPage = 12;

  // Calculate price range for filters
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = shopProducts.map((p) => p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, []);

  // Filter state
  const [filters, setFilters] = useState({
    category: "All Categories",
    brands: [],
    priceRange: [minPrice, maxPrice],
    rating: null,
    inStock: "all",
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...shopProducts];

    // Category filter
    if (filters.category !== "All Categories") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // Availability filter
    if (filters.inStock !== "all") {
      result = result.filter((p) => p.inStock === filters.inStock);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy, minPrice, maxPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  // Handlers
  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  const handleClearFilters = () => {
    setFilters({
      category: "All Categories",
      brands: [],
      priceRange: [minPrice, maxPrice],
      rating: null,
      inStock: "all",
    });
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop", active: true },
  ];

  return (
    <MainLayout>
      <section className="py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Shop Our Premium Collection
          </h1>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl">
            Discover our curated selection of high-quality tech products, from laptops and accessories to gaming gear and smart devices.
          </p>

          <ShopToolbar
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            productCount={filteredProducts.length}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />

          <div className="flex gap-8">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:block w-72 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                brands={brands}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Products */}
            <div className="flex-1">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="flex">
                      <ProductCard
                        product={product}
                        onQuickView={handleQuickView}
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-text-secondary mb-4">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        brands={brands}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onClearFilters={handleClearFilters}
      />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={handleCloseQuickView}
      />
    </MainLayout>
  );
}
