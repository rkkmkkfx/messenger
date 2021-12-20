import { StoreState } from './state';

export type Action = {
  type: string;
  payload?: any;
};

export type Reducer<K extends keyof StoreState> = (state: StoreState[K], action: Action) => StoreState[K];

export default class Store {
  #listeners: ((...args: any[]) => void)[];

  readonly #reducers: Record<string, Reducer<any>>;

  #state: StoreState;

  constructor(initialState: StoreState, reducers: Record<string, Reducer<any>>) {
    this.#listeners = [];
    this.#reducers = reducers;
    this.#state = this.#reduce(initialState, {});
  }

  get state(): StoreState {
    return this.#state;
  }

  subscribe(fn: (state: StoreState) => void): () => void {
    this.#listeners = [...this.#listeners, fn];
    fn(this.state);
    return () => {
      this.#listeners = this.#listeners.filter((sub) => sub !== fn);
    };
  }

  dispatch(action: Action): void {
    this.#state = this.#reduce(this.#state, action);
    this.#listeners.forEach((fn) => fn(this.state));
  }

  #reduce(state: StoreState, action: Action | EmptyObject): StoreState {
    const newState = {} as StoreState;
    Object.keys(this.#reducers).forEach((prop) => {
      (newState as DefaultObject)[prop] = this.#reducers[prop](
        (state as DefaultObject)[prop] as StoreState,
        action as Action,
      );
    });

    return newState;
  }
}
