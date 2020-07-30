import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Project } from './projects.model';

@Injectable()
@CustomRepository(Project)
export class ProjectsRepository extends BaseFirestoreRepository<Project> {}
