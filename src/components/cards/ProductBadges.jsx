// Base Badge Component
import { cn } from "../../utils/cn";

const Badge = ({
  children,
  variant = "default",
  size = "sm",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    danger: "bg-danger text-danger-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    outline: "border border-border bg-transparent text-secondary",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/20",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Discount Badge
export const DiscountBadge = ({ discount = 0, className }) => (
  <Badge variant="danger" className={cn("font-bold", className)}>
    -{discount}%
  </Badge>
);

// New Badge
export const NewBadge = ({ className }) => (
  <Badge variant="success" className={cn("font-bold", className)}>
    NEW
  </Badge>
);

// Stock Badge
export const StockBadge = ({ inStock = true, className }) => (
  <Badge
    variant={inStock ? "success" : "danger"}
    size="xs"
    className={className}
  >
    {inStock ? "In Stock" : "Out of Stock"}
  </Badge>
);

// EMI Badge
export const EMIBadge = ({ amount = 0, className }) => (
  <Badge variant="outline" size="xs" className={cn("font-medium", className)}>
    EMI from ${amount.toFixed(2)}/mo
  </Badge>
);

// Cashback Badge
export const CashbackBadge = ({ amount = 0, className }) => (
  <Badge variant="warning" size="xs" className={cn("font-medium", className)}>
    +${amount.toFixed(2)} Cashback
  </Badge>
);

// Delivery Badge
export const DeliveryBadge = ({ free = true, className }) => (
  <Badge variant="secondary" size="xs" className={cn("font-medium", className)}>
    {free ? "Free Delivery" : "Fast Delivery"}
  </Badge>
);

export default Badge;
