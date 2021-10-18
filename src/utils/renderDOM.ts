import Page, { PageProps } from './Page';

export default function render<TProps extends PageProps>(query: string, block: Page<TProps>): Element | null {
  const root = document.querySelector(query);

  const content = block.getContent();
  if (content) {
    root?.appendChild(content);
  }
  return root;
}
