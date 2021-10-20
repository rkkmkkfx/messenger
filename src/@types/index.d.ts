declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

declare type ButtonProps = {
  href?: string;
  label: HTMLElement | string;
};

declare type InputProps = {
  name: string;
  label: string;
  type: string;
  autocomplete: string;
};
