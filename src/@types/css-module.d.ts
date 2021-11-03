declare module '*.module.pcss' {
  const styles: { readonly [key: string]: string };
  export = styles;
  export default styles;
}
