declare module '*.module.pcss' {
  const classes: { readonly [key: string]: string };
  export = classes;
  export default classes;
}
