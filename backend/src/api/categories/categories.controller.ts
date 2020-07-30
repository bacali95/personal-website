import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './categories.model';
import { sortComparator } from '../../utils';
import { CategoriesRepository } from './categories.repository';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return (await this.categoriesRepository.find()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: Category): Promise<Category> {
    return this.categoriesRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Category> {
    return this.categoriesRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: Category): Promise<Category> {
    return this.categoriesRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriesRepository.delete(id);
  }
}
