import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumb({ items, className }) {
  return (
    <nav className={cn("flex items-center text-sm text-text-secondary", className)}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <FiChevronRight size={16} className="mx-2 text-text-muted" />}
          {index === items.length - 1 ? (
            <span className="text-text-primary font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
