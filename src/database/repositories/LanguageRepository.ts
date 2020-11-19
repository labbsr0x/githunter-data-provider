import BaseRepository from './BaseRepository';

import { ILanguageModel, model } from '../models/Language';

class LanguageRepository extends BaseRepository<ILanguageModel> {
  constructor() {
    super(model);
  }

  async save(body: ILanguageModel): Promise<ILanguageModel | null> {
    const doc = await super.findOne({ name: body.name });

    if (!doc) {
      return super.create(body);
    }

    return super.findOneAndUpdate({ _id: doc.id }, body);
  }
}

export default LanguageRepository;
