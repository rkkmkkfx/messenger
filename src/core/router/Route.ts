import Creact from '../Creact';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export default class Route {
  #pathname: string;

  #root!: HTMLElement;

  readonly #element: JSX.Element;

  constructor(
    pathname: string,
    element: JSX.Element,
  ) {
    this.#pathname = pathname;
    this.#element = element;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render(this.#root!);
    }
  }

  leave(): void {
    if (this.#root) {
      this.#root.innerHTML = '';
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this.#pathname);
  }

  render(root: HTMLElement): void {
    this.#root = root;
    Creact.render(this.#element, this.#root);
  }
}
