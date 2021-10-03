/* eslint-disable no-cond-assign */
function get<T extends Record<string, any>>(obj: T, path: string, defaultValue?: unknown): any {
  return path
    .split('.')
    .reduce<typeof obj>((res, key) => res && res[key], obj) ?? defaultValue;
}

export default class Templator {
  template: string;

  eventHandlers: Record<string, (event: Event) => void> = {};

  VALUE_REGEXP = /\s*{{\s*(.*?)\s*}}\s*/gmi;

  WITH_REGEXP = /{#with (.*) as (.*) #}\s*((.|\n)*?)\s*{#with#}/gmi;

  EACH_REGEXP = /{#each (.*) as (.*) #}\s*((.|\n)*?)\s*{#each#}/gmi;

  constructor(template: string) {
    this.template = template;
  }

  compile<T>(ctx: T): string {
    return this.compileTemplate(ctx);
  }

  private replaceValue<T>(ctx: T, tmpl: string) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const valueRegExp = this.VALUE_REGEXP;

    while ((key = valueRegExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get<typeof ctx>(ctx, tmplValue);
        if (typeof data === 'function') {
          window.eventHandlers[tmplValue] = data;
          str = str.replace(new RegExp(key[0], 'gi'), `window.eventHandlers.${key[1].trim()}()`);
          // eslint-disable-next-line no-continue
          continue;
        }
        str = str.replace(new RegExp(key[0], 'gmi'), `${data}`);
      }
    }

    return str;
  }

  private replaceWith<T>(ctx: T, tmpl: string) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.WITH_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<typeof ctx>(ctx, tmplValue);
      console.log(data);
      const result = this.replaceValue({ [valuePath]: data }, inner);
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  private replaceEach<T>(ctx: T, tmpl: string) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.EACH_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<typeof ctx>(ctx, tmplValue);
      const result = data?.map((item: never) => this.replaceValue({ [valuePath]: item }, inner)).join('\n');
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  private compileTemplate<T>(ctx: T) {
    let tmpl = this.template;

    tmpl = this.replaceWith(ctx, tmpl);
    tmpl = this.replaceEach(ctx, tmpl);
    tmpl = this.replaceValue(ctx, tmpl);

    return tmpl;
  }
}
