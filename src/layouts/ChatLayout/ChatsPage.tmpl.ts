import Chat from '../../modules/Chat';
import Sidebar from '../../modules/Sidebar';

import * as styles from './ChatsPage.module.pcss';

type ChatLayoutProps = {
  children: string;
};

export default ({ children }: ChatLayoutProps): string => (`
  <section class="${styles.chatsLayout}">
    ${Sidebar({ children })}
    ${Chat}
  </section>
`);
