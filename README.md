# 📘 Homework 03 – Validation, Pagination & Search

## 🛠️ Підготовка середовища

- Node.js v18.17.0 або новіша
- npm
- MongoDB Atlas (або локальний MongoDB)

## 🚀 Ініціалізація проєкту

```bash
git switch -c 03-validation
npm install
```

## 📁 Структура проєкту (після Homework 03)

```
NODEJS-HW/
├── src/
│   ├── constants/
│   │   └── tags.js              # ✅ новий файл зі списком тегів
│   ├── controllers/
│   │   └── notesController.js   # CRUD + пошук + пагінація
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── notFoundHandler.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── note.js              # модель Note з індексом для пошуку
│   ├── routes/
│   │   └── notesRoutes.js       # маршрути з celebrate-валідацією
│   ├── validations/
│   │   └── notesValidation.js   # ✅ новий файл зі схемами Joi
│   └── server.js                # головний файл, підключає MongoDB та middleware
├── .env                         # PORT=3030, MONGO_URL
├── package.json
└── README.md
```

---

## 🔧 Основні залежності

```bash
npm install express cors mongoose dotenv pino-http http-errors celebrate joi helmet
npm install -D nodemon
```

---

## 🌍 Змінні середовища

Створіть файл `.env` у корені проєкту:

```
PORT=3030
MONGO_URL=<your_mongodb_connection_string>
NODE_ENV=development
```

---

## 🧑‍💻 Реалізовані модулі

### Модель Note

- `title` — обов’язковий рядок, `trim: true`
- `content` — необов’язковий рядок, за замовчуванням `''`
- `tag` — одне із значень із `src/constants/tags.js` (за замовчуванням `Todo`)
- `timestamps: true` — автоматично додає `createdAt` та `updatedAt`
- **Індекс**: `noteSchema.index({ title: 'text', content: 'text' })` для пошуку

### Constants

- `src/constants/tags.js` — список тегів: Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo

### Валідація (celebrate/Joi)

- `getAllNotesSchema` — перевірка `page`, `perPage`, `tag`, `search`
- `noteIdSchema` — перевірка `noteId` через `isValidObjectId`
- `createNoteSchema` — перевірка `title`, `content`, `tag`
- `updateNoteSchema` — перевірка `noteId` + тіло запиту (мінімум одне поле)

### Middleware

- **logger.js** — логування HTTP-запитів через `pino-http`
- **notFoundHandler.js** — відповідає `{ message: 'Route not found' }` для неіснуючих маршрутів
- **errorHandler.js** — глобальна обробка помилок (500 або специфічні через `http-errors`)
- **errors()** — обробка помилок від `celebrate`

---

## 🔐 Реалізовані маршрути

### Notes

- `GET /notes` — всі нотатки з підтримкою:
  - `tag` — фільтрація за тегом
  - `search` — пошук по `title` та `content`
  - `page`, `perPage` — пагінація
  - Відповідь:
    ```json
    {
      "page": 1,
      "perPage": 15,
      "totalNotes": 150,
      "totalPages": 10,
      "notes": [
        /* масив нотаток */
      ]
    }
    ```
- `GET /notes/:noteId` — нотатка за ID (404 якщо не знайдено)
- `POST /notes` — створення нової нотатки
- `PATCH /notes/:noteId` — оновлення існуючої нотатки
- `DELETE /notes/:noteId` — видалення нотатки

---

## 🚨 Обробка помилок

- 404 — маршрут не знайдено
- 401 — помилки валідації
- 500 — серверні помилки або специфічні через `http-errors`

---

## 🚢 Деплой на Render

1. Створіть Web Service
2. Підключіть GitHub-репозиторій (гілка 03-validation)
3. У Render Environment додайте змінні:
   - `MONGO_URL`
   - `NODE_ENV=production`
4. Перевірте роботу маршрутів через Postman

✅ Успішний деплой підтверджується логом:

```
✅ MongoDB connection established successfully
Server is running on port 3030
```
