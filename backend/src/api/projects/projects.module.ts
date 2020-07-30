import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { getRepository } from 'fireorm';
import { ProjectsRepository } from './projects.repository';
import { Project } from './projects.model';

@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: ProjectsRepository,
      useFactory: () => getRepository<Project>(Project) as ProjectsRepository,
    },
  ],
  exports: [ProjectsRepository],
})
export class ProjectsModule {}
