import { Collection } from 'fireorm';
import { IsNotEmpty } from 'class-validator';

@Collection()
export class Asset {
  id: string;

  @IsNotEmpty()
  name: string;
}
