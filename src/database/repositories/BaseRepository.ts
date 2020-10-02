import { Model, Document } from 'mongoose';

class BaseRepository<T extends Document> {
  private Collection: Model<T>;

  constructor(model: Model<T>) {
    this.Collection = model;
  }

  async find(query = {}): Promise<T[] | null> {
    const results = await this.Collection.find(query);

    return results;
  }

  async findOne(query = {}): Promise<T | null> {
    const result = await this.Collection.findOne(query);

    return result;
  }

  async create(body: T): Promise<T> {
    const document = new this.Collection(body);

    return document.save();
  }

  async findOneAndUpdate(conditions = {}, update = {}): Promise<T | null> {
    const doc = await this.Collection.findOneAndUpdate(conditions, update, {
      new: true,
    });

    return doc;
  }

  async findOneAndDelete(conditions = {}): Promise<T | null> {
    let response: T | null = null;

    await this.Collection.findOneAndDelete(conditions, (err, doc) => {
      if (err) throw new Error(err.message);

      response = doc;
    });

    return response;
  }
}

export default BaseRepository;
