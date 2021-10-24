/* eslint-disable no-cond-assign */
import EventBus from './EventBus';

type DOMNode = {
  tag: string;
  props: NamedNodeMap;
  children: Nullable<DOMNode>[] | Node | Primitive;
};

function get<T extends Record<string, any>>(
  path: string,
  obj?: T,
  defaultValue?: unknown,
  delimiter = '.',
): any {
  return path
    .split(delimiter)
    .reduce<typeof obj>((res, key) => res && res[key], obj) ?? defaultValue;
}

class Templator {
  TAG_REGEXP = /\s*?<(\w+)\s?(.*)>\s*?(.*|\n*)\s*?<\/\1>\s*?/gmi;

  TAG_PROPS_REGEXP = /(\w+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gmi;

  VALUE_REGEXP = /\s*?{{\s*?(.*?)\s*?}}\s*?/gmi;

  WITH_REGEXP = /{#with (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#with#}/gmi;

  EACH_REGEXP = /{#each (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#each#}/gmi;

  eventBus = new EventBus();

  getProps<T>(props: string, ctx: T) {
    const tagPropsRegexp = this.TAG_PROPS_REGEXP;
    const matches = [...props.matchAll(new RegExp(tagPropsRegexp))];
    return matches.reduce((acc: Record<string, string>, [, key, value]) => {
      acc[key] = this.replaceValue(value, ctx);
      return acc;
    }, {});
  }

  createNode<T>(tag: string, props: string, children: DOMNode['children'], ctx: T): DOMNode {
    return {
      tag,
      props: this.getProps(props, ctx),
      children,
    };
  }

  renderNode({ tag, props, children }: DOMNode): HTMLElement {
    const element = document.createElement(tag);

    if (props && Object.keys(props).length) {
      Object.entries(props).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (Array.isArray(children)) {
      children.forEach((child) => {
        element.appendChild(this.renderNode(child));
      });
    }

    if ((children as HTMLElement).tagName) {
      element.appendChild(children as HTMLElement);
    } else {
      element.appendChild(document.createTextNode(`${children}`));
    }

    return element;
  }

  parseTemplate<T>(tmpl: string, ctx: T): Nullable<DOMNode[]> {
    const str = tmpl.trim();
    const tagRegExp = this.TAG_REGEXP;

    const matches = [...str.matchAll(new RegExp(tagRegExp))!];

    console.log(matches, tmpl.trim());

    if (Array.isArray(matches) && matches.length) {
      return matches.map((match) => {
        const tag = match[1];
        const props = match[2];
        let children: DOMNode[] | Primitive = this.parseTemplate(match[3], ctx) ?? match[3].trim();
        if (!Array.isArray(children)) {
          children = this.replaceValue(children, ctx) as Primitive;
        }

        return this.createNode(tag, props, children, ctx);
      });
    }

    return null;
  }

  compile<T>(template: string, ctx?: T): HTMLElement[] | Text {
    return this.compileTemplate(template, ctx) ?? document.createTextNode(template);
  }

  protected replaceValue<T>(tmpl: string, ctx?: T): string {
    const valueRegExp = this.VALUE_REGEXP;
    const [match] = [...tmpl.matchAll(valueRegExp)];
    if (match && match[1]) {
      const tmplValue = match[1].trim();
      return get<T>(tmplValue, ctx);
    }
    return tmpl;
  }

  protected replaceWith<T>(tmpl: string, ctx?: T): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.WITH_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<T>(tmplValue, ctx);
      if (!data) {
        str = str.replace(new RegExp(part, 'gmi'), '');
      }
      const result = this.replaceValue(inner, { [valuePath]: data });
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  protected replaceEach<T>(tmpl: string, ctx: T): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.EACH_REGEXP;

    while (key = regExp.exec(tmpl)) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<typeof ctx>(tmplValue, ctx);
      const result = data?.map((item: never) => this.replaceValue(inner, { [valuePath]: item })).join('\n');
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  getProps(attributes) {
    console.log(attributes?.length);
    if (attributes) {
      for (let i = 0; i < attributes?.length - 1; i++) {
        console.log(attributes.item ? attributes.item(i) : attributes);
      }
    }
  }

  parse(tmpl: string) {
    return [...new DOMParser().parseFromString(tmpl, 'text/html').body.children];
  }

  toVDOM(nodes: (Node & { tagName: string, attributes: NamedNodeMap })[]): Nullable<DOMNode>[] {
    console.log(nodes);
    if (Array.isArray(nodes)) {
      return nodes.map((node) => {
        if (node.nodeType === 1) {
          return {
            tag: node.tagName.toLowerCase(),
            props: node.attributes,
            children: node.nodeType === 1 ? this.toVDOM([...node.childNodes]) : node,
          }
        }
        return node;
      });
    }
    return nodes;
  }

  protected compileTemplate<T>(tmpl: string, ctx?: T): HTMLElement[] | undefined {
    console.log(this.toVDOM(this.parse(tmpl)));
    const dom = this.parseTemplate(tmpl, ctx);
    return dom?.map((node) => this.renderNode(node));
    // tmpl = this.replaceWith(tmpl, ctx);
    // tmpl = this.replaceEach(tmpl, ctx);
    // tmpl = this.replaceValue(tmpl, ctx);
  }
}

export default new Templator();
