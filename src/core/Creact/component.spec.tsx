/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import Creact from './index';

class Child extends Creact.Component {
  render(): JSX.Element {
    return (
      <button id="child" onClick={this.props.onClick}>{this.children}</button>
    );
  }
}

class Parent extends Creact.Component {
  componentDidMount() {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
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

let parent: HTMLElement | null;
let child: HTMLElement | null;

describe('Rendered component', () => {
  before((done) => {
    Creact.render(<Parent />, document.body);
    setTimeout(done, 1);
  });

  after(() => {
    document.body.innerHTML = '';
  });

  it('should exists', () => {
    parent = document.getElementById('parent');
    child = document.getElementById('child');
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
