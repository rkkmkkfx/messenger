import NotFoundPage from './NotFound';

const component = new NotFoundPage({
  url: '',
  heading: 'Ooups! It\'s 404',
  buttons: [
    { label: 'Back to the App', href: '/' },
  ],
});

console.log(component);

export default component;
