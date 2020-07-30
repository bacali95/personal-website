import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Project } from './projects.model';
import { sortComparator } from '../../utils';
import { ProjectsRepository } from './projects.repository';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  @Get()
  async getAll(): Promise<Project[]> {
    const projects = await this.projectsRepository.find();
    console.log(projects);
    return projects.sort(sortComparator('asc', 'rank'));
  }

  @Post()
  create(@Body() asset: Project): Promise<Project> {
    return this.projectsRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Project> {
    return this.projectsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: Project): Promise<Project> {
    return this.projectsRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.projectsRepository.delete(id);
  }
}
