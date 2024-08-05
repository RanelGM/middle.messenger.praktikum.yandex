# Yandex practicum (Chat)

## О проекте

Учебный проект в рамках курса middle frontend developer от Яндекс Практикум.
Прототип макета в [Figma](https://www.figma.com/design/Xzb7igEKbMxpGRLVTjDNJK/Yandex-practicum-Chat)
Стабильная версия на [Netlify](https://deploy-preview-9--taupe-bunny-433444.netlify.app)

## Установка и запуск

1. `npm ci`
2. `npm run dev` (для запуска в dev режиме) или `npm start` (для запуска в prod режиме).
   Проект автоматически развернется на 3000 порте

## Доступные маршруты проекта

1. `/` - страница входа/авторизации
2. `/sign-up` - страница регистрации
3. `/settings` - страница профиля
   3.1. `/settings/edit-info` - подстраница редактирования информации
   3.2. `/settings/edit-password` - подстраница редактирования пароля
4. `/messenger` - страница чатов
5. `/error-not-found` - страница с ошибкой 404
6. `/error-server` - страница с ошибкой 500

## Инструменты и плагины для разработки

1. `NodeJS` - [версия не менее 20](https://nodejs.org/en/download/prebuilt-installer)
1. `ESLint` - [сайт для ознакомления](https://eslint.org/), [плагин VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [плагин Webstorm](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_activate)
1. `Stylelint` - [сайт для ознакомления](https://stylelint.io/), [плагин VS Code](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), [плагин Webstorm](https://www.jetbrains.com/help/webstorm/using-stylelint-code-quality-tool.html#ws_stylelint_configure)
1. `Prettier` - [сайт для ознакомления](https://prettier.io/), [плагин VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [плагин Webstorm](https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_install)
1. `EditorConfig` - [сайт для ознакомления](https://editorconfig.org/), [плагин VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [плагин Webstorm](https://www.jetbrains.com/help/webstorm/configuring-code-style.html#editorconfig)

## Доступные скрипты (/react)

1. `npm run start` - запуск prod версии через Express (порт 3000)
2. `npm run dev` - запуск dev версии через Vite dev server (порт 3000)
3. `npm run build` - сборка prod версии в папку /dist
4. `npm run eslint` - проверка на наличие ошибок ESLint
5. `npm run stylelint` - проверка на наличие ошибок Stylelint
6. `npm run prettier` - проверка на наличие неправильного форматирования Prettier
7. `npm run lint` - проверка на наличие ошибок / неправильного форматирования (запускает ESLint + Stylelint + Prettier)
8. `npm run eslint:fix` - автоматичекое исправление ошибок ESLint (перезапись)
9. `npm run stylelint:fix` - автоматичекое исправление ошибок Stylelint (перезапись)
10. `npm run prettier:fix` - автоматичекое исправление форматирования Prettier (перезапись)
11. `npm run lint:fix` - автоматичекое исправление ошибок / форматирования (перезапись, запускает ESLint + Stylelint + Prettier)
