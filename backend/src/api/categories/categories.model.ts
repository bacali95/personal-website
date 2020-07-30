import { Collection } from 'fireorm';
import { IsNotEmpty } from 'class-validator';

@Collection()
export class Category {
  id: string;

  @IsNotEmpty()
  name: string;
}
