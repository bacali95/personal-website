import { Injectable } from '@nestjs/common';
import { Education, EducationDTO } from './educations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EducationsRepository {
  constructor(
    @InjectModel(Education.name) private educationModel: Model<Education>,
  ) {}

  create(educationDTO: EducationDTO): Promise<Education> {
    return new this.educationModel(educationDTO).save();
  }

  update(educationDTO: EducationDTO): Promise<Education> {
    return this.educationModel
      .updateOne({ _id: educationDTO._id }, educationDTO)
      .exec();
  }

  delete(id: string): Promise<Education> {
    return this.educationModel.findByIdAndDelete(id).exec();
  }

  findAll(): Promise<Education[]> {
    return this.educationModel.find().exec();
  }

  findById(id: string): Promise<Education> {
    return this.educationModel.findById(id).exec();
  }
}
