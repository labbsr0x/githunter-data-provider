import BaseRepository from './BaseRepository';

import { IProviderModel, model } from '../models/Provider';

class ProviderRepository extends BaseRepository<IProviderModel> {
  constructor() {
    super(model);
  }

  async save(body: IProviderModel): Promise<IProviderModel | null> {
    const doc = await super.findOne({ name: body.name });

    if (!doc) {
      return super.create(body);
    }

    return super.findOneAndUpdate({ _id: doc.id }, body);
  }
}

export default ProviderRepository;
