declare namespace Creact {
  type Instance = {
    dom?: PageElement;
    props: DefaultProps;
    element: JSX.Element;
    selfInstance: Nullable<Instance>;
    childInstances: Nullable<Instance>[];
    classInstance: Component;
  };

  type DefaultProps = Partial<Record<keyof Attr | string, Primitive | EventListenerOrEventListenerObject | unknown>
  & { children?: JSX.Element[] }>;

  interface Component<Props extends DefaultProps = DefaultProps, State extends DefaultObject = DefaultObject> {
    props: Props;
    render(): JSX.Element;
    componentDidMount?(): void;
    componentDidUpdate?(oldState: State, newState: State): void;
  }
}
