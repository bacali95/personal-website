import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { AssetsModule } from './assets/assets.module';
import { CategoriesModule } from './categories/categories.module';
import { EducationsModule } from './educations/educations.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { RouterModule } from 'nest-router';

@Module({
  imports: [
    ProfileModule,
    AssetsModule,
    CategoriesModule,
    EducationsModule,
    ProjectsModule,
    SkillsModule,
    RouterModule.forRoutes([
      {
        path: 'api',
        children: [
          {
            path: 'profile',
            module: ProfileModule,
          },
          {
            path: 'assets',
            module: AssetsModule,
          },
          {
            path: 'categories',
            module: CategoriesModule,
          },
          {
            path: 'educations',
            module: EducationsModule,
          },
          {
            path: 'projects',
            module: ProjectsModule,
          },
          {
            path: 'skills',
            module: SkillsModule,
          },
        ],
      },
    ]),
  ],
})
export class ApiModule {}
