const createTextElement = (nodeValue: string) => ({
  type: 'TEXT',
  props: { nodeValue },
});

export default function createElement(
  type: JSX.Tag,
  _props: Creact.DefaultProps,
  ...rest: (JSX.Element | string | undefined)[]
): JSX.Element {
  const props = { ..._props };
  const hasChildren = rest.length > 0;
  const rawChildren: (JSX.Element | string | undefined)[] = hasChildren
    ? ([] as (JSX.Element | string | undefined)[]).concat(...rest)
    : [];
  props.children = rawChildren
    .filter((child) => child && typeof child !== 'undefined')
    .map((child) => (typeof child === 'object' ? child : createTextElement(child!)));

  return { type, props };
}
