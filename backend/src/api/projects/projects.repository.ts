import { Injectable } from '@nestjs/common';
import { Project, ProjectDTO } from './projects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  create(projectDTO: ProjectDTO): Promise<Project> {
    return new this.projectModel(projectDTO).save();
  }

  update(projectDTO: ProjectDTO): Promise<Project> {
    return this.projectModel
      .updateOne({ _id: projectDTO._id }, projectDTO)
      .exec();
  }

  delete(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }

  findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  findById(id: string): Promise<ProjectDTO> {
    return this.projectModel
      .findById(id)
      .exec()
      .then((p) => p as ProjectDTO);
  }
}
