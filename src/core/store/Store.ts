import { StoreState } from './state';

export type Action = {
  type: string;
  payload?: any;
};

export type Reducer = (state: StoreState, action: Action) => StoreState;

export default class Store {
  #listeners: ((...args: any[]) => void)[];

  readonly #reducers: Record<string, Reducer>;

  #state: StoreState;

  constructor(reducers: Record<string, Reducer>, initialState: StoreState) {
    this.#listeners = [];
    this.#reducers = reducers;
    this.#state = this.#reduce(initialState, {});

    window.store = this;
  }

  get state(): StoreState {
    return this.#state;
  }

  subscribe(fn: (...args: unknown[]) => void): () => void {
    this.#listeners = [...this.#listeners, fn];
    fn(this.state);
    return () => { this.#listeners = this.#listeners.filter((sub) => sub !== fn); };
  }

  dispatch(action: Action) {
    this.#state = this.#reduce(this.#state, action);
    this.#listeners.forEach((fn) => fn(this.state));
  }

  #reduce(state: StoreState, action: Action | EmptyObject): StoreState {
    const newState = {} as StoreState;
    Object.keys(this.#reducers).forEach((prop) => {
      newState[prop] = this.#reducers[prop](state[prop], action as Action);
    });

    return newState;
  }
}
