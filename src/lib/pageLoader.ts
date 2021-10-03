import Templator from './Templator';

import pageData from './pageData';

export default async function pageLoader(page: string) {
  // @ts-ignore ToDo: разобраться с d.ts для glob
  let pages = await import('../pages/*/index.tmpl');

  const templator = new Templator(pages[page].default);

  document.body.innerHTML = templator.compile(pageData);
}
