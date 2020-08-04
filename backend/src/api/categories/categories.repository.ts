import { Injectable } from '@nestjs/common';
import { Category, CategoryDTO } from './categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  create(categoryDTO: CategoryDTO): Promise<Category> {
    return new this.categoryModel(categoryDTO).save();
  }

  update(categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryModel
      .updateOne({ _id: categoryDTO._id }, categoryDTO)
      .exec();
  }

  delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }
}
