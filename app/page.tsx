import { CategorySection } from "./component/CategorySection";
import { FeatureSection } from "./component/FeatureSection";
import FooterSection from "./component/FooterSection";

import { HeroSection } from "./component/HeroSection";
import Navbar from "./component/Navbar";
import { ProductSection } from "./component/ProductSection";
import { WhyChooseUsSection } from "./component/why-choose-us-section";
import { MobileSearch } from "./component/MobileSearch";
import AboutSection from "./component/AboutSection";
import NewProducts from "./component/NewProducts";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />
      {/* Mobile Search Button (visible on mobile screen or similar) */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <MobileSearch />
      </div>
      <main>
        <HeroSection />

        <CategorySection />
        <NewProducts />
        <ProductSection />
        <FeatureSection />
        <WhyChooseUsSection />
        <AboutSection />
      </main>
      <FooterSection />
    </div>
  );
}
