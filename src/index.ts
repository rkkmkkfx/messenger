import './reset.css';
import './global.pcss';

import pageLoader from './utils/pageLoader';

import '@fontsource/noto-sans';

declare global {
  interface Window { eventHandlers: Record<string, () => void>; }
}

window.eventHandlers = window.eventHandlers ?? {};

(async () => {
  const route = window.location.pathname.replaceAll('/', '');
  await pageLoader(route.length ? route : 'home');
})();
