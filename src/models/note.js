// src/models/note.js

import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS, // ← використовуємо імпортований список
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Текстовий індекс для пошуку по title та content

noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('Note', noteSchema);
