export default async (): Promise<unknown> => {
  const params = (new URL(window.location.href)).searchParams;
  const status = params.get('status');
  const message = params.get('message') ?? 'Unknown error';
  const res = await fetch(`https://g.tenor.com/v1/random?q=${status}%${message}&key=9FE9RGPBR01S&limit=1`);
  const { results } = await res.json();
  const { url } = results[0].media[0].gif;

  return {
    url,
    status,
    message,
    buttons: [
      { label: 'Back to the App', href: '/' },
    ],
  };
};