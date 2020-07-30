import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Asset } from './assets.model';

@Injectable()
@CustomRepository(Asset)
export class AssetsRepository extends BaseFirestoreRepository<Asset> {}
