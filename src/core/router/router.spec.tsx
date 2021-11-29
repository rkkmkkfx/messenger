/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Creact from '../Creact';

import router from './index';
import { Component } from '../Creact/Component';

class One extends Component {
  render(): JSX.Element {
    return (
      <div id="one">
        One
      </div>
    );
  }
}

class Two extends Component {
  render(): JSX.Element {
    return (
      <div>Two</div>
    );
  }
}

describe('Router', () => {
  router
    .use('/one', <One />)
    .use('/two', <Two />)
    .connect(document.body);

  it('/one should render One', () => {
    router.go('/one');
    expect(document.body.textContent).contains('One');
  });

  it('/two should render Two', () => {
    router.go('/two');
    expect(document.body.textContent).contains('Two');
  });
});
