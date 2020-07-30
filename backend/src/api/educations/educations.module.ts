import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { getRepository } from 'fireorm';
import { EducationsRepository } from './educations.repository';
import { Education } from './educations.model';

@Module({
  controllers: [EducationsController],
  providers: [
    {
      provide: EducationsRepository,
      useFactory: () =>
        getRepository<Education>(Education) as EducationsRepository,
    },
  ],
  exports: [EducationsRepository],
})
export class EducationsModule {}
