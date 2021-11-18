import './reset.pcss';
import './global.pcss';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import '@fontsource/noto-sans';

import router from './core/router';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import MessengerPage from './pages/messenger';
import type { Page } from './core/router/Route';
import ErrorPage from './pages/error';

router
  .use('/', SignInPage as unknown as Page)
  .use('/sign-up', SignUpPage as unknown as Page)
  .use('/messenger', MessengerPage as unknown as Page)
  .use('/error', ErrorPage as unknown as Page)
  .connect(document.getElementById('app')!);

library.add(faPaperclip, faPaperPlane);
dom.watch();
