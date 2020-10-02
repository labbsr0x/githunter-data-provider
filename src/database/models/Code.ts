import mongoose from 'mongoose';

interface CodeInfo {
  id: string;

  name: string;

  owner: string;

  description: string;

  repoCreatedAt: string;

  primaryLanguage: string;

  repositoryTopics: [string];

  watchers: number;

  stars: number;

  forks: number;

  lastCommitDate: string;

  commits: number;

  hasHomepageUrl: boolean;

  hasReadmeFile: boolean;

  hasContributingFile: boolean;

  licenseInfo: string;

  hasCodeOfConductFile: boolean;

  releases: number;

  contributors: number;

  languages: [string];

  diskUsage: number;
}

const { Schema } = mongoose;

const codeInfoSchema = new Schema(
  {
    name: {
      type: String,
    },
    owner: {
      type: String,
    },
    description: {
      type: String,
    },
    repoCreatedAt: {
      type: String,
    },
    primaryLanguage: {
      type: String,
    },
    repositoryTopics: {
      type: [String],
    },
    watchers: {
      type: Number,
    },
    stars: {
      type: Number,
    },
    forks: {
      type: Number,
    },
    lastCommitDate: {
      type: String,
    },
    commits: {
      type: Number,
    },
    hasHomepageUrl: {
      type: Boolean,
    },
    hasReadmeFile: {
      type: Boolean,
    },
    hasContributingFile: {
      type: Boolean,
    },
    licenseInfo: {
      type: String,
    },
    hasCodeOfConductFile: {
      type: Boolean,
    },
    releases: {
      type: Number,
    },
    contributors: {
      type: Number,
    },
    languages: {
      type: [String],
    },
    diskUsage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export interface ICodeInfoModel extends CodeInfo, mongoose.Document {}

export const model = mongoose.model<ICodeInfoModel>(
  'codeInfoCollection',
  codeInfoSchema,
);
