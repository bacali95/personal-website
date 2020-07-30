import { forwardRef, Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { ProfileModule } from '../api/profile/profile.module';
import { ProjectsModule } from '../api/projects/projects.module';
import { CategoriesModule } from '../api/categories/categories.module';
import { EducationsModule } from '../api/educations/educations.module';
import { SkillsModule } from '../api/skills/skills.module';
import { AssetsModule } from '../api/assets/assets.module';

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => EducationsModule),
    forwardRef(() => SkillsModule),
    forwardRef(() => AssetsModule),
  ],
  controllers: [PublicController],
})
export class PublicModule {}
