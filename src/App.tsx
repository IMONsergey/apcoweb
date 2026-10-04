import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { SearchPreview } from './components/sections/SearchPreview';
import { StepCarousel } from './components/sections/StepCarousel';
import { AudienceSection } from './components/sections/AudienceSection';
import { DataSection } from './components/sections/DataSection';
import { ApiSection } from './components/sections/ApiSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { MotionProvider } from './components/visuals/MotionProvider';
import { Visual } from './components/visuals/Visual';
export function App() {
  return (
    <MotionProvider>
      <div id="top" className="site">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <SearchPreview />
          <StepCarousel />
          <AudienceSection />
          <DataSection />
          <ApiSection />
          <PricingSection />
          <div className="lower-scene">
            <Visual kind="waves" />
            <FAQSection />
            <ClosingSection />
          </div>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
