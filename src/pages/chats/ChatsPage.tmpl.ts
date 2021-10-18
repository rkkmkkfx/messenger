export default `
  {#block ChatLayout #}
    {#each chats as chat #}
      {#include ChatPreview #}
    {#each#}
  {#block#}
`;
