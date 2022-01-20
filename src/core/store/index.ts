import Store from './Store';

import initialState, { StoreState } from './state';
import reducers from './reducers';

const store = new Store(initialState, {
  ...reducers,
});

export function connect(
  mapStateToProps: (state: StoreState) => StoreState,
) {
  return function connectFunction(
    Component: new(props: any) => Creact.Component,
  ): new(props: any) => Creact.Component {
    return class WithStore extends Component {
      constructor(props: any) {
        super({ ...props });
        store.subscribe(() => {
          this.setState({ ...mapStateToProps(store.state) });
        });
      }
    };
  };
}

export default store;
