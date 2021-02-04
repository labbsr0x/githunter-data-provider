import BaseRepository from './BaseRepository';

import { IUserModel, model } from '../models/User';

class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(model);
  }

  async save(body: IUserModel): Promise<IUserModel | null> {
    const doc = await super.findOne({ name: body.name });

    if (!doc) {
      return super.create(body);
    }

    return super.findOneAndUpdate({ _id: doc.id }, body);
  }
}

export default UserRepository;
