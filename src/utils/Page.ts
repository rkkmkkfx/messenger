import EventBus from './EventBus';

type ComponentsProps =
  | ButtonProps;

export interface PageProps extends Record<string, unknown> {
  [key: string]: Primitive | ComponentsProps | ComponentsProps[] | PageProps;
}

const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

export default abstract class Page<TProps extends PageProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _range: Nullable<Range> = null;

  protected _fragment = '';

  private readonly _meta: {
    props: TProps
  };

  eventBus: () => EventBus;

  protected props: TProps;

  constructor(props: TProps) {
    const eventBus = new EventBus();
    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Page.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Page.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Page.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Page.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._range = Page._createDocumentRange();
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
    if (this._range && block) {
      this._fragment = block;
    }
  }

  abstract render(): string;

  getContent(): DocumentFragment | undefined {
    return this._range?.createContextualFragment(this._fragment);
  }

  private _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get(target: TProps, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TProps, prop: string, value: unknown) => {
        console.log(prop);
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
