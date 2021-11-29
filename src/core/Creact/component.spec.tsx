/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import Creact from './index';

import { Component } from './Component';

class Child extends Component {
  render(): JSX.Element {
    return (
      <button id="child" onClick={this.props.onClick}>{this.children}</button>
    );
  }
}

class Parent extends Component {
  componentDidMount() {
    this.setState({ loaded: true });
  }

  render(): JSX.Element {
    return (
      <main id="parent">
        <Child
          onClick={({ currentTarget }: Event) => {
            if (currentTarget) {
              const typedTarget = currentTarget as HTMLElement;
              typedTarget.textContent = 'Up';
            }
          }}
        >
          Button
        </Child>
        {this.state.loaded ? 'Loaded' : ''}
      </main>
    );
  }
}

describe('Rendered component', () => {
  Creact.render(<Parent />, document.body);

  const parent = document.getElementById('parent');
  const child = document.getElementById('child');

  it('should exists', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(parent).to.not.be.null;
  });

  it('should has a right structure', () => {
    expect(parent).to.be.equal(child?.parentElement);
  });

  it('handlers should works', () => {
    child?.click();
    expect(child?.textContent).to.be.equal('Up');
  });

  it('state should updates', () => {
    expect(parent?.textContent).contains('Loaded');
  });
});
