import Templator from './Templator';

const App = document.getElementById('app');

class StatusError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message ?? 'Unknown error');
    this.status = status;
  }
}

export default async function pageLoader(page: string): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ToDo: разобраться с d.ts для glob
    const { [page]: template } = await import('../pages/*/index.ts');

    console.log(page, template);

    if (!template?.default) {
      throw new StatusError(404, 'Page not found');
    }

    const templator = new Templator(template.default);

    const templateData = template.getTemplatesData ? await template.getTemplatesData() : {};

    App?.insertAdjacentHTML('afterbegin', templator.compile(templateData));
  } catch (err) {
    if (err && err instanceof StatusError) {
      if (err.status === 404) {
        window.location.replace('/404');
      } else {
        window.location.replace(`/error?status=${err.status}&message=${err.message}`);
      }
    } else if (err instanceof Error) {
      window.location.replace(`/error?status=500&message=${err.message}`);
    }
  }
}