import { cn } from "../../utils/cn";

export default function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-2.5 bg-input border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
