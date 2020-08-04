import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SkillsRepository } from './skills.repository';
import { sortComparator } from '../../utils';
import { Skill, SkillDTO } from './skills.schema';

@Controller()
export class SkillsController {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  @Get()
  async getAll(): Promise<Skill[]> {
    return (await this.skillsRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() skill: SkillDTO): Promise<Skill> {
    return this.skillsRepository.create(skill);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Skill> {
    return this.skillsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() skill: SkillDTO): Promise<Skill> {
    return this.skillsRepository.update(skill);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.skillsRepository.delete(id);
  }
}
