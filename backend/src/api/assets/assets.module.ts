import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsRepository } from './assets.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './assets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
  ],
  controllers: [AssetsController],
  providers: [AssetsRepository],
  exports: [AssetsRepository],
})
export class AssetsModule {}
