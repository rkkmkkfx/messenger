declare type Nullable<T> = T | null;

declare type Primitive = number | string | boolean | (() => void);

declare interface ComponentProps extends Record<string, any>{
  className?: string;
}

declare type User = {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
};

declare type Message = {
  user: User;
  time: Date;
  content: string;
};

declare type Chat = {
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  messages: Message;
};
