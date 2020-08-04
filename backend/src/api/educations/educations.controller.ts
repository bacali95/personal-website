import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EducationsRepository } from './educations.repository';
import { sortComparator } from '../../utils';
import { Education, EducationDTO } from './educations.schema';

@Controller()
export class EducationsController {
  constructor(private readonly educationsRepository: EducationsRepository) {}

  @Get()
  async getAll(): Promise<Education[]> {
    return (await this.educationsRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() education: EducationDTO): Promise<Education> {
    return this.educationsRepository.create(education);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Education> {
    return this.educationsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() education: EducationDTO): Promise<Education> {
    return this.educationsRepository.update(education);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.educationsRepository.delete(id);
  }
}
