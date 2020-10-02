import BaseRepository from './BaseRepository';

import { ICodeInfoModel, model } from '../models/Code';

class CodeRepository extends BaseRepository<ICodeInfoModel> {
  constructor() {
    super(model);
  }

  async save(body: ICodeInfoModel): Promise<ICodeInfoModel | null> {
    const doc = await super.findOne({ name: body.name, owner: body.owner });

    if (!doc) {
      return super.create(body);
    }

    return super.findOneAndUpdate({ _id: doc.id }, body);
  }
}

export default CodeRepository;
