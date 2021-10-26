type VirtualDOMNode = {
  tag: string;
  props: NamedNodeMap;
  children: VirtualDOMNode[] | [string] | [HTMLElement];
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
  VALUE_REGEXP = /\s*?{{\s*?(.*?)\s*?}}\s*?/gmi;

  renderNode(node: VirtualDOMNode): HTMLElement | Text {
    const { tag, props, children } = node;
    const element = document.createElement(tag);

    if (props && Object.keys(props).length) {
      Object.entries(props).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (Array.isArray(children) && children.length > 0) {
      children.forEach((child) => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if ((child as HTMLElement).nodeType) {
          element.appendChild(child as HTMLElement);
        } else {
          element.appendChild(this.renderNode(child as VirtualDOMNode));
        }
      });
    }

    return element;
  }

  compile<T>(template: string, ctx?: T): Node {
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

  getProps(attributes, ctx) {
    const props: Record<string, string> = {};
    if (attributes?.length) {
      for (let i = 0; i < attributes?.length; i++) {
        const { name, value } = attributes.item(i);
        props[name] = this.replaceValue(value, ctx);
      }

      return props;
    }
  }

  getDOM(tmpl: string) {
    return [...new DOMParser().parseFromString(tmpl, 'application/xhtml+xml').childNodes];
  }

  toVirtualDOM<T>(nodes: NodeListOf<ChildNode>, ctx: T): VirtualDOMNode[] {
    const result = [];
    nodes.forEach((node) => {
      if (node?.nodeType === 1) {
        result.push({
          tag: node.tagName.toLowerCase(),
          props: this.getProps(node.attributes, ctx),
          children: this.toVirtualDOM(node.childNodes, ctx),
        });
        return;
      }
      const text = node?.data.replaceAll('\n', '').trim();
      if (text.length) {
        result.push(this.replaceValue(text, ctx));
      }
    });
    return result;
  }

  protected compileTemplate<T>(tmpl: string, ctx?: T): Node | undefined {
    const [node] = this.toVirtualDOM(this.getDOM(tmpl), ctx);
    const dom = this.renderNode(node);
    return dom;
  }
}

export default new Templator();
