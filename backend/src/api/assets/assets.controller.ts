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
import { Asset, AssetDTO } from './assets.schema';

@Controller()
export class AssetsController {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  @Get()
  async getAll(): Promise<Asset[]> {
    return (await this.assetsRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
  }

  @Post()
  create(@Body() asset: AssetDTO): Promise<Asset> {
    return this.assetsRepository.create(asset);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Asset> {
    return this.assetsRepository.findById(id);
  }

  @Put(':id')
  update(@Body() asset: AssetDTO): Promise<Asset> {
    return this.assetsRepository.update(asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.assetsRepository.delete(id);
  }
}
