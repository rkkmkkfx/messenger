import Paper from '../../modules/Paper';

export default Paper({
  title: 'Project pages',
  children: `
    {#each links as link #}
      <a href="{{link.href}}" target="_blank">{{link.title}}</a>
    {#each#}
  `,
});
