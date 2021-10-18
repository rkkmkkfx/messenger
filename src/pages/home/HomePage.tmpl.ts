export default `
  {#block Paper #}
    {#each links as link #}
      <a href="{{link.href}}" target="_blank">{{link.title}}</a>
    {#each#}
  {#block#}
`;
