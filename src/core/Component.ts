import EventBus from './EventBus';
import templator from './Templator';

import type { ButtonProps } from '../components/Button';
import type { InputProps } from '../components/Input';

export type ElementProps =
  | ButtonProps
  | InputProps;

interface Component {
  componentDidMount?(): void;
  componentDidUpdate?(oldProps: ComponentProps, newProps: ComponentProps): void;
}

const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  #element?: HTMLElement;

  #children: Node[] | undefined;

  #meta: {
    tagOrParent: string | HTMLElement;
    props: ComponentProps | ElementProps;
  };

  name = 'Component';

  readonly #eventBus: () => EventBus;

  protected props: ComponentProps | ElementProps;

  /* ---- INIT ---- */
  /**
   * Component constructor
   *
   * @param {string | HTMLElement} tagOrParent
   * @param {*} props - Component props
   */
  constructor(tagOrParent: string | HTMLElement, props: ComponentProps | ElementProps) {
    const eventBus = new EventBus();
    this.#meta = {
      tagOrParent,
      props,
    };

    this.props = this.#proxifyProps(props);

    this.#eventBus = () => eventBus;

    this.#registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  /**
   * Adds events to the EventBus
   *
   * @param {EventBus} eventBus - EventBus Instance
   * @private
   */
  #registerEvents(eventBus: EventBus): void {
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
  #proxifyProps(props: ComponentProps | ElementProps): typeof props {
    return new Proxy(props, {
      get(target: ComponentProps, prop: string) {
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: ComponentProps, prop: string, value: Primitive) => {
        const updated = target;
        if (prop.startsWith('#')) {
          throw new Error('Нет прав');
        }
        if (hasKey(updated, prop)) updated[prop] = value;
        this.#eventBus().emit(Component.EVENTS.FLOW_CDU, target, updated);
        return true;
      },

      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  #setRootAttributes(): void {
    Object.entries(this.props).forEach(([key, value]) => {
      if (this.element && key in this.element) {
        if (key === 'className') {
          this.element[key] = String(value);
        } else {
          this.element?.setAttribute(key, `${value}`);
        }
      }
    });
  }

  /**
   * Creates a wrapper element and the DOM Range on it
   * @private
   */
  #createResources(): void {
    if (typeof this.#meta.tagOrParent === 'string') {
      this.element = document.createElement(this.#meta.tagOrParent);
      this.#setRootAttributes();
    } else {
      this.element = this.#meta.tagOrParent;
    }

    if (this.props.events) {
      Object.entries<EventListenerOrEventListenerObject>(this.props.events)
        .forEach(([eventType, handler]) => (
          this.element?.addEventListener(eventType, handler)
        ));
    }

    if ((this.props as ButtonProps).to) {
      this.element?.addEventListener('click', () => { window.location.href = (this.props as ButtonProps).to!; });
    }
  }

  /**
   * Creates component resources and starts the Lifecycle
   */
  init(): void {
    this.#createResources();
    this.#eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  /* ---- LIFECYCLE ---- */

  /**
   *
   */
  #componentDidMount(): void {
    if (this.componentDidMount) this.componentDidMount();
    this.#eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldUpdate(oldProps: ComponentProps, newProps: ComponentProps): boolean {
    return Object.is(oldProps, newProps);
  }

  /**
   *
   * @param oldProps
   * @param newProps
   * @private
   */
  #componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps): void {
    const shouldUpdate = this.shouldUpdate(oldProps, newProps);
    if (shouldUpdate) {
      if (this.componentDidUpdate) this.componentDidUpdate(oldProps, newProps);
      this.#eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  /**
   *
   * @param nextProps
   */
  setProps = (nextProps: ComponentProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  #render(): void {
    this.#children = templator.compile(this.render(), this.props);
    if (this.#children.length && 'children' in this.element!) {
      this.element?.replaceChildren(...this.#children);
    }
  }

  abstract render(): string;

  get element(): HTMLElement | undefined {
    return this.#element;
  }

  set element(element: HTMLElement | undefined) {
    this.#element = element;
  }
}

export default Component;
