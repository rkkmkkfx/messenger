/* eslint-disable no-cond-assign */


function get(
  path: string,
  obj: ComponentProps,
  defaultValue?: unknown,
  delimiter = '.',
): any {
  return path
    .split(delimiter)
    .reduce<ComponentProps>((res, key) => res && res[key], obj) ?? defaultValue;
}

class Templator {
  VALUE_REGEXP = /\s*?{{\s*?(.*?)\s*?}}\s*?/gmi;

  WITH_REGEXP = /{#with (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#with#}/gmi;

  EACH_REGEXP = /{#each (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#each#}/gmi;

  #renderNode(node: VirtualDOMNode): Node | Text {
    const { tag, props, children } = node;
    const element = document.createElement(tag);

    if (props && Object.keys(props).length) {
      Object.entries(props).forEach(([key, value]) => {
        if (value) element.setAttribute(key, value);
      });
    }

    if (Array.isArray(children) && children.length > 0) {
      children.forEach((child) => {
        if (typeof child !== 'undefined') {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (Array.isArray(child)) {
            const childrenArray = child as (HTMLElement | VirtualDOMNode)[];
            childrenArray.forEach((item) => {
              if ((item as HTMLElement).nodeType === 1) {
                element.appendChild(item as HTMLElement);
              } else {
                element.appendChild(this.#renderNode(item as VirtualDOMNode));
              }
            });
          } else if ((child as HTMLElement).nodeType === 1) {
            element.appendChild(child as HTMLElement);
          } else {
            element.appendChild(this.#renderNode(child as VirtualDOMNode));
          }
        }
      });
    }

    return element;
  }

  compile(template: string, ctx: ComponentProps): Node[] {
    return this.#compileTemplate(template, ctx) ?? document.createTextNode(template);
  }

  #getValuesByTokens(tmpl: string, ctx: ComponentProps): Primitive[] | VirtualDOMElement[] | string[] | string {
    const valueRegExp = this.VALUE_REGEXP;
    const matches = [...tmpl.matchAll(valueRegExp)];
    const result = matches.map((match) => {
      if (match && match[1]) {
        const tmplValue = match[1].trim();
        return get(tmplValue, ctx) ?? '';
      }
      return undefined;
    });

    return result.length ? result.flat(Infinity) : tmpl;
  }

  #replaceTokens(tmpl: string, ctx: ComponentProps) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const valueRegExp = this.VALUE_REGEXP;

    while ((key = valueRegExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get(tmplValue, ctx);
        str = str.replace(new RegExp(key[0].trim(), 'gmi'), `${data ?? ''}`);
      }
    }

    return str;
  }

  #replaceWith(tmpl: string, ctx: ComponentProps): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.WITH_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get(tmplValue, ctx);
      if (!data) {
        str = str.replace(new RegExp(part, 'gmi'), '');
      }
      const result = this.#replaceTokens(inner, { [valuePath]: data });
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  #replaceEach(tmpl: string, ctx: ComponentProps): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.EACH_REGEXP;

    while (key = regExp.exec(tmpl)) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get(tmplValue, ctx);
      const result = data?.map((item: never) => this.#replaceTokens(inner, { [valuePath]: item })).join('\n');
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  #getProps(attributes: NamedNodeMap, ctx: ComponentProps): Record<string, string> {
    const props: Record<string, string> = {};
    if (attributes?.length) {
      for (let i = 0; i < attributes?.length; i++) {
        const { name, value } = attributes.item(i)!;
        const result = this.#getValuesByTokens(value, ctx) as [string] | string;
        if (Array.isArray(result)) {
          [props[name]] = result;
        } else {
          props[name] = result;
        }
      }
    }
    return props;
  }

  static parseDOM(tmpl: string): NodeListOf<ChildNode> {
    return new DOMParser().parseFromString(tmpl, 'text/html').body.childNodes;
  }

  toVirtualDOM(nodes: NodeListOf<ChildNode | HTMLElement>, ctx: ComponentProps): VirtualDOMElement[] {
    const vdom: VirtualDOMElement[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node?.childNodes?.length) {
        const item = node as HTMLElement;
        vdom.push({
          tag: item.tagName.toLowerCase(),
          props: this.#getProps(item.attributes, ctx),
          children: this.toVirtualDOM(node.childNodes, ctx),
        });
      } else if (node?.nodeType === 1) {
        const item = node as HTMLElement;
        vdom.push({
          tag: item.tagName.toLowerCase(),
          props: this.#getProps(item.attributes, ctx),
          children: [...this.#getValuesByTokens(item.textContent!, ctx) as VirtualDOMElement[]],
        });
      } else {
        const token = node.textContent;
        if (token?.length) {
          let values = this.#getValuesByTokens(token, ctx);
          if (Array.isArray(values) && !values.some((value) => value instanceof HTMLElement)) {
            values = this.#replaceTokens(token, ctx);
          }

          if (Array.isArray(values)) {
            vdom.push(...values as VirtualDOMElement[]);
          } else if (values.trim().length) {
            vdom.push(values);
          }
        }
      }
    }

    return vdom;
  }

  #compileTemplate(tmpl: string, ctx: ComponentProps): Node[] {
    let template = tmpl.trim();
    template = this.#replaceWith(template, ctx);
    template = this.#replaceEach(template, ctx);

    const nodes = this.toVirtualDOM(Templator.parseDOM(template), ctx);
    return nodes.map((node) => {
      if (typeof node === 'string') {
        return document.createTextNode(node);
      }
      if (node instanceof HTMLElement) {
        return node as HTMLElement;
      }
      return this.#renderNode(node as VirtualDOMNode);
    });
  }
}

const templator = new Templator();

export default templator;
