import EventBus from './EventBus';
import templator from './Templator';

type ComponentProps =
  | ButtonProps
  | InputProps;

export interface PageProps extends Record<string, unknown> {
  [key: string]: Primitive
  | (typeof Page.prototype)
  | (typeof Page.prototype)[]
  | PageProps
  | ComponentProps
  | ComponentProps[]
  | string[]
  | HTMLElement;
}

const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

function reloadCss() {
  let h;
  let f;
  const a = document.getElementsByTagName('link');
  for (h = 0; h < a.length; h++) {
    f = a[h];
    if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
      const g = f.href.replace(/(&|\?)h=\d+/, '');
      f.href = g + (g.match(/\?/) ? '&' : '?');
      f.href += `h=${new Date().valueOf()}`;
    }
  }
}

export default abstract class Page {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  _element: Nullable<Node> = null;

  dom?: Node;

  readonly range?: Range;

  readonly meta: {
    root?: Node;
    props: any;
  };

  name = 'Page';

  private readonly eventBus: () => EventBus;

  private props: any;

  /* ---- INIT ---- */
  /**
   * Component constructor
   *
   * @param {string | HTMLElement} tagOrParent
   * @param {*} props - Component props
   */
  constructor(props: any, root?: Node) {
    const eventBus = new EventBus();
    this.meta = {
      root,
      props,
    };

    this.range = this.range ?? new Range();

    this.props = this.proxifyProps(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Page.EVENTS.INIT);
  }

  /**
   * Adds events to the EventBus
   *
   * @param {EventBus} eventBus - EventBus Instance
   * @private
   */
  private registerEvents(eventBus: EventBus) {
    eventBus.on(Page.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Page.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   *
   * @param props
   * @private
   */
  private proxifyProps(props: any) {
    return new Proxy(props, {
      get(target: any, prop: string | typeof Symbol.toPrimitive) {
        console.log(prop);
        if (typeof prop === 'string' && prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: any, prop: string, value: any) => {
        const updated = target;
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }
        if (hasKey(updated, prop)) (updated as Record<string, any>)[prop] = value;
        this.eventBus().emit(Page.EVENTS.FLOW_CDU, target, updated);
        return true;
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteProperty(target: any, prop: string) {
        throw new Error('нет доступа');
      },
    });
  }

  /**
   * Creates a wrapper element and the DOM Range on it
   * @private
   */
  private createResources() {
    if (!this.meta.root) {
      this.element = document.createElement('div');
    } else {
      this.element = this.meta.root;
    }

    if (this.range.startContainer instanceof Document) {
      this.range?.selectNodeContents(this.element!);
    }
  }

  /**
   * Creates component resources and starts the Lifecycle
   */
  init(): void {
    this.createResources();
    this.eventBus().emit(Page.EVENTS.FLOW_CDM);
  }

  /* ---- LIFECYCLE ---- */

  /**
   *
   */
  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Page.EVENTS.FLOW_RENDER);
  }

  /**
   *
   */
  abstract componentDidMount(): void;

  /**
   *
   * @param oldProps
   * @param newProps
   * @private
   */
  private _componentDidUpdate<T>(oldProps: T, newProps: T): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this.eventBus().emit(Page.EVENTS.FLOW_RENDER);
    }
  }

  /**
   *
   * @param oldProps
   * @param newProps
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  componentDidUpdate<T>(oldProps: T, newProps: T): boolean {
    return true;
  }

  /**
   *
   * @param nextProps
   */
  setProps = (nextProps: any): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getFragment(): DocumentFragment {
    const fragment = new DocumentFragment();
    fragment.append(this.dom!);

    return fragment;
  }

  private _render(): void {
    this.dom = templator.compile(this.render(), this.props);
    if (this.props.events) {
      Object.entries(this.props.events).forEach(([eventType, handler]) => (
        this.dom?.addEventListener(eventType, handler)
      ));
    }
    if (this.range) {
      reloadCss();
      this.range?.deleteContents();
      this.range?.insertNode(this.dom);
    }
  }

  abstract render(): string;

  get element(): Nullable<Node> {
    return this._element;
  }

  set element(element: Nullable<Node>) {
    this._element = element;
  }
}
