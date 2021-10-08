import * as styles from './ChatPreview.module.pcss';

export default `
  <div class="${styles.root}">
    <img class="${styles.avatar}" src="{{chat.avatar}}" alt="{{chat.title}}">
    <div>
      <h3>{{chat.title}}</h3>
      <span class="${styles.message}">{{chat.last_message.user.first_name}}: {{chat.last_message.content}}</span>
    </div>
  </div>
`;
