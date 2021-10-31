import './reset.pcss';
import './global.pcss';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import pageLoader from './core/pageLoader';

import '@fontsource/noto-sans';

(async () => {
  const route = window.location.pathname.replaceAll('/', '');
  await pageLoader(route.length ? route : 'home');
  library.add(faPaperclip, faPaperPlane);
  dom.watch();
})();
