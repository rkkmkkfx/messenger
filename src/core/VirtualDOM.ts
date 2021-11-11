import type Component from './Component';

export default function parseJSX(
  tag: JSX.Tag,
  props: Record<string, any>,
  ...children: JSX.Element[]
): JSX.Element | JSX.Element[] {
  if (tag === 'fragment') {
    return children;
  }
  return {
    tag,
    props,
    children,
  };
}

export function renderDOM(vdom: JSX.Element | string): (Node | Text) | (Node | Text)[] {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }

  if (Array.isArray(vdom)) {
    return vdom.map((node) => renderDOM(node) as Node | Text);
  }

  const { tag, props, children } = vdom;

  if (typeof tag === 'function') {
    const Element = tag as new (_props: typeof props, children: JSX.Element[]) => Component<typeof props>;
    return renderDOM(new Element(props, children).element!);
  }

  const element = document.createElement(tag);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (!key.startsWith('_') && key in element) {
        element.setAttribute(key, value);
      }

      const eventMatch = key.match(/on([A-Z][a-z]*)/);
      if (eventMatch) {
        const eventType = eventMatch[1].toLowerCase();
        element.removeEventListener(eventType, value);
        element.addEventListener(eventType, value);
      }
    });
  }

  if (children) {
    children.forEach((child: VirtualDOMElement) => {
      if (Array.isArray(child)) {
        element.append(...renderDOM(child) as (Node | Text)[]);
        return;
      }
      element.appendChild(renderDOM(child) as Node | Text);
    });
  }

  return element;
}

export const mount = (vdom: VirtualDOMElement, root: HTMLElement) => {
  const dom = renderDOM(vdom);
  if (Array.isArray(dom)) {
    root.replaceChildren(...dom);
  } else {
    root.replaceChildren(dom);
  }
  return dom;
};
