import { Injectable } from '@nestjs/common';
import { Skill, SkillDTO } from './skills.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SkillsRepository {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  create(skillDTO: SkillDTO): Promise<Skill> {
    return new this.skillModel(skillDTO).save();
  }

  update(skillDTO: SkillDTO): Promise<Skill> {
    return this.skillModel.updateOne({ _id: skillDTO._id }, skillDTO).exec();
  }

  delete(id: string): Promise<Skill> {
    return this.skillModel.findByIdAndDelete(id).exec();
  }

  findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  findById(id: string): Promise<Skill> {
    return this.skillModel.findById(id).exec();
  }
}
