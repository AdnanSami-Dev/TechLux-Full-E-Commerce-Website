import Container from "../ui/Container";

export default function TopAnnouncementBar() {
  return (
    <div className="bg-secondary text-primary-foreground py-2">
      <Container className="flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="animate-pulse">🎉</span>
          <span className="hidden sm:inline">
            Free shipping on all orders over <strong>$100</strong>
          </span>
          <span className="sm:hidden">Free shipping over $100</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-primary transition-colors">
            Store Locator
          </button>
          <button className="hover:text-primary transition-colors">
            Track Order
          </button>
          <select className="bg-transparent border-none text-sm focus:outline-none cursor-pointer">
            <option>English</option>
            <option>Bangla</option>
            <option>Spanish</option>
          </select>
        </div>
      </Container>
    </div>
  );
}
