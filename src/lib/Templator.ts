function get<T extends Record<string, any>>(obj: T, path: string, defaultValue?: unknown): any {
  return path
    .split('.')
    .reduce<typeof obj>((res, key) => res && res[key], obj) ?? defaultValue;
}

export default class Templator {
  _template: string;

  VALUE_REGEXP = /\s*{{\s*(.*?)\s*}}\s*/gmi;
  EACH_START_REGEXP = /{#each (.*) as (.*) #}\s*((.|\n)*?)\s*{#each#}/gmi;

  constructor(template: string) {
    this._template = template;
  }

  compile<T>(ctx: T) {
    return this._compileTemplate(ctx);
  }

  _replaceValue<T>(ctx: T, tmpl: string) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const valueRegExp = this.VALUE_REGEXP;

    while ((key = valueRegExp.exec(tmpl))) {
      console.log('replace');
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get<typeof ctx>(ctx, tmplValue);
        str = str.replace(new RegExp(key[0], "gmi"), `${data}`);
      }
    }

    return str;
  }

  _replaceEach<T>(ctx: T, tmpl: string) {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const eachStartRegExp = this.EACH_START_REGEXP;

    while ((key = eachStartRegExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<typeof ctx>(ctx, tmplValue);
      const result = data?.map((item: any) => this._replaceValue({[valuePath]: item}, inner)).join('\n');
      str = str.replace(new RegExp(part, "gmi"), result);

    }

    return str;
  }

  _compileTemplate<T>(ctx: T) {
    let tmpl = this._template;

    tmpl = this._replaceEach(ctx, tmpl);
    tmpl = this._replaceValue(ctx, tmpl);

    return tmpl;
  }
}
