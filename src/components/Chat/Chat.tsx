import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';
import * as styles from './Chat.module.pcss';
import Header from './Header';
import Controls from './Controls';
import Message from './Message';
import type { MessageProps } from './Message';
import { fetchWithRetry } from '../../core/http/HTTPTransport';

export type ChatProps = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  messages: MessageProps[];
};

export default class Chat extends Component<ChatProps> {
  async componentDidMount() {
    try {
      const { response } = await fetchWithRetry(
        'https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1',
        {},
      );
      const { results } = JSON.parse(response);
      const { url } = results[0].media[0].gif;
      this.setProps({ url });
    } catch (err) {
      console.log(err);
    }
  }

  render(): JSX.Element {
    return (
      <section className={styles.root}>
        <Header avatar={this.props.avatar} title={this.props.title} />
        <main className={styles.messages}>
          {this.props.messages.map((message) => <Message {...message} />)}
        </main>
        <Controls />
      </section>
    );
  }
}
