export default async (): Promise<unknown> => {
  const res = await fetch('https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1');
  const { results } = await res.json();
  const { url } = results[0].media[0].gif;

  return {
    url,
    heading: 'Ooups! It\'s 404',
    buttons: [
      { label: 'Back to the App', href: '/' },
    ],
  };
};
