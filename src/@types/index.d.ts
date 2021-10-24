declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

declare type ButtonProps = {
  child: string;
  variant: 'primary' | 'secondary';
  to?: string;
};

declare type InputProps = {
  name: string;
  label: string;
  type: string;
  autocomplete: string;
};
