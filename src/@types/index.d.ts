declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

declare type ButtonProps = {
  href?: string;
  label: HTMLElement | string;
};
