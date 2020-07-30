import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { sortComparator } from '../../utils';
import { Asset } from './assets.model';

@Controller()
export class AssetsController {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  @Get()
  async getAll(): Promise<Asset[]> {
    return (await this.assetsRepository.find()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: Asset): Promise<Asset> {
    return this.assetsRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Asset> {
    return this.assetsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: Asset): Promise<Asset> {
    return this.assetsRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.assetsRepository.delete(id);
  }
}
