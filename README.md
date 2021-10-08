# Приложение-чат
[![Netlify Status](https://api.netlify.com/api/v1/badges/4db40759-a3c1-461a-a673-68c5c93a848d/deploy-status)](https://app.netlify.com/sites/praktikum-messenger-rkkmkkfx/deploys)

## Sprint I

### Первый спринт самостоятельного проекта

**App entrypoint** - `/src/index.ts`

#### **Шаблонизатор**: приложение использует custom-шаблонизатор (`/src/utils/Templator.ts`), примеры хелперов:
* Переменные:
```html
<p>{{value}}</p>
```
* Изменение контекста:
```html
{#with links.0 as link #}
  <a href="{{link.href}}">{{link.title}}</a>
{#with#}
```
* Цикл:
```html
{#each links as link #}
  <a href="{{link.href}}">{{link.title}}</a>
{#each#}
```

Вложенность пока реализована с использованием es6-import'ов

##### ToDo:
* генерация шаблонов на стороне сервера
* `{#include 'path' #}` для вложенности
* if-helper: `{#if condition #}...{#if#}`
* нормальная поддержка Event handlers

`/src/utils/pageLoader.ts` - Временное решение, пока не появится нормальный routing

#### Структура проекта:
Исходный код проекта состоит из страниц (`/src/pages`), которые могут использовать шаблоны (`/src/layouts`) для повторяющихся типов страниц.

Повторяющийся код на страницах вынесен в компоненты (`/src/components`), из которых составляются модули (`/src/modules`)

Все элементы имеют почти идентичную структуру:
* Основной файл, в котором собираются все составляющие элемента (`index.ts`)
* Шаблон элемента (`<ElementName>.tmpl.ts`)
* PostCSS-файл со стилями элемента (`<ElementName>.module.pcss`)
* **Pages-only**: `getTemplatesData.ts` - функция, которая собирает все необходимые данные для шаблонов, использующихся на странице
