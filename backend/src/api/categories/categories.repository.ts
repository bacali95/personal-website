import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Category } from './categories.model';

@Injectable()
@CustomRepository(Category)
export class CategoriesRepository extends BaseFirestoreRepository<Category> {}
