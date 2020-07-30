import { Body, Controller, Get, Put } from '@nestjs/common';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';

@Controller()
export class ProfileController {
  constructor(private readonly profileRepository: ProfileRepository) {}

  @Get()
  get(): Promise<Profile> {
    return this.profileRepository.findOne();
  }

  @Put()
  update(@Body() profile: Profile): Promise<Profile> {
    return this.profileRepository.update(profile);
  }
}
