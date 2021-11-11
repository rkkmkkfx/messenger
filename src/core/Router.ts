import Component from './Component';

type Element = new (
  props: any,
  children?: VirtualDOMElement[] | undefined,
  root?: HTMLElement | undefined
) => Component<any>;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  #pathname: string;

  #block: Nullable<Component<any>>;

  #root?: HTMLElement;

  readonly #Page: Element;

  readonly #props: Record<string, any>;

  constructor(
    pathname: string,
    view: Element,
    props: Record<string, any>,
  ) {
    this.#pathname = pathname;
    this.#Page = view;
    this.#block = null;
    this.#props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render(this.#root!);
    }
  }

  leave() {
    this.#block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.#pathname);
  }

  render(root: HTMLElement) {
    this.#root = root;
    if (!this.#block) {
      this.#block = new this.#Page(this.#props, [], root);
    }
  }
}

export default class Router {
  static __instance: Router;

  routes?: Route[];

  history?: History;

  #currentRoute?: Route;

  #root?: HTMLElement;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname: string, block: Element, props: any): Router {
    const route = new Route(pathname, block, props);
    this.routes?.push(route);
    return this;
  }

  connect(root: HTMLElement): void {
    this.#root = root;
    window.onpopstate = ({ currentTarget }) => {
      this.#onRoute((currentTarget as Window)?.location.pathname);
    };

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route?.render(this.#root!);
  }

  go(pathname: string): void {
    this.history?.pushState({}, '', pathname);
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
}
