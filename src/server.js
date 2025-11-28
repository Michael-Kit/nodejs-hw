// src/server.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import notesRouters from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors()); // 3. Дозвіл для запитів з інших доменів
app.use(helmet()); // 4. Безпека заголовків
app.use(cookieParser()); // 5. Парсинг cookies

// Основні маршрути
app.use(authRoutes);
app.use(notesRouters);
app.use(userRoutes);

// 404 — якщо маршрут не знайдено (має бути перед errors())
app.use(notFoundHandler);

// Celebrate validation errors (після notFoundHandler)
app.use(errors());

// Error — якщо під час запиту виникла помилка (останній middleware)
app.use(errorHandler);

// Підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
