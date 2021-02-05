import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

class BaseRepository<T extends Document> {
  private Collection: Model<T>;

  constructor(model: Model<T>) {
    this.Collection = model;
  }

  async find(
    query: FilterQuery<T> = {},
    projection?: unknown | null,
  ): Promise<T[] | null> {
    const results = await this.Collection.find(query, projection);

    return results;
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    const result = await this.Collection.findOne(query);

    return result;
  }

  async create(body: T): Promise<T> {
    const document = new this.Collection(body);

    return document.save();
  }

  async findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T | null> {
    const doc = await this.Collection.findOneAndUpdate(conditions, update, {
      new: true,
    });

    return doc;
  }

  async findOneAndDelete(conditions: FilterQuery<T>): Promise<T | null> {
    let response: T | null = null;

    await this.Collection.findOneAndDelete(conditions, (err, doc) => {
      if (err) throw new Error(err.message);

      response = doc;
    });

    return response;
  }
}

export default BaseRepository;
