import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Gallery from "../../components/home/Gallery";
import Statistics from "../../components/home/Statistics";
import Testimonials from "../../components/home/Testimonials";
import Pricing from "../../components/home/Pricing";
import ContactForm from "../../components/home/ContactForm";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Gallery />
      <Statistics />
      <Testimonials />
      <Pricing />
      <ContactForm />
    </main>
  );
}