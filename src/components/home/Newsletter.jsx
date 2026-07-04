import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Newsletter() {
  return (
    <section className="py-16 bg-primary/10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold text-secondary mb-3">Join Our Newsletter</h3>
            <p className="text-gray-600">Get updates on new products, exclusive offers and more</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
            />
            <Button className="whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
