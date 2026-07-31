import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Statistics from "../../components/home/Statistics";
import Testimonials from "../../components/home/Testimonials";
import Pricing from "../../components/home/Pricing";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricing />
    </main>
  );
}