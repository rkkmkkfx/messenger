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

document.body.innerHTML = '';

router
  .use('/one', <One />)
  .use('/two', <Two />)
  .connect(document.body);

describe('Router', () => {
  it('/one should render <One />', (done) => {
    router.go('/one');
    setTimeout(() => {
      expect(document.body.textContent).contains('One');
      done();
    }, 1);
  });

  it('/two should render <Two />', (done) => {
    router.go('/two');
    setTimeout(() => {
      expect(document.body.innerHTML).equal('<div>Two</div>');
      done();
    }, 1);
  });
});
