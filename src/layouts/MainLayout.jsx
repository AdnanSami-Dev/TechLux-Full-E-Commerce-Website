import MainHeader from "../components/layout/MainHeader";
import Footer from "../components/layout/Footer";
import ScrollProgress from "../components/layout/ScrollProgress";
import BackToTop from "../components/layout/BackToTop";
import FloatingHelp from "../components/layout/FloatingHelp";
import FloatingCart from "../components/layout/FloatingCart";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <MainHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <FloatingHelp />
      <FloatingCart />
    </div>
  );
}
