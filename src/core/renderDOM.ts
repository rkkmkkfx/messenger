import Page, { PageProps } from './Page';

export default function renderDOM<T extends PageProps>(
  root: HTMLElement | string,
  Component: { new(root: HTMLElement | string, props: T): Page<T> },
  props: T,
): Page<T> {
  return new Component(root, props);
}
