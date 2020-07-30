import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { getRepository } from 'fireorm';
import { SkillsRepository } from './skills.repository';
import { Skill } from './skills.model';

@Module({
  controllers: [SkillsController],
  providers: [
    {
      provide: SkillsRepository,
      useFactory: () => getRepository<Skill>(Skill) as SkillsRepository,
    },
  ],
  exports: [SkillsRepository],
})
export class SkillsModule {}
