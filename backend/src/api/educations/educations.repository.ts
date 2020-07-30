import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Education } from './educations.model';

@Injectable()
@CustomRepository(Education)
export class EducationsRepository extends BaseFirestoreRepository<Education> {}
