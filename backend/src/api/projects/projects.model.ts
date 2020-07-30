import { Collection } from 'fireorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Collection()
export class Project {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  type: string;

  categories: string[];

  startDate: Date;

  endDate: Date;

  sourceCodeLink: string;

  demoLink: string;

  images: string[];

  @IsNumber()
  clicks: number;
}
