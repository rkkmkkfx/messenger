import { expect } from 'chai';

import store from './index';

import initialState from './state';

describe('Global store', () => {
  it('should be initialized singleton', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(store).not.to.be.undefined;
  });

  it('should be initialized with default state', () => {
    expect(store.state).to.be.deep.equal(initialState);
  });

  it('should update state on dispatch', () => {
    store.dispatch({
      type: 'STORE_USER',
      payload: {
        display_name: 'John Johnson',
      },
    });
    expect(store.state.user?.display_name).to.be.equal('John Johnson');
  });
});
