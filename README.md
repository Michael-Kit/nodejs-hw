# Homework 01 – Express API

## 🛠️ Підготовка середовища

Перед початком роботи переконайтесь, що на вашому комп’ютері встановлено Node.js.

### 1. Перевірка Node.js

```bash
node --version
```

Якщо побачите щось на кшталт `v18.17.0` або новішу — Node.js встановлено.
Якщо отримаєте `command not found: node`, завантажте LTS-версію з [офіційного сайту Node.js](https://nodejs.org/en).

### 2. 📦 Перевірка npm

```bash
npm --version
```

Якщо команда не працює — перевстановіть Node.js, переконавшись, що npm включено.

---

## 🚀 Ініціалізація проєкту

Можна обрати один із варіантів:

### Варіант 1 — локально

```bash
mkdir nodejs-hw
cd nodejs-hw
```

### Варіант 2 — через GitHub

- Створіть репозиторій `nodejs-hw`
- Склонуйте його:
  ```bash
  git clone <URL>
  cd nodejs-hw
  ```
- Відкрийте у VS Code
- Створіть гілку:
  ```bash
  git checkout -b 01-express
  ```

### Ініціалізація npm

```bash
npm init -y
```

З’явиться файл `package.json` із базовою інформацією про проєкт.

---

## 🔁 Nodemon

Щоб автоматично перезапускати сервер після змін:

```bash
npm install -D nodemon
```

У `package.json` додайте:

```json
"type": "module",
"scripts": {
  "dev": "nodemon src/index.js"
}
```

---

## 📁 Структура проєкту

- Створіть папку `src`
- У ній — файл `server.js`
- Запуск:

```bash
npm run dev
```

---

## ⚙️ EditorConfig

Створіть файл `.editorconfig`:

```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

---

## 🎨 Prettier

Створіть файл `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

---

## 🔍 ESLint

Ініціалізація:

```bash
npm init @eslint/config@latest
```

Виберіть:

- What to lint: `javascript`
- Use ESLint for: `problems`
- Modules: `esm`
- Framework: `none`
- TypeScript: `No`
- Where code runs: `node`
- Install dependencies: `Yes`
- Package manager: `npm`

### Конфігурація `eslint.config.mjs`:

```js
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
    },
  },
]);
```

---

## 📦 Залежності

```bash
npm install express
npm install cors
npm install pino-http pino-pretty
npm install dotenv
```
