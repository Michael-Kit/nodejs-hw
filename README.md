📘 Homework 04 – Auth, Sessions & Private Notes
🛠️ Підготовка середовища
Node.js v18.17.0 або новіша

npm (встановлюється разом із Node.js)

MongoDB (локально або Atlas)

🚀 Ініціалізація проєкту

git switch -c 04-auth
або альтернативно як :
git checkout -b 04-auth
npm install
📁 Структура проєкту (після Homework 04-auth)
Code
NODEJS-HW/
├── src/
│ ├── constants/
│ │ ├── tags.js
│ │ └── time.js # ✅ новий файл
│ ├── controllers/
│ │ ├── authController.js # ✅ новий контролер
│ │ └── notesController.js
│ ├── db/
│ │ └── connectMongoDB.js
│ ├── middleware/
│ │ ├── authenticate.js # ✅ новий middleware
│ │ ├── errorHandler.js
│ │ ├── logger.js
│ │ └── notFoundHandler.js
│ ├── models/
│ │ ├── note.js
│ │ ├── session.js # ✅ нова модель
│ │ └── user.js # ✅ нова модель
│ ├── routes/
│ │ ├── authRoutes.js # ✅ новий роут
│ │ └── notesRoutes.js
│ ├── services/
│ │ └── auth.js # ✅ новий сервіс
│ ├── validations/
│ │ ├── authValidation.js # ✅ нова валідація
│ │ └── notesValidation.js
│ └── server.js
├── .env
├── package.json
└── README.md
🟥 У цьому завданні були додані нові файли: user.js, session.js, authController.js, authRoutes.js, auth.js, authenticate.js, time.js, authValidation.js.

🔧 Основні залежності
встановити bcrypt командою:

npm i bcrypt

встановити cookie-parser командою:

npm i cookie-parser

вже встановлені:

express, cors, helmet

mongoose

celebrate, joi

dotenv

nodemon (dev)

🌍 Змінні середовища
Створіть файл .env у корені проєкту. У ньому мають бути змінні:

Code
PORT=3030
MONGO_URL=<your_mongodb_connection_string>
NODE_ENV=development
⚠️ Значення MONGO_URL не публікуйте у README чи репозиторії. Воно має бути доступне лише локально або у Render Environment.

🧑‍💻 Реалізовані модулі
Моделі
User: email, password (мін. 8 символів), username (trim), timestamps, toJSON (без пароля).

Session: userId, accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil.

Note: title, content, tag, userId (прив’язка до User), текстовий індекс.

Middleware
authenticate: перевірка accessToken у cookies, пошук сесії, перевірка терміну дії, додавання req.user.

errorHandler, notFoundHandler, logger.

Сервіси
auth.js: createSession, setSessionCookies.

Валідація
authValidation.js: registerUserSchema, loginUserSchema.

notesValidation.js: перевірка даних нотаток.

🔐 Реалізовані маршрути
Auth
POST /auth/register — реєстрація користувача

POST /auth/login — логін

POST /auth/logout — вихід

POST /auth/refresh — оновлення сесії

Notes (приватні)
GET /notes — всі нотатки користувача

GET /notes/:noteId — нотатка за ID

POST /notes — створення нотатки

PATCH /notes/:noteId — оновлення нотатки

DELETE /notes/:noteId — видалення нотатки

🚨 Обробка помилок
404 — маршрут не знайдено

401 — проблеми з токенами/сесіями

500 — серверні помилки

## ⚠️ Примітка для локальної розробки

У файлі `src/utils/sendEmail.js` використовується тимчасовий фікс для обходу помилки
`self-signed certificate in certificate chain`, яка виникає локально через антивірус:

secure: false,
tls: {
rejectUnauthorized: false, // тимчасово для локальної розробки
}
! ВАЖЛИВО: Перед пушем у репозиторій або деплоєм на продакшн цей рядок треба видалити або закоментувати, щоб не знижувати рівень безпеки TLS‑з’єднання.

🚢 Деплой на Render
Створити Web Service

Підключити GitHub-репозиторій (гілка 05-mail-and-img)

Додати .env у Render Environment

Перевірити роботу маршрутів через Postman

✅ Успішний деплой підтверджується логом:

Code
Server is running on port 3030

```

```
