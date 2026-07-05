import FilterSidebar from "./FilterSidebar";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  categories,
  brands,
  minPrice,
  maxPrice,
  onClearFilters,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      position="left"
      size="md"
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onClearFilters={onClearFilters}
          />
        </div>
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <Button className="w-full" onClick={onClose}>
            Show Results
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
