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

  protected range: Nullable<Range> = null;

  protected _element: Nullable<HTMLElement> = null;

  private nodes: HTMLElement[] | Text | undefined;

  private readonly meta: {
    tagOrParent: string | HTMLElement;
    props: any;
  };

  name = 'Page';

  private readonly eventBus: () => EventBus;

  protected props: any;

  /* ---- INIT ---- */
  /**
   * Component constructor
   *
   * @param {string | HTMLElement} tagOrParent
   * @param {*} props - Component props
   */
  constructor(tagOrParent: string | HTMLElement, props: any) {
    const eventBus = new EventBus();
    this.meta = {
      tagOrParent,
      props,
    };

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
      get(target: any, prop: string) {
        if (prop.indexOf('_') === 0) {
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
    if (typeof this.meta.tagOrParent === 'string') {
      this.element = document.createElement(this.meta.tagOrParent);
    } else {
      this.element = this.meta.tagOrParent;
    }
    this.range = document.createRange();

    this.range?.selectNodeContents(this.element!);
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
    console.log(this.nodes);
    if (Array.isArray(this.nodes)) {
      this.nodes.forEach((node) => {
        fragment.append(node);
      });
    } else {
      fragment.append(this.nodes!);
    }

    return fragment;
  }

  private _render(): void {
    this.nodes = templator.compile(this.render(), this.props);
    if (this.range) {
      reloadCss();
      this.range?.deleteContents();
      const fragment = this.getFragment();
      this.range?.insertNode(fragment);
    }
  }

  abstract render(): string;

  get element(): Nullable<HTMLElement> {
    return this._element;
  }

  set element(element: Nullable<HTMLElement>) {
    this._element = element;
  }
}
