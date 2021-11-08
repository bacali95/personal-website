import { IconType } from 'react-icons';

export type Social = {
  Icon: IconType;
  name: string;
  link: string;
};

export type Asset = string;

export type Category = string;

export type Skill = {
  name: string;
  level: number;
};

export type Language = {
  name: string;
  level: string;
};

export type Hobby = {
  Icon: IconType;
  name: string;
};

export type Education = {
  name: string;
  detail?: string;
  period: string;
};

export type Project = {
  title: string;
  description: string;
  type: string;
  categories: Category[];
  startDate: Date;
  endDate: Date;
  sourceCodeLink: string;
  demoLink: string;
  images: string[];
};

export type Profile = {
  firstName: string;
  lastName: string;
  image: string;
  profession: string;
  intro: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  maritalStatus: string;
  address: string;
  email: string;
  website: string;
  phone: string;
};
