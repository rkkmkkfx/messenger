import ChatLayout from '../../layouts/ChatLayout';

import ChatPreview from './ChatPreview';

export default ChatLayout({
  children: `
    {#each chats as chat #}
      ${ChatPreview}
    {#each#}
  `,
});
