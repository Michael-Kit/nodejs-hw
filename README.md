# 📘 Homework 05 – mail-and-img (Password Reset & User Avatar)

## Загальна мета

У цьому завданні ви продовжите розробку свого **Express-додатку** (у тому ж репозиторії `nodejs-hw`).
Цього разу ви реалізуєте:

- 📩 Скидання паролю через пошту
- 🖼️ Завантаження зображення для аватара користувача

Завдання виконано у гілці **`05-mail-and-img`**.

---

## 🛠️ Підготовка середовища

- Node.js v18.17.0 або новіша
- npm (встановлюється разом із Node.js)
- MongoDB (локально або Atlas)
- Brevo SMTP акаунт
- Cloudinary акаунт

---

## 🚀 Ініціалізація проєкту

Ця робота виконується на базі попереднього завдання (**Homework 04-auth**).
Для реалізації нового функціоналу створено окрему гілку:

```bash
git switch -c 05-mail-and-img
# або
git checkout -b 05-mail-and-img

npm install   # тільки якщо ви клонуєте репозиторій вперше
```

---

## 📁 Структура проєкту (після Homework 05-mail-and-img)

```
NODEJS-HW/
├── src/
│   ├── controllers/
│   │   ├── authController.js   # ✅ доповнено requestResetEmail, resetPassword
│   │   └── userController.js   # ✅ новий контролер для avatar
│   ├── middleware/
│   │   ├── multer.js           # ✅ новий middleware для upload
│   ├── models/
│   │   └── user.js             # ✅ нове поле avatar + pre("save")
│   ├── routes/
│   │   ├── authRoutes.js       # ✅ нові маршрути для reset email/password
│   │   └── userRoutes.js       # ✅ новий маршрут для avatar
│   ├── templates/
│   │   └── reset-password-email.html # ✅ шаблон листа
│   ├── utils/
│   │   ├── sendEmail.js        # ✅ утиліта для SMTP
│   │   └── saveFileToCloudinary.js # ✅ утиліта для Cloudinary
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## 🔧 Основні залежності

- `bcrypt` — хешування паролів
- `nodemailer` — надсилання email
- `cloudinary` — збереження аватарів
- `multer` — обробка файлів
- `celebrate`, `joi` — валідація

---

## 🌍 Змінні середовища

```env
PORT=3030
MONGO_URL=<your_mongodb_connection_string>
NODE_ENV=development

JWT_SECRET=<jwt_secret>
FRONTEND_DOMAIN=http://localhost:3001

CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

SMTP_HOST=<brevo_host>
SMTP_PORT=587
SMTP_USER=<brevo_user>
SMTP_PASSWORD=<brevo_password>
SMTP_FROM=<your_email>
```

---

## 🧑‍💻 Реалізовані модулі

- **Auth**: `requestResetEmail`, `resetPassword`
- **User**: `updateUserAvatar`
- **Utils**: `sendEmail`, `saveFileToCloudinary`
- **Middleware**: `multer` (memoryStorage, 2MB, тільки image/\*)

---

## 🔐 Реалізовані маршрути

- `POST /auth/request-reset-email` — надсилання листа для скидання паролю
- `POST /auth/reset-password` — скидання паролю
- `PATCH /users/me/avatar` — оновлення аватарки

---

## 🚨 Обробка помилок

- 404 — маршрут не знайдено
- 401 — токен невалідний або прострочений
- 500 — серверні помилки

---

## ⚠️ Примітка для локальної розробки

У файлі src/utils/sendEmail.js використовується динамічна TLS‑конфігурація:

secure: process.env.NODE_ENV === 'production',
tls: {
rejectUnauthorized: process.env.NODE_ENV === 'production',
}
У production завжди використовується строгий режим TLS (безпечне з’єднання).

У development допускається робота з самопідписаними сертифікатами. Це може бути корисно, якщо локально антивірус або проксі підміняє TLS‑сертифікати і виникає помилка self-signed certificate in certificate chain.

Якщо у вас немає проблем із TLS, цей блок можна не додавати або залишити як є — він не вплине на роботу.

---

## 🚢 Деплой на Render

- Створити Web Service
- Підключити GitHub‑репозиторій (гілка `05-mail-and-img`)
- Додати `.env` у Render Environment
- Перевірити роботу маршрутів через Postman

✅ Успішний деплой підтверджується логом:

```
Server is running on port 3030
```
