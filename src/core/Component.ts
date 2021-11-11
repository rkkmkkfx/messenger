import EventBus from './EventBus';

import { objectsAreEqual } from './utils';
import { mount } from './VirtualDOM';

interface Component<Props extends Record<string, any>> {
  componentDidMount?(): void;
  componentDidUpdate?(oldProps: Props, newProps: Props): void;
}

const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

abstract class Component<Props extends Record<string, any>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  #element?: JSX.Element;

  children?: JSX.Element[];

  name = 'Component';

  readonly #root?: HTMLElement;

  readonly #eventBus: EventBus<Props>;

  protected props: Props;

  /* ---- INIT ---- */
  /**
   * Component constructor
   *
   * @param {*} props - Component props
   * @param children
   * @param root
   */
  constructor(props: Props, children?: JSX.Element[], root?: HTMLElement) {
    this.#root = root;
    this.children = children;
    this.props = this.#proxifyProps(props ?? {});
    this.#eventBus = new EventBus();

    this.#registerEvents(this.#eventBus);
    this.#eventBus.emit(Component.EVENTS.INIT);
  }

  /**
   * Adds events to the EventBus
   *
   * @param {EventBus} eventBus - EventBus Instance
   * @private
   */
  #registerEvents(eventBus: EventBus<Props>): void {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this.#render.bind(this));
  }

  /**
   *
   * @param props
   * @private
   */
  #proxifyProps(props: Props): typeof props {
    return new Proxy(props, {
      get: (target: Props, prop: string) => {
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Props, prop: string, value: Primitive) => {
        const oldProps = { ...target };
        const updated = target;
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }
        if (hasKey(updated, prop)) (updated as Record<string, any>)[prop] = value;
        this.#eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, updated);
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
  shouldUpdate(oldProps: Props, newProps: Props): boolean {
    return !objectsAreEqual(oldProps, newProps);
  }

  /**
   *
   * @param oldProps
   * @param newProps
   * @private
   */
  #componentDidUpdate(oldProps: Props, newProps: Props): void {
    const shouldUpdate = this.shouldUpdate(oldProps, newProps);
    if (shouldUpdate) {
      if (this.componentDidUpdate) this.componentDidUpdate(oldProps, newProps);
      this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  /**
   *
   * @param nextProps
   */
  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  #render(): void {
    this.#element = this.render();
    // if (this.props.events) {
    //   Object.entries<EventListenerOrEventListenerObject>(this.props.events)
    //     .forEach(([eventType, handler]) => (
    //       this.element?.addEventListener(eventType, handler)
    //     ));
    // }
    if (this.#root) {
      mount(this.#element, this.#root);
    }
  }

  abstract render(): JSX.Element;

  get element(): JSX.Element | undefined {
    return this.#element;
  }

  set element(element: JSX.Element | undefined) {
    this.#element = element;
  }
}

export default Component;
