import ChatPreview from './ChatPreview';

export default `
  {#each chats as chat #}
    ${ChatPreview}
  {#each#}
  <p>{{ value }}</p>
`;
