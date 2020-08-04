import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './skills.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsRepository],
  exports: [SkillsRepository],
})
export class SkillsModule {}
