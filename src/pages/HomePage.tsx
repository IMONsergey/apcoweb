import { Hero } from '../components/sections/Hero';
import { SearchPreview } from '../components/sections/SearchPreview';
import { StepCarousel } from '../components/sections/StepCarousel';
import { AudienceSection } from '../components/sections/AudienceSection';
import { DataSection } from '../components/sections/DataSection';
import { ApiSection } from '../components/sections/ApiSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FAQSection } from '../components/sections/FAQSection';
import { ClosingSection } from '../components/sections/ClosingSection';
import { Visual } from '../components/visuals/Visual';
import { HomeOverview } from './HomeOverview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeOverview />
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
    </>
  );
}
