import Hero from "./(marketing)/components/Hero";
import HowItWorks from "./(marketing)/components/HowItWorks";
import ForFounders from "./(marketing)/components/ForFounders";
import ForLawyers from "./(marketing)/components/ForLawyers";
import Agents from "./(marketing)/components/Agents";
import Testimonials from "./(marketing)/components/Testimonials";
import CTA from "./(marketing)/components/CTA";
import Footer from "./(marketing)/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <ForFounders />
      <ForLawyers />
      <Agents />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}