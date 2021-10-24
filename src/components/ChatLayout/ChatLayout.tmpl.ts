import * as styles from './ChatLayout.module.pcss';

export default `
  <section class="${styles.chatsLayout}">
    {#block Sidebar #}
      {{ children }}
    {#block#}
    <main class="${styles.root}">
      <div class="${styles.incoming}">There will be <s>blood</s>chats. Later</div>
      <img class="${styles.img}" src="{{url}}">
    </main>
  </section>
`;
