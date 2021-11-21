declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

declare type DefaultObject = Record<string, unknown>;

declare type EmptyObject = Record<string, never>;

declare type PageElement = PageElement;

declare type UserData = {
  id?: number,
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};
