import { Injectable } from '@nestjs/common';
import { Asset, AssetDTO } from './assets.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssetsRepository {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>) {}

  create(assetDTO: AssetDTO): Promise<Asset> {
    return new this.assetModel(assetDTO).save();
  }

  update(assetDTO: AssetDTO): Promise<Asset> {
    return this.assetModel.updateOne({ _id: assetDTO._id }, assetDTO).exec();
  }

  delete(id: string): Promise<Asset> {
    return this.assetModel.findByIdAndDelete(id).exec();
  }

  findAll(): Promise<Asset[]> {
    return this.assetModel.find().exec();
  }

  findById(id: string): Promise<Asset> {
    return this.assetModel.findById(id).exec();
  }
}
