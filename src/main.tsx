import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/instrument-sans.css';
import './styles/ibm-plex-mono.css';
import './styles/tokens.css';
import './styles/site.css';
const element = document.getElementById('root');
if (!element) throw new Error('The application root was not found.');
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
