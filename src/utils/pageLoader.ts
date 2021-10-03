import Templator from './Templator';

const App = document.getElementById('app');

export default async function pageLoader(page: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ToDo: разобраться с d.ts для glob
  const { [page]: template, 404: page404 } = await import('../pages/*/index.ts');

  const templator = new Templator(template ? template.default : page404.default);

  const data = template ? await template.dataHandler() : await page404.dataHandler();

  App?.insertAdjacentHTML('afterbegin', templator.compile(data));
}
