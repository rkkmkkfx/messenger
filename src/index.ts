import './reset.pcss';
import './global.pcss';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import '@fontsource/noto-sans';
import ChatsPage, { props as chatsProps } from './pages/chats';
import UserFormPage from './pages/signup';
import Router from './core/Router';

const router = new Router();

// Можно обновиться на /user и получить сразу пользователя
router
  .use('/', ChatsPage, chatsProps)
  .use('/profile', ChatsPage, chatsProps)
  .use('/signup', UserFormPage, {
    heading: 'Create new user',
    formType: 'signup',
  })
  .use('/signin', UserFormPage, {
    heading: 'Sign In',
    formType: 'signin',
  })
  .connect(document.getElementById('app')!);

// // Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go('/users');
// }, 1000);
//
// // А можно и назад
// setTimeout(() => {
//   router.back();
// }, 3000);
//
// // И снова вперёд
// setTimeout(() => {
//   router.forward();
// }, 5000);

library.add(faPaperclip, faPaperPlane);
dom.watch();
