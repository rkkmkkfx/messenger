import './reset.pcss';
import './global.pcss';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faPaperclip,
  faPaperPlane,
  faSignOutAlt,
  faTrash,
  faTimes,
  faUserPlus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import '@fontsource/noto-sans';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Creact from './core/Creact';

import router from './core/router';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import MessengerPage from './pages/messenger';
import ErrorPage from './pages/error';

router
  .use('/', <SignInPage />)
  .use('/sign-up', <SignUpPage />)
  .use('/messenger', <MessengerPage />)
  .use('/error', <ErrorPage />)
  .connect(document.getElementById('app')!);

library.add(faPaperclip, faPaperPlane, faSignOutAlt, faUser, faTrash, faTimes, faUserPlus, faPlus);
dom.watch();
