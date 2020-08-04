import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { EducationsRepository } from './educations.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './educations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Education.name, schema: EducationSchema },
    ]),
  ],
  controllers: [EducationsController],
  providers: [EducationsRepository],
  exports: [EducationsRepository],
})
export class EducationsModule {}
