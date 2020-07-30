import { Injectable } from '@nestjs/common';
import { BaseFirestoreRepository, CustomRepository } from 'fireorm';
import { Profile } from './profile.model';

@Injectable()
@CustomRepository(Profile)
export class ProfileRepository extends BaseFirestoreRepository<Profile> {}
