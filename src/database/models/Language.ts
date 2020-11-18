import mongoose from 'mongoose';

interface Language {
  name: string;
}

const { Schema } = mongoose;

const languageSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export interface ILanguageModel extends Language, mongoose.Document {}

export const model = mongoose.model<ILanguageModel>(
  'languageCollection',
  languageSchema,
);
