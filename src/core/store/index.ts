import Store from './Store';

import initialState from './state';
import * as reducers from './reducers';

console.log(initialState);

export default new Store(reducers, initialState);
