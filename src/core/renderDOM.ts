import { PageProps } from './Page';

export default function renderDOM<T extends PageProps>(
  root: HTMLElement,
  Component: any,
  props: T,
): void {
  return new Component(root, props);
}
