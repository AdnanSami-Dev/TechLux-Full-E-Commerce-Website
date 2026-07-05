import { FiGrid, FiList, FiFilter } from "react-icons/fi";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function ShopToolbar({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  productCount,
  onOpenMobileFilters,
}) {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <p className="text-text-secondary text-sm">
          <span className="font-semibold text-secondary">{productCount}</span> Products
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<FiFilter />}
          className="md:hidden"
          onClick={onOpenMobileFilters}
        >
          Filters
        </Button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-border bg-card text-secondary px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 transition-all",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-text-secondary hover:text-secondary"
            )}
          >
            <FiGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 transition-all",
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-text-secondary hover:text-secondary"
            )}
          >
            <FiList size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
