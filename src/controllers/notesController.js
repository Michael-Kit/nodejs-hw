// src/controllers/notesController.js

// Отримати список усіх нотаток

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати всі нотатки
export const getAllNotes = async (req, res) => {
  // Отримуємо параметри пагінаціі
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;
  const skip = (page - 1) * perPage;
  // Створюємо базовий запит
  const notesQuery = Note.find();
  // Текстовий пошук по name (працює лише якщо створено текстовий індекс)
  if (search) {
    notesQuery.where({
      $text: { $search: search },
    });
  }
  // Будуємо фільтр за тегом
  if (tag) {
    notesQuery.where({ tag });
  }
  // Виконуємо одразу два запити паралельно
  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);
  // Обчисляємо загальну кількість "сторінок"

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};
// Отримати одну нотатку за id
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  // Додаємо базову обробку помилки замість res.status(404)
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
};

//Новий контролер

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};
// видалення нотатки

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });
  if (!note) {
    next(createHttpError(404, 'Note Not Found'));
    return;
  }

  res.status(200).json(note);
};

// частково оновлюємо
export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
