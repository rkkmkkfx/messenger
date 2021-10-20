import EventBus from './EventBus';

type ComponentsProps =
  | ButtonProps;

export interface PageProps extends Record<string, unknown> {
  [key: string]: Primitive | ComponentsProps | ComponentsProps[] | PageProps;
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

export default abstract class Page<TProps extends PageProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  private range: Nullable<Range> = null;

  protected fragment = '';

  private readonly meta: {
    container: Node,
    props: TProps
  };

  eventBus: () => EventBus;

  protected props: TProps;

  constructor(element: HTMLElement | string, props: TProps) {
    const eventBus = new EventBus();

    const container = Page.getContainer(element);
    this.meta = {
      container,
      props,
    };

    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Page.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Page.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Page.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this.range = Page._createDocumentRange();
    this.setRangeNode();
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Page.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Page.EVENTS.FLOW_RENDER);
  }

  abstract componentDidMount(): void;

  _componentDidUpdate<T>(oldProps: T, newProps: T): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this.eventBus().emit(Page.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  componentDidUpdate<T>(oldProps: T, newProps: T): boolean {
    return true;
  }

  setProps = (nextProps: Partial<TProps>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _render(): void {
    const block = this.render();
    if (this.range && block) {
      reloadCss();
      this.fragment = block;
      this.range?.deleteContents();
      const node = this.getContent() as Node;
      this.range?.insertNode(node);
    }
  }

  abstract render(): string;

  setRangeNode(): void {
    this.range?.selectNodeContents(this.meta.container);
  }

  static getContainer(element: HTMLElement | string): Node {
    if (typeof element === 'string') {
      return document.querySelector(element)!;
    }
    return element;
  }

  getContent(): DocumentFragment | undefined {
    return this.range?.createContextualFragment(this.fragment);
  }

  private makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get(target: TProps, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TProps, prop: string, value: unknown) => {
        const updated = target;
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }
        if (hasKey(updated, prop)) (updated as Record<string, unknown>)[prop] = value;
        this.eventBus().emit(Page.EVENTS.FLOW_CDU, target, updated);
        return true;
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteProperty(target: TProps, prop: string) {
        throw new Error('нет доступа');
      },
    }) as unknown as TProps;
  }

  private static _createDocumentRange(): Range {
    return document.createRange();
  }
}
