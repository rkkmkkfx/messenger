import type { Component } from './Component';

let rootInstance: Nullable<Creact.Instance> = null;

export function createClassInstance(element: JSX.Element, internalInstance?: Creact.Instance): Component {
  const { type: Instance, props } = element;
  const classInstance = new Instance(props);
  classInstance.__internalInstance = internalInstance;
  return classInstance;
}

function updateProps(
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
      dom[key as 'nodeValue' | 'className'] = String(value);
    }
  });
}

function createInstance(element: JSX.Element, _dom?: HTMLElement): any {
  const { type, props } = element;

  if (typeof type === 'string') {
    const dom = type === 'TEXT'
      ? document.createTextNode('')
      : document.createElement(type);

    updateProps(dom, {}, props);

    const childElements = props.children || [];
    const childInstances: Creact.Instance[] = childElements.map(createInstance);
    const childDoms = childInstances.map((childInstance) => childInstance.dom);
    childDoms.forEach((childDom) => dom.appendChild(childDom!));

    return { dom, element, childInstances };
  }
  // Instantiate component class
  const instance = {} as Creact.Instance;
  const classInstance = createClassInstance(element, instance);
  const childElement = classInstance.render();
  const selfInstance = createInstance(childElement);
  const { dom } = selfInstance ?? { dom: _dom };

  Object.assign(instance, {
    dom, element, selfInstance, classInstance,
  });

  return instance;
}

export function render(element: JSX.Element, container: PageElement): void {
  const prevInstance = rootInstance;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcileChildren(parentInstance: Creact.Instance, element: JSX.Element) {
  const { dom } = parentInstance;
  const { childInstances } = parentInstance;
  const nextChildElements = element.props.children || [];
  const newChildInstances: Nullable<Creact.Instance>[] = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newChildInstance = reconcile(dom, childInstance, childElement);

    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter((instance) => instance !== null);
}

export function reconcile(
  parentDom: PageElement | undefined,
  _instance: Nullable<Creact.Instance>,
  element: JSX.Element,
): Nullable<Creact.Instance> {
  const instance = _instance;
  // ADD
  if (!instance) {
    const newInstance = createInstance(element);
    parentDom?.appendChild(newInstance.dom);
    return newInstance;
  }

  // DELETE
  if (!element) {
    parentDom?.removeChild(instance.dom!);
    return null;
  }

  if (instance.element.type !== element.type) {
    const newInstance = createInstance(element);
    parentDom?.replaceChild(newInstance.dom, instance.dom!);
    return newInstance;
  } if (typeof element.type === 'string') {
    updateProps(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }

  instance.classInstance.props = element.props;
  const childElement = instance.classInstance.render();
  const oldChildInstance = instance.selfInstance;
  const childInstance = reconcile(parentDom, oldChildInstance, childElement);
  instance.dom = childInstance?.dom;
  instance.selfInstance = childInstance;
  instance.element = element;
  return instance;
}

export function updateInstance(selfInstance: Creact.Instance): void {
  const parentDom = selfInstance.dom?.parentNode as PageElement;
  const { element } = selfInstance;
  reconcile(parentDom, selfInstance, element);
}
