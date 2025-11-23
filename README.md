# 📘 Homework 02 – MongoDB Integration

## 🛠️ Підготовка середовища

- Node.js v18.17.0 або новіша
- npm
- MongoDB Atlas (або локальний MongoDB)

## 🚀 Ініціалізація проєкту

```bash
git clone <URL>
cd nodejs-hw
git checkout -b 02-mongodb
npm install
```

## 📁 Структура проєкту (після Homework 02)

```
NODEJS-HW/
├── src/
│   ├── controllers/
│   │   └── notesController.js   # ✅ CRUD-логіка для нотаток
│   ├── db/
│   │   └── connectMongoDB.js    # ✅ функція підключення до MongoDB
│   ├── middleware/
│   │   ├── logger.js            # ✅ логування через pino-http
│   │   ├── notFoundHandler.js   # ✅ обробка 404
│   │   └── errorHandler.js      # ✅ глобальна обробка помилок
│   ├── models/
│   │   └── note.js              # ✅ Mongoose-схема для нотаток
│   ├── routes/
│   │   └── notesRoutes.js       # ✅ маршрути для CRUD
│   └── server.js                # головний файл, підключає MongoDB та middleware
├── .env                         # PORT, MONGO_URL
├── package.json
└── README.md
```

---

## 🔧 Основні залежності

```bash
npm install express cors mongoose dotenv pino-http http-errors
npm install -D nodemon
```

---

## 🌍 Змінні середовища

Створіть файл `.env` у корені проєкту:

```
PORT=3000
MONGO_URL=<your_mongodb_connection_string>
NODE_ENV=development
```

---

## 🧑‍💻 Реалізовані модулі

### Модель Note

- `title` — обов’язковий рядок, `trim: true`
- `content` — необов’язковий рядок, за замовчуванням `''`
- `tag` — одне із значень: `Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo` (за замовчуванням `Todo`)
- `timestamps: true` — автоматично додає `createdAt` та `updatedAt`

### Middleware

- **logger.js** — логування HTTP-запитів через `pino-http`
- **notFoundHandler.js** — відповідає `{ message: 'Route not found' }` для неіснуючих маршрутів
- **errorHandler.js** — глобальна обробка помилок (500 або специфічні через `http-errors`)

### Підключення до MongoDB

- Файл `src/db/connectMongoDB.js` встановлює з’єднання з базою
- Успішне підключення виводить у консоль:
  ```
  ✅ MongoDB connection established successfully
  ```

---

## 🔐 Реалізовані маршрути (CRUD)

- `GET /notes` — повертає всі нотатки
- `GET /notes/:noteId` — повертає нотатку за ID (404 якщо не знайдено)
- `POST /notes` — створює нову нотатку
- `PATCH /notes/:noteId` — оновлює існуючу нотатку
- `DELETE /notes/:noteId` — видаляє нотатку

---

## 🚨 Обробка помилок

- 404 — маршрут не знайдено
- 500 — серверні помилки або специфічні через `http-errors`

---

## 🚢 Деплой на Render

1. Створіть Web Service
2. Підключіть GitHub-репозиторій (гілка 02-mongodb)
3. У Render Environment додайте змінні:
   - `MONGO_URL`
   - `NODE_ENV=production`
4. Перевірте роботу маршрутів через Postman

✅ Успішний деплой підтверджується логом:

```
✅ MongoDB connection established successfully
Server is running on port 3000
```
