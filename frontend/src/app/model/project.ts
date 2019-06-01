import {Category} from './category';
import {Image} from './image';

export class Project {
  _id?: string;
  title: string;
  description: string;
  type: string;
  categories: Category[];
  startDate: Date;
  endDate: Date;
  githubLink: string;
  images: Image[];
}
