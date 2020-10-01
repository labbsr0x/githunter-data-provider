import BaseRepository from './BaseRepository';

import { ICodeInfoModel, model } from '../models/Code';

class CodeRepository extends BaseRepository<ICodeInfoModel> {
  constructor() {
    super(model);
  }

  async save(body: ICodeInfoModel): Promise<any> {
    const doc = await super.find(
      { name: body.name, owner: body.owner },
      { multiple: false },
    );

    if (doc && doc.length === 0) {
      return super.create(body);
    }

    return super.findOneAndUpdate({ _id: doc[0].id }, body);
  }
}

module.exports = new CodeRepository();
