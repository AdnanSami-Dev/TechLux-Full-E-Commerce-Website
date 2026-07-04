import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-light",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  ghost: "text-secondary hover:bg-muted",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-base rounded-lg",
  lg: "px-7 py-3.5 text-lg rounded-xl",
  icon: "w-10 h-10 rounded-lg flex items-center justify-center",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? (props.children.type || "button") : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
