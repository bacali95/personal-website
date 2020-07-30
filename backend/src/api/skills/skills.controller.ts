import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Skill } from './skills.model';
import { sortComparator } from '../../utils';
import { SkillsRepository } from './skills.repository';

@Controller()
export class SkillsController {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  @Get()
  async getAll(): Promise<Skill[]> {
    return (await this.skillsRepository.find()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: Skill): Promise<Skill> {
    return this.skillsRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Skill> {
    return this.skillsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: Skill): Promise<Skill> {
    return this.skillsRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.skillsRepository.delete(id);
  }
}
