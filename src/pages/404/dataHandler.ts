export default async (): Promise<{ url: string }> => {
  const res = await fetch('https://g.tenor.com/v1/random?q=404%20error&key=9FE9RGPBR01S&limit=1');
  const { results } = await res.json();
  const { url } = results[0].media[0].tinygif;

  console.log(url);
  return { url };
};
