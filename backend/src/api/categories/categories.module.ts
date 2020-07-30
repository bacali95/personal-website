import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { getRepository } from 'fireorm';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.model';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategoriesRepository,
      useFactory: () =>
        getRepository<Category>(Category) as CategoriesRepository,
    },
  ],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
