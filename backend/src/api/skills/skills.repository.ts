import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Skill } from './skills.model';

@Injectable()
@CustomRepository(Skill)
export class SkillsRepository extends BaseFirestoreRepository<Skill> {}
