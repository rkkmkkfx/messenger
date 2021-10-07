export default async (): Promise<unknown> => ({
  links: [
    { title: 'Sign In Page', href: '/signin' },
    { title: 'Sign Up Page', href: '/signup' },
    { title: 'Chats Page(unfinished)', href: '/chats' },
    { title: 'Profile Page', href: '/profile' },
    { title: 'Edit Profile Page', href: '/edit-profile' },
    { title: 'Change Password Page', href: '/change-password' },
    { title: '404 Page', href: '/404' },
    { title: '5** error Page', href: '/error' },
  ],
});
