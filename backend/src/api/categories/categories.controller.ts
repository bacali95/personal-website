import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { sortComparator } from '../../utils';
import { Category, CategoryDTO } from './categories.schema';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return (await this.categoriesRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: CategoryDTO): Promise<Category> {
    return this.categoriesRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Category> {
    return this.categoriesRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: CategoryDTO): Promise<Category> {
    return this.categoriesRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.categoriesRepository.delete(id);
  }
}
