import { cn } from "../../utils/cn";

export default function Container({ className, children, as = "div", ...props }) {
  const Component = as;
  return (
    <Component
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
