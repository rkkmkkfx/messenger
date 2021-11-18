import EventBus from './EventBus';

import { objectsAreEqual } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Component<Props extends Record<string, unknown>, State extends Record<string, unknown>> {
  componentDidMount?(): void;
  componentDidUpdate?(oldState: State, newState: State): void;
}

type DefaultState = Record<string, unknown>;

const setProps = (
  node: Node,
  props: Record<string, unknown>,
  prevProps?: Record<string, unknown>,
) => Object.entries(props).forEach(([key, value]) => {
  const element = node as HTMLElement;
  if (typeof value === 'string') {
    if (key === 'className') {
      element.className = value;
    } else if (!key.startsWith('_') && key in element) {
      element.setAttribute(key, value);
    }
  }
  if (typeof value === 'function') {
    const eventMatch = key.match(/on([A-Z][a-z]*)/);
    if (eventMatch) {
      const eventType = eventMatch[1].toLowerCase();
      const eventHandler = value as EventListenerOrEventListenerObject;
      if (prevProps) {
        console.log(prevProps[key]);
        element.removeEventListener(eventType, prevProps[key] as EventListenerOrEventListenerObject);
      }
      element.addEventListener(eventType, eventHandler);
    }
  }
});

export function renderDOM(
  vdom: JSX.Element | JSX.Element[],
): HTMLElement | Text | HTMLElement[] {
  if (!vdom) {
    return document.createTextNode('');
  }

  if (Array.isArray(vdom)) {
    return vdom.map((node) => renderDOM(node) as HTMLElement);
  }

  const { tag, props } = vdom;

  if (typeof tag === 'function') {
    if ((tag as () => JSX.Element).prototype?.constructor.name === 'Fragment') {
      return renderDOM(props.children);
    }
    const Element = tag as new (
      _props: typeof props,
    ) => Component<typeof props>;
    return new Element(props).dom!;
  }

  if (tag === 'TEXT') {
    return document.createTextNode(props.nodeValue);
  }

  const element = document.createElement(tag);

  if (props) {
    setProps(element, props);
  }

  if (props.children) {
    if (Array.isArray(props.children)) {
      [...props.children].forEach((child: VirtualDOMElement) => {
        if (Array.isArray(child)) {
          element.append(...renderDOM(child) as (Node | Text)[]);
          return;
        }
        const dom = renderDOM(child);
        if (Array.isArray(dom)) {
          element.append(...dom);
        } else {
          element.appendChild(dom);
        }
      });
    } else {
      const dom = renderDOM(props.children);
      element.append(dom as Element);
    }
  }

  return element;
}

function renderComponent(virtualNode: VirtualDOMElement) {
  if (typeof virtualNode === 'undefined') {
    return virtualNode;
  }
  if (typeof virtualNode.tag === 'function') {
    if ((virtualNode.tag as () => JSX.Element).prototype?.constructor.name === 'Fragment') {
      return virtualNode.props.children;
    }
    const Element = virtualNode.tag as new (_props: typeof virtualNode.props) => (
      Component<typeof virtualNode.props>);
    return new Element(virtualNode.props).render();
  }
  return virtualNode;
}

function patchNode(
  _node: Node | Text,
  virtualComponent: VirtualDOMElement,
  nextVirtualComponent: VirtualDOMElement,
) {
  let node = _node;
  const virtualNode = renderComponent(virtualComponent);
  const nextVirtualNode = renderComponent(nextVirtualComponent);
  if (Array.isArray(virtualNode) && Array.isArray(nextVirtualNode)) {
    node = _node.parentNode!;
    node.childNodes.forEach((child, i) => {
      patchNode(child, virtualNode[i], nextVirtualNode[i]);
    });
  } else if (!Array.isArray(virtualNode) && !Array.isArray(nextVirtualNode)) {
    if (typeof virtualNode !== 'undefined' && typeof nextVirtualNode !== 'undefined') {
      if (virtualNode.tag !== nextVirtualNode.tag) {
        if ('replaceWith' in node) {
          const domNode = renderDOM(nextVirtualNode);
          console.log('replace node');
          if (!Array.isArray(domNode)) {
            node.replaceWith(domNode);
          } else {
            node.replaceWith(...domNode);
          }
        }
      }
      if (virtualNode.props && nextVirtualNode.props
        && !objectsAreEqual(virtualNode.props, nextVirtualNode.props)) {
        console.log('!');
        setProps(node, nextVirtualNode.props, virtualNode.props);
      }
      if (virtualNode.props.children && nextVirtualNode.props.children
        && !objectsAreEqual(virtualNode.props.children, nextVirtualNode.props.children)) {
        node.childNodes.forEach((child, i) => {
          patchNode(child, virtualNode.props.children[i], nextVirtualNode.props.children[i]);
        });
      }
    } else if (typeof virtualNode !== 'undefined') {
      if ('replaceWith' in node) {
        console.log('remove node');
        node.replaceWith('');
      }
    } else if (typeof nextVirtualNode !== 'undefined') {
      console.log(node, virtualNode, nextVirtualNode);
    }
  }
}

export function patch(
  dom: HTMLElement | Text | HTMLElement[],
  vdom: VirtualDOMElement | VirtualDOMElement[],
  nextVDOM: VirtualDOMElement | VirtualDOMElement[],
): HTMLElement | Text | HTMLElement[] {
  if (Array.isArray(dom) && Array.isArray(vdom) && Array.isArray(nextVDOM)) {
    (dom as (Element | Text)[]).forEach((el, i) => patchNode(el, vdom[i], nextVDOM[i]));
  } else if (!Array.isArray(dom) && !Array.isArray(vdom) && !Array.isArray(nextVDOM)) {
    patchNode(dom, vdom, nextVDOM);
  }

  return dom;
}

abstract class Component<Props extends Record<string, unknown>, State extends Record<string, unknown> = DefaultState> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  name = 'Component';

  #dom?: HTMLElement | Text | HTMLElement[];

  #vdom?: VirtualDOMElement;

  children?: JSX.Element[];

  readonly #eventBus: EventBus<State>;

  protected props: Omit<PropsWithChildren<Props>, 'children'>;

  #state: State = {} as State;

  /* ---- INIT ---- */
  /**
   * Component constructor
   *
   * @param {*} props - Component props
   * @param children
   * @param parentUpdate
   */
  protected constructor({ children, ...props }: PropsWithChildren<Props>) {
    this.children = children;
    this.props = props ?? {};
    this.#eventBus = new EventBus();
    this.#state = this.#proxifyState({} as State);

    this.#registerEvents(this.#eventBus);
    this.#eventBus.emit(Component.EVENTS.INIT);
  }

  /**
   * Adds events to the EventBus
   *
   * @param {EventBus} eventBus - EventBus Instance
   * @private
   */
  #registerEvents(eventBus: EventBus<State>): void {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  /**
   *
   * @param state
   * @private
   */
  #proxifyState(state: State): typeof state {
    return new Proxy(state, {
      get: (target: State, prop: string) => {
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: State, prop: string, value: Primitive) => {
        const oldState = { ...target };
        const updated = target;
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }
        (updated as Record<string, unknown>)[prop] = value;
        this.#eventBus.emit(Component.EVENTS.FLOW_CDU, oldState, updated);
        return true;
      },

      deleteProperty: () => { throw new Error('нет доступа'); },
    });
  }

  /**
   * Creates component resources and starts the Lifecycle
   */
  init(): void {
    this.#eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  /* ---- LIFECYCLE ---- */

  /**
   *
   */
  #componentDidMount(): void {
    if (this.componentDidMount) this.componentDidMount();
    this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldUpdate(prevState: State, nextState: State): boolean {
    return !objectsAreEqual(prevState, nextState);
  }

  /**
   *
   * @param prevState
   * @param nextState
   * @private
   */
  #componentDidUpdate(prevState: State, nextState: State): void {
    const shouldUpdate = this.shouldUpdate(prevState, nextState);
    if (shouldUpdate) {
      if (this.componentDidUpdate) this.componentDidUpdate(prevState, nextState);
      this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  /**
   *
   * @param nextState
   */
  setState = (nextState: Partial<State>): void => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  #render(): void {
    if (!this.#dom) {
      this.#vdom = this.render();
      this.#dom = renderDOM(this.#vdom);
      return;
    }
    this.#dom = patch(this.#dom, this.#vdom!, this.render());
    this.#vdom = this.render();
  }

  abstract render(): JSX.Element;

  get dom(): HTMLElement | Text | HTMLElement[] | undefined {
    return this.#dom;
  }

  set dom(element: HTMLElement | Text | HTMLElement[] | undefined) {
    this.#dom = element;
  }

  get state(): State {
    return this.#state;
  }

  set state(state: State) {
    Object.entries(state).forEach(([key, value]) => {
      (this.#state as Record<string, unknown>)[key] = value;
    });
  }
}

function createTextElement(text: string) {
  return {
    tag: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export function createElement(
  tag: JSX.Tag,
  props: Record<string, unknown>,
  ...children: JSX.Element[]
): JSX.Element | JSX.Element[] {
  return {
    tag,
    props: {
      ...props,
      children: children.flat(Infinity).map((child) => (typeof child === 'object'
        ? child
        : createTextElement(child))),
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Fragment(_a: never, ...children: JSX.Element[]): JSX.Element[] {
  return children;
}

class Wrapper extends Component<any> {
  render() {
    console.log('Wrapper');
    return createElement('div', { id: 'app' }, ...this.children!);
  }
}

const mount = (virtualDom: JSX.Element | JSX.Element[], root: HTMLElement): HTMLElement | Text | HTMLElement[] => {
  const app = new Wrapper({ children: Array.isArray(virtualDom) ? virtualDom : [virtualDom] }).render();
  const dom = renderDOM(app);
  if (Array.isArray(dom)) {
    root.replaceWith(...dom);
  } else {
    root.replaceChildren(dom);
  }

  return dom;
};

export default {
  createElement,
  Fragment,
  Component,
  mount,
};
