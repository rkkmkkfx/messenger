import EventBus from '../EventBus';
import { isEqual } from '../utils';
import { scheduleUpdate } from './reconciler';

export function Fragment(_a: never, ...children: JSX.Element[]): JSX.Element[] {
  return children;
}

export abstract class Component<
  Props extends Creact.DefaultProps = Creact.DefaultProps,
  State extends DefaultObject = DefaultObject,
> implements Creact.Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_RERENDER: 'flow:rerender',
  };

  name = 'Component';

  children?: JSX.Element | JSX.Element[] | undefined;

  readonly #eventBus: EventBus<State>;

  props: Omit<Props, 'children'>;

  readonly #state: State = {} as State;

  __fiber?: Creact.Fiber;

  _rootContainerFiber?: Creact.Fiber;

  /**
   * Component constructor
   *
   * @param {*} props - Component props
   * @param children
   * @param parentUpdate
   */
  constructor({ children, ...props }: Props) {
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
    eventBus.on(Component.EVENTS.INIT, this.#init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this.#componentDidMount);
    eventBus.on(Component.EVENTS.FLOW_CDU, this.#componentDidUpdate);
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
  #init(): void {
    this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  /* ---- LIFECYCLE ---- */

  /**
   *
   */
  #componentDidMount = async (): Promise<void> => {
    if (this.componentDidMount) await this.componentDidMount();
  };

  componentDidMount?(): void;

  // eslint-disable-next-line class-methods-use-this
  #shouldUpdate = (prevState: State, nextState: State): boolean => (
    !isEqual(prevState, nextState));

  /**
   *
   * @param prevState
   * @param nextState
   * @private
   */
  #componentDidUpdate = async (prevState: State, nextState: State): Promise<void> => {
    const shouldUpdate = this.#shouldUpdate(prevState, nextState);

    if (shouldUpdate) {
      if (this.componentDidUpdate) await this.componentDidUpdate(prevState, nextState);
      this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  };

  componentDidUpdate?(oldState: State, newState: State): void;

  /**
   *
   * @param nextState
   */
  setState = (nextState: Partial<State>): void => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
    this.#eventBus.emit(Component.EVENTS.FLOW_RENDER);
  };

  #render = (): void => {
    scheduleUpdate(this);
    this.#eventBus.emit(Component.EVENTS.FLOW_CDM);
  };

  abstract render(): JSX.Element;

  get state(): State {
    return this.#state;
  }

  set state(state: State) {
    Object.entries(state).forEach(([key, value]) => {
      (this.#state as Record<string, unknown>)[key] = value;
    });
  }
}
