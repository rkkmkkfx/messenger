export function updateDomProps(
  _dom: PageElement,
  prevProps: Creact.DefaultProps,
  nextProps: Creact.DefaultProps,
): void {
  const dom = _dom;
  const isEvent = ([key]: [string, unknown]) => key.startsWith('on');
  const isAttribute = ([key, value]: [string, unknown]) => !isEvent([key, value]) && key !== 'children';

  // Remove event listeners
  Object.entries(prevProps).filter(isEvent).forEach(([key, value]) => {
    if (value instanceof Function) {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, value);
    }
  });

  // Add event listeners
  Object.entries(nextProps).filter(isEvent).forEach(([key, value]) => {
    if (value instanceof Function) {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, value);
    }
  });

  // Remove attributes
  Object.entries(prevProps).filter(isAttribute).forEach(([key]) => {
    if (dom.nodeType === 1 && key !== 'className') {
      dom.removeAttribute(key);
    } else {
      dom[key as 'nodeValue' | 'className'] = '';
    }
  });

  // Set attributes
  Object.entries(nextProps).filter(isAttribute).forEach(([key, value]) => {
    if (dom.nodeType === 1 && key !== 'className') {
      dom.setAttribute(key, String(value));
    } else {
      dom[key as 'nodeValue' | 'className'] = String(value ?? '');
    }
  });
}

export function createDomElement(fiber: Creact.Fiber): HTMLElement | Text {
  const isTextElement = fiber.type === 'TEXT';
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(typeof fiber.type === 'string' ? fiber.type : 'div');
  updateDomProps(dom, {}, fiber.props);
  return dom;
}
