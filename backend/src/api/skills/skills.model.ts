import { Collection } from 'fireorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Collection()
export class Skill {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  value: number;

  @IsNumber()
  rank: number;
}
