declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

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
