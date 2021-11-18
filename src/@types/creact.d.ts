/// <reference lib="DOM" />

type VirtualDOMElement = {
  tag: any;
  props: {
    [key: string]: any,
    children: VirtualDOMElement[];
  }
};

declare type PropsWithChildren<Props> = Props & { children?: JSX.Element[] };

declare type ExtNode = (Node | Text) & { __virtual: VirtualDOMElement };

declare namespace JSX {
  // The return type of our JSX Factory: this could be anything
  type Element = VirtualDOMElement;

  // IntrinsicElementMap grabs all the standard HTML tags in the TS DOM lib.
  type IntrinsicElements = IntrinsicElementMap;

  // The following are custom types, not part of TS's known JSX namespace:
  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: any
    }
  };

  type Tag = any;
}
