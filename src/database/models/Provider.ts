import mongoose from 'mongoose';

interface Provider {
  name: string;
}

const { Schema } = mongoose;

const providerSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export interface IProviderModel extends Provider, mongoose.Document {}

export const model = mongoose.model<IProviderModel>(
  'providerCollection',
  providerSchema,
);
