export { default } from './HomePage';

export const props = {
  links: [
    { title: 'Sign In Component', href: '/signin' },
    { title: 'Sign Up Component', href: '/signup' },
    { title: 'Chats Component(unfinished)', href: '/chats' },
    { title: 'Profile Component', href: '/profile' },
    { title: 'Edit Profile Component', href: '/edit-profile' },
    { title: 'Change Password Component', href: '/change-password' },
    { title: '404 Component', href: '/404' },
    { title: '5** error Component', href: '/error?status=500&message=Internal%20server%20error' },
  ],
};
