import Creact from './core/Creact';

export default class App extends Creact.Component {
  name = 'App';

  render(): JSX.Element {
    return (
      <main id="app">
        {this.children}
      </main>
    );
  }
}
