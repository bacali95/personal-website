import { Injectable } from '@nestjs/common';
import { Profile, ProfileDTO } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  findOne(): Promise<Profile> {
    return this.profileModel.findOne().exec();
  }

  findById(id: string): Promise<Profile> {
    return this.profileModel.findById(id).exec();
  }

  create(profileDTO: Partial<ProfileDTO>): Promise<Profile> {
    return new this.profileModel(profileDTO).save();
  }

  update(profileDTO: Partial<ProfileDTO>): Promise<Profile> {
    return this.profileModel
      .updateOne({ _id: profileDTO._id }, profileDTO)
      .exec();
  }
}
