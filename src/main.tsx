import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import './styles/instrument-sans.css';
import './styles/ibm-plex-mono.css';
import './styles/cyrillic.css';
import './styles/tokens.css';
import './styles/site.css';
import './styles/navigation.css';
import './styles/search-preview.css';
import './styles/trust-marquee.css';
import './styles/refinements.css';
import './styles/micro-motion.css';
import './styles/billing-dock.css';
import './styles/interaction-feedback.css';
import './styles/closing-action.css';
import './styles/mobile-refinement.css';
import './styles/localization.css';
import './styles/text-motion.css';
import './styles/refinement-r8.css';
import './styles/refinement-r10.css';

const element = document.getElementById('root');
if (!element) throw new Error('The application root was not found.');
createRoot(element).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);

import './components/sections/StepCarousel.css';
import './components/sections/AudienceSection.css';
import './components/sections/DataSection.css';
import './components/sections/ApiSection.css';
