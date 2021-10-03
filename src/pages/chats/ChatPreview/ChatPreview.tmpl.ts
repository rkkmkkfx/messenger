import styles from './ChatPreview.module.pcss';

export default `
  <a class=${styles.link} href="{{ chat.href }}">
    {{ chat.title }}
  </a>
`;
