import { Category } from './category';

export class Project {
  id?: string;
  title: string;
  description: string;
  type: string;
  categories: Category[] = [];
  startDate: Date;
  endDate: Date;
  sourceCodeLink: string;
  demoLink: string;
  images: string[] = [];
  clicks: number = 0;
  rank: number;
}
