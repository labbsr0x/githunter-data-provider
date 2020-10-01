import { Model, Document } from 'mongoose';

class BaseRepository<T extends Document> {
  private Collection: Model<T>;

  constructor(model: Model<T>) {
    this.Collection = model;
  }

  async find(query = {}, { multiple = true } = {}): Promise<any> {
    const results = multiple
      ? this.Collection.find(query)
      : this.Collection.findOne(query);

    return results;
  }

  async create(body: T): Promise<any> {
    const document = new this.Collection(body);

    return document.save();
  }

  async findOneAndUpdate(conditions = {}, update = {}): Promise<any> {
    return this.Collection.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
}

export default BaseRepository;
