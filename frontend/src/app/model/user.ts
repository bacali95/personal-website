import {Image} from './image';

export class User {
  _id?: string;
  username: string;
  password: string;
  image: Image;
  firstName: string;
  lastName: string;
  profession: string;
  intro: string;
  birthday: {
    date: Date;
    place: string;
  };
  nationality: string;
  maritalStatus: string;
  address: string;
  email: string;
  website: string;
  phone: string;
  skype: string;
}
