import Component from './Component';

const App = document.getElementById('app');

class StatusError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message ?? 'Unknown error');
    this.status = status;
  }
}

export default async function pageLoader(page: string): Promise<Component | undefined> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ToDo: разобраться с d.ts для glob
    const { [page]: component } = await import('../pages/*/index.ts');

    if (!component?.default) {
      throw new StatusError(404, 'Component not found');
    }

    const { default: Page, props } = component;
    if (Page.prototype instanceof Component && App) {
      return new Page(App, props);
    }
  } catch (err) {
    console.error(err);
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

  return undefined;
}
