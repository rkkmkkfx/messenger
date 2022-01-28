import Route from './Route';

export default class Router {
  static __instance: Router;

  routes?: Route[];

  history?: History;

  #currentRoute?: Route;

  #root?: HTMLElement;

  #pathname = '/';

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname: string, element: JSX.Element): Router {
    const route = new Route(pathname, element);
    this.routes?.push(route);
    return this;
  }

  connect(root: HTMLElement): Router {
    this.#root = root;
    window.onpopstate = ({ currentTarget }) => {
      this.#onRoute((currentTarget as Window)?.location.pathname);
    };

    this.#onRoute(window.location.pathname);
    return this;
  }

  #onRoute(pathname: string): void {
    this.pathname = pathname;
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/404', { status: 404, message: 'Page not found' });
    }

    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route?.render(this.#root!);
  }

  go(pathname: string, data: Record<string, string | number> = {}): void {
    this.history?.pushState(data, '', pathname);
    this.#onRoute(pathname);
  }

  back(): void {
    this.history?.back();
  }

  forward(): void {
    this.history?.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes?.find((route) => route.match(pathname));
  }

  get pathname(): string {
    return this.#pathname;
  }

  set pathname(value: string) {
    this.#pathname = value;
  }

  get state(): Record<string, string | number> {
    return this.history?.state;
  }
}
