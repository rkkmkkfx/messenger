declare namespace Creact {
  enum Effect {
    Placement,
    Deletion,
    Update,
  }

  type Fiber = {
    tag: 'root' | 'host' | 'class',
    type?: (new(props: DefaultProps) => Component) | 'TEXT',
    parent?: Fiber,
    child?: Fiber,
    sibling?: Fiber,
    alternate?: Fiber,
    stateNode?: typeof Fiber,
    props: DefaultProps,
    effectTag?: Effect,
    effects?: Fiber[]
    _rootContainerFiber?: Fiber;
  };

  type QueueItem = {
    from: string;
    instance?: Creact.Component;
    dom?: HTMLElement | Creact.Fiber;
    newProps?: { children: JSX.Element; };
  }[];

  type DefaultProps = Partial<Record<keyof Attr | string, Primitive | EventListenerOrEventListenerObject | unknown>
  & { children?: JSX.Element | JSX.Element[] }>;

  interface Component<Props extends DefaultProps = DefaultProps, State extends DefaultObject = DefaultObject> {
    props: Props;
    render(): JSX.Element;
    setState(nextState: Partial<State>): void;
    componentDidMount?(): void;
    componentDidUpdate?(oldState: State, newState: State): void;
    storeUpdated?: boolean;
    __fiber?: Creact.Fiber;
    _rootContainerFiber?: Creact.Fiber;
  }
}
