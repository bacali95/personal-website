import {Category} from './category';

export class Project {
  _id?: string;
  title: string;
  description: string;
  type: string;
  categories: Category[];
  startDate: Date;
  endDate: Date;
  githubLink: string;
  images: any[];
}
