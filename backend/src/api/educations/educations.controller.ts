import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Education } from './educations.model';
import { sortComparator } from '../../utils';
import { EducationsRepository } from './educations.repository';

@Controller()
export class EducationsController {
  constructor(private readonly educationsRepository: EducationsRepository) {}

  @Get()
  async getAll(): Promise<Education[]> {
    return (await this.educationsRepository.find()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: Education): Promise<Education> {
    return this.educationsRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Education> {
    return this.educationsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: Education): Promise<Education> {
    return this.educationsRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.educationsRepository.delete(id);
  }
}
