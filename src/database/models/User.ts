import mongoose from 'mongoose';

interface OwnedRepository {
  name: string;

  owner: string;

  createdAt: string;

  starsReceived: number;
}

interface User {
  name: string;

  login: string;

  provider: string;

  avatarUrl: string;

  company: string;

  organizations: [string];

  followers: [string];

  ownedRepositories: [OwnedRepository];
}

const { Schema } = mongoose;

const ownedRepository = new Schema({
  name: {
    type: String,
  },
  owner: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  starsReceived: {
    type: Number,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    login: {
      type: String,
    },
    provider: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    company: {
      type: String,
    },
    organizations: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    ownedRepositories: [ownedRepository],
  },
  {
    timestamps: true,
  },
);

export interface IUserModel extends User, mongoose.Document {}

export const model = mongoose.model<IUserModel>('userCollection', userSchema);
