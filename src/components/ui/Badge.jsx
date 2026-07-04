import { cn } from "../../utils/cn";

const variants = {
  default: "bg-muted text-text-primary",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export default function Badge({ variant = "default", className, children }) {
  return (
    <span
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}
    >
      {children}
    </span>
  );
}
