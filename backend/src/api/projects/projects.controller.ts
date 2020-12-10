import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { sortComparator } from '../../utils';
import { Project, ProjectDTO } from './projects.schema';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  @Get()
  async getAll(): Promise<Project[]> {
    return (await this.projectsRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() project: ProjectDTO): Promise<Project> {
    return this.projectsRepository.create(project);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<ProjectDTO> {
    return this.projectsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() project: ProjectDTO): Promise<Project> {
    return this.projectsRepository.update(project);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.projectsRepository.delete(id);
  }
}
