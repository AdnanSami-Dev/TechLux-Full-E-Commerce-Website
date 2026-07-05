import { useState } from "react";
import ProductRating from "../cards/ProductRating";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function FilterSidebar({
  filters,
  setFilters,
  categories,
  brands,
  minPrice,
  maxPrice,
  onClearFilters,
}) {
  const [localPriceRange, setLocalPriceRange] = useState([
    filters.priceRange[0],
    filters.priceRange[1],
  ]);

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const handleAvailabilityChange = (inStock) => {
    setFilters((prev) => ({ ...prev, inStock }));
  };

  const handlePriceApply = () => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [localPriceRange[0], localPriceRange[1]],
    }));
  };

  return (
    <div className="sticky top-24 space-y-8 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-secondary">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-primary text-sm font-medium hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-semibold text-secondary mb-4">Price Range</h4>
        <div className="space-y-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localPriceRange[1]}
            onChange={(e) =>
              setLocalPriceRange([
                localPriceRange[0],
                Math.max(localPriceRange[0], parseInt(e.target.value)),
              ])
            }
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) =>
                setLocalPriceRange([
                  Math.min(parseInt(e.target.value) || 0, localPriceRange[1]),
                  localPriceRange[1],
                ])
              }
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Min"
            />
            <span className="text-text-muted">-</span>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) =>
                setLocalPriceRange([
                  localPriceRange[0],
                  Math.max(parseInt(e.target.value) || 0, localPriceRange[0]),
                ])
              }
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Max"
            />
          </div>
          <Button size="sm" className="w-full" onClick={handlePriceApply}>
            Apply Price
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-secondary mb-4">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                filters.category === category
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-secondary hover:bg-muted"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="font-semibold text-secondary mb-4">Brand</h4>
        <div className="space-y-2">
          {brands.filter((b) => b !== "All Brands").map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 accent-primary rounded border-border"
              />
              <span className="text-text-secondary text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="font-semibold text-secondary mb-4">Rating</h4>
        <div className="space-y-2">
          {[4, 4.3, 4.5, 4.7].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                filters.rating === rating
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-secondary hover:bg-muted"
              )}
            >
              <ProductRating rating={rating} showCount={false} />
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h4 className="font-semibold text-secondary mb-4">Availability</h4>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Products" },
            { value: true, label: "In Stock" },
            { value: false, label: "Out of Stock" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAvailabilityChange(option.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                filters.inStock === option.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-secondary hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
