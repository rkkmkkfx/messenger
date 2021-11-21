import Creact from '../Creact';

export type Page = new (
  props: { children?: JSX.Element[] },
) => Creact.Component<EmptyObject, Record<string, unknown>>;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export default class Route {
  #pathname: string;

  #root?: HTMLElement;

  readonly #element: JSX.Element;

  constructor(
    pathname: string,
    element: JSX.Element,
  ) {
    this.#pathname = pathname;
    this.#element = element;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render(this.#root!);
    }
  }

  leave() {}

  match(pathname: string) {
    return isEqual(pathname, this.#pathname);
  }

  render(root: HTMLElement) {
    this.#root = root;
    Creact.render(this.#element, this.#root);
  }
}
