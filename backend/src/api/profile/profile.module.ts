import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { getRepository } from 'fireorm';
import { Profile } from './profile.model';

@Module({
  controllers: [ProfileController],
  providers: [
    {
      provide: ProfileRepository,
      useFactory: () => getRepository<Profile>(Profile) as ProfileRepository,
    },
  ],
  exports: [ProfileRepository],
})
export class ProfileModule {}
