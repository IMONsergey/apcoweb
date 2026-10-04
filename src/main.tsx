import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/instrument-sans.css';
import './styles/ibm-plex-mono.css';
import './styles/tokens.css';
import './styles/site.css';
import './styles/navigation.css';
import './styles/search-preview.css';
import './styles/trust-marquee.css';
import './styles/refinements.css';
import './styles/micro-motion.css';

const element = document.getElementById('root');
if (!element) throw new Error('The application root was not found.');
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
