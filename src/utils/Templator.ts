// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ToDo: разобраться с d.ts для glob
import templateModules from '../**/*/*.tmpl.ts';

/* eslint-disable no-cond-assign */
function get<T extends Record<string, any>>(
  obj: T,
  path: string,
  defaultValue?: unknown,
  delimiter = '.',
): any {
  return path
    .split(delimiter)
    .reduce<typeof obj>((res, key) => res && res[key], obj) ?? defaultValue;
}

interface TemplatesCollection {
  [key: string]: Record<string, TemplatesCollection | string>
}

function flatObject(obj: TemplatesCollection): TemplatesCollection {
  return Object.entries(obj).reduce<TemplatesCollection>((acc, [key, value]) => {
    if (Object.hasOwnProperty.call(obj, key)) {
      if ((typeof value) === 'object' && !Object.hasOwnProperty.call(value, 'default')) {
        return { ...acc, ...flatObject(value as TemplatesCollection) };
      }
      acc[key] = value;
      return acc;
    }
    return acc;
  }, {});
}

const templates = flatObject(templateModules);

class Templator {
  VALUE_REGEXP = /\s*?{{\s*?(.*?)\s*?}}\s*?/gmi;

  INCLUDE_REGEXP = /\s*?{#include \s*?(.*?)\s*?#}\s*?/gmi;

  WITH_REGEXP = /{#with (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#with#}/gmi;

  EACH_REGEXP = /{#each (.*) as (.*) #}\s*?((.|\n)*?)\s*?{#each#}/gmi;

  BLOCK_REGEXP = /{#block (.*) #}\s*?((.|\n)*?)\s*?{#block#}/gmi;

  compile<T>(ctx: T, template: string): string {
    const result = this.compileTemplate(ctx, template);
    return result;
  }

  protected replaceValue<T>(ctx: T, tmpl: string): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const valueRegExp = this.VALUE_REGEXP;

    while ((key = valueRegExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = get<typeof ctx>(ctx, tmplValue);
        if (typeof data === 'function') {
          window.eventHandlers[tmplValue] = data;
          str = str.replace(new RegExp(key[0].trim(), 'gi'), `window.eventHandlers.${key[1].trim()}()`);
          // eslint-disable-next-line no-continue
          continue;
        }
        str = str.replace(new RegExp(key[0].trim(), 'gmi'), `${data ?? ''}`);
      }
    }

    return str;
  }

  protected replaceWith<T>(ctx: T, tmpl: string): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const regExp = this.WITH_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      const [part, dataPath, valuePath, inner] = key;
      const tmplValue = dataPath.trim();
      const data = get<typeof ctx>(ctx, tmplValue);
      if (!data) {
        str = str.replace(new RegExp(part, 'gmi'), '');
      }
      const result = this.replaceValue({ [valuePath]: data }, inner);
      str = str.replace(new RegExp(part, 'gmi'), `${result}`);
    }

    return str;
  }

  protected replaceEach<T>(ctx: T, tmpl: string): string {
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

  protected replaceInclude<T>(ctx: T, tmpl: string): string {
    let str = tmpl.trim();
    let key: RegExpExecArray | null = null;
    const includeRegExp = this.INCLUDE_REGEXP;

    while ((key = includeRegExp.exec(tmpl))) {
      if (key[1]) {
        const tmplName = key[1].trim();
        str = str.replace(new RegExp(key[0].trim(), 'gmi'), `${templates[tmplName].default ?? ''}`);
      }
    }

    return str;
  }

  protected replaceBlock<T>(ctx: T, tmpl: string): string {
    let str = tmpl.trim();
    const blockRegExp = this.BLOCK_REGEXP;

    while (new RegExp(blockRegExp).test(str)) {
      const [matches] = [...str.matchAll(new RegExp(blockRegExp))!];

      const part = matches[0];
      const tmplName = matches[1];
      const children = matches[2];

      console.log(tmplName, templates);

      const blockTemplate = `${templates[tmplName].default}`;
      const block = blockTemplate.replace(/\s*{{\s*children\s*}}\s*/gmi, children);
      str = str.replace(new RegExp(part, 'gmi'), block);
    }

    return str;
  }

  protected compileTemplate<T>(ctx: T, template: string): string {
    let tmpl = template;

    tmpl = this.replaceBlock(ctx, tmpl);
    tmpl = this.replaceInclude(ctx, tmpl);
    tmpl = this.replaceWith(ctx, tmpl);
    tmpl = this.replaceEach(ctx, tmpl);
    tmpl = this.replaceValue(ctx, tmpl);

    return tmpl;
  }
}

export default new Templator();
