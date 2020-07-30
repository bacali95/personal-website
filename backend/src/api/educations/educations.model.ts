import { Collection } from 'fireorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Collection()
export class Education {
  id: string;

  @IsNotEmpty()
  name: string;

  details: string;

  period: string;

  @IsNumber()
  rank: number;
}
