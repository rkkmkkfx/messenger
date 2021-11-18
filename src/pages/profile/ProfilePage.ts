import Creact from '../../core/Creact';
import Sidebar from '../../components/Sidebar/Sidebar';

import template from './ProfilePage.tmpl';
import Chat from '../../components/Chat';

export default class ProfilePage extends Creact.Component {
  constructor(props: EmptyObject) {
    super({
      ...props,
      sidebar: new Sidebar('aside', props.sidebar).element,
      chat: new Chat('section', props.chat).element,
    });
  }

  async componentDidMount(): Promise<void> {
    const res = await fetch('https://g.tenor.com/v1/gifs?ids=12136175&key=9FE9RGPBR01S');
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render(): JSX.Element {
    return template;
  }
}
