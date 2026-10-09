import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import './styles/instrument-sans.css';
import './styles/ibm-plex-mono.css';
import './styles/tokens.css';
import './styles/site.css';
import './styles/navigation.css';
import './styles/search-preview.css';
import './styles/trust-marquee.css';
import './styles/micro-motion.css';
import './styles/billing-dock.css';
import './styles/interaction-feedback.css';
import './styles/closing-action.css';
import './styles/mobile-layout.css';
import './styles/localization.css';
import './styles/text-motion.css';
import './styles/interface-layout.css';
import './styles/search-composition.css';

const element = document.getElementById('root');
if (!element) throw new Error('The application root was not found.');
createRoot(element).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);

import './components/sections/StepCarousel.css';
import './components/sections/AudienceSection.css';
import './components/sections/DataSection.css';
import './components/sections/ApiSection.css';
import './components/sections/PricingSection.css';
import './components/Footer.css';

import './styles/theme.css';
import './styles/theme-demos.css';

import './styles/stage2.css';
