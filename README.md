# Приложение-чат

## [Sprint IV PR](https://github.com/rkkmkkfx/middle.messenger.praktikum.yandex/pull/5)

### [Heroku App](https://rkkmkkfx-messenger-praktikum.herokuapp.com/)

<!------
## [Sprint III PR](https://github.com/rkkmkkfx/middle.messenger.praktikum.yandex/pull/3)

## Sprint III

### Шаблонизатор
Следующая ступень эволюции шаблонизатора - теперь это jsx парсер
и попытка применить react-like механизм сверки

Сделан и доработан по tutorial серии статей [Build Your Own React](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5),
текущая реализация дополнительно использует EventBus для lifecycle и Proxy для управления состоянием компонента

### Global State
простейшая реализация redux с initialState, редьюсерами и connect HOC

### Router
```tsx
router
  .use(route, <Component />)
  .connect(document.getElementById('app'));
```
### Client-Server Interaction
`*-api.ts` - Набор методов для общения с серверной частью приложения.

`ChatInstance.ts` - Instance чата, в котором хранится вся необходимая логика

## Sprint II

#### [Sprint II PR](https://github.com/rkkmkkfx/middle.messenger.praktikum.yandex/pull/2)

### Второй спринт самостоятельного проекта

**App entrypoint** - `/src/index.ts`

---

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

В текущей реализации в шаблонизаторе обновился парсинг,
теперь строка с HTML парсится при помощи DOM Parser API,
после из HTML-элементов собирается некое подобие VirtualDOM
```ts
type VirtualDOMNode = {
  tag: string;
  props: Record<string, string>;
  children: JSX.Element[];
};

type JSX.Element =
  | HTMLElement
  | string
  | VirtualDOMNode;
```
и уже из этого VirtualDOM собирается DOM компонента/страницы

*Сделано это было для подключения
babel-VDom с custom parsing function в дальнейшем.*

---

#### Core functions

* `/src/core/CreactComponent.ts` - Базовый класс для всех компонентов
* `src/core/EventBus.ts` - шина событий, для реализации жизненного цикла компонента
* `/src/core/HTTPTransport.ts` - XHR запросы
* `/src/core/pageLoader.ts` - Временное решение, пока не появится нормальный routing
* `/src/core/Templator.ts` - custom-шаблонизатор
* `/src/core/Validator.ts` - валидация форм.

---

#### Компоненты
Компоненты(`/src/components`) и страницы (`/src/pages`) используют базовый класс
для рендеринга, вложенность реализуется через токены в шаблонах и props компонента

```ts
import Child from '../Child';

class Parent extends CreactComponent {
  constructor(tag, props) {
    super(tag, {
      ...props,
      child: new Child('div', props.child),
    });
  }

  render(): string {
    return '{{ child }}'
  }
}
```

##### Файловая структура компонента:

* Основной файл (`index.ts`). Реэкспорт класса компонента.
В нём же временно находится state приложения для текущей страницы.
* Описание класса компонента (`<ComponentName>.ts`).
* Шаблон элемента (`<ElementName>.tmpl.ts`) - опционально: иногда из-за того,
что в проекте используются CSS Modules корневому элементу нужно назначить класс,
в таком случае шаблон описывается в методе `render`, чтобы не таскать импорт стилей
в несколько файлов. Возможно, в будущем все шаблоны переместятся в компонент(React-like).
* PostCSS-файл со стилями элемента (`<ElementName>.module.pcss`), если нужен.

## Sprint I

#### [Sprint 1 pull-request](https://github.com/rkkmkkfx/middle.messenger.praktikum.yandex/pull/1)

### Первый спринт самостоятельного проекта

=======
### Откройте pull request в ветку main из ветки, где вы разрабатывали проект, и добавьте ссылку на этот pr в README.md в ветке main. Название pull request может быть любое.

### Например, задания для проектной работы во втором спринте вы делаете в ветке sprint_2. Открываете из неё pull request в ветку main (pr может называться произвольно). Ссылку на этот pr добавляете в README.md в ветке main. После этого на платформе Практикума нажимаете «Проверить задание».

### Также не забудьте проверить, что репозиторий публичный.

Даже законченный проект остаётся только заготовкой, пока им не начнут пользоваться. Но сначала пользователь должен понять, зачем ему пользоваться вашим кодом. В этом помогает файл README.

README — первое, что прочитает пользователь, когда попадёт в репозиторий на «Гитхабе». Хороший REAMDE отвечает на четыре вопроса:

- Готов ли проект к использованию?
- В чём его польза?
- Как установить?
- Как применять?

## Бейджи

Быстро понять статус проекта помогают бейджи на «Гитхабе». Иногда разработчики ограничиваются парой бейджев, которые сообщат о статусе тестов кода:

![Бэйджи](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/b.png)

Если пользователь увидит ошибку в работе тестов, то поймёт: использовать текущую версию в важном проекте — не лучшая идея.

Бейджи помогают похвастаться достижениями: насколько популярен проект, как много разработчиков создавало этот код. Через бейджи можно даже пригласить пользователя в чат:

![Версии](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/vers.png)

В README **Webpack** строка бейджев подробно рассказывает о покрытии кода тестами. Когда проект протестирован, это вызывает доверие пользователя. Последний бейдж приглашает присоединиться к разработке.

Другая строка убедит пользователя в стабильности инфраструктуры и популярности проекта. Последний бейдж зовёт в чат проекта.

## Описание

Краткое опишите, какую задачу решает проект. Пользователь не верит обещаниям и не готов читать «полотна» текста. Поэтому в описании достаточно нескольких строк:

![Описание](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/desc.png)

Авторы **React** дробят описание на абзацы и списки — так проще пробежаться глазами по тексту и найти ключевую информацию.

Если у проекта есть сайт, добавьте ссылку в заголовок.

## Установка

Лучше всего пользователя убеждает собственный опыт. Чем быстрее он начнёт пользоваться проектом, тем раньше почувствует пользу. Для этого помогите ему установить приложение: напишите краткую пошаговую инструкцию.

Если проект предназначен для разработчиков, добавьте информацию об установке тестовых версий. Например:

- `npm install` — установка стабильной версии,
- `npm start` — запуск версии для разработчика,
- `npm run build:prod` — сборка стабильной версии.

## **Примеры использования**

Хорошо, если сразу после установки пользователь сможет решить свои задачи без изучения проекта. Это особенно верно, если ваш пользователь — не профессиональный разработчик. Но даже профессионал поймёт вас лучше, если показать примеры использования:

![Ссылки](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/link.png)

Для более подробных инструкции добавьте новые разделы или ссылки:

- на документацию,
- вики проекта,
- описание API.

В учебном проекте будут полезен раздел с описанием стиля кода и правилами разработки: как работать с ветками, пул-реквестами и релизами.

### **Команда**

Если вы работаете в команде, укажите основных участников: им будет приятно, а новые разработчики охотнее присоединятся к проекту. «Гитхаб» — не просто инструмент, это социальная сеть разработчиков.

![Команда](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/team.png)

### **Примеры README**

- «[Реакт](https://github.com/facebook/react)»,
- «[Эхо](https://github.com/labstack/echo)»,
- «[Вебпак](https://github.com/webpack/webpack)»,
- «[ТДенгине](https://github.com/taosdata/TDengine)»,
- «[Соул-хантинг](https://github.com/vladpereskokov/soul-hunting/)».
-->
