import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import PageTransition from "../../components/shared/PageTransition";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}