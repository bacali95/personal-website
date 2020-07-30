import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { getRepository } from 'fireorm';
import { AssetsRepository } from './assets.repository';
import { Asset } from './assets.model';

@Module({
  controllers: [AssetsController],
  providers: [
    {
      provide: AssetsRepository,
      useFactory: () => getRepository<Asset>(Asset) as AssetsRepository,
    },
  ],
  exports: [AssetsRepository],
})
export class AssetsModule {}
