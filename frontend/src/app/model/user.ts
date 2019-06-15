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
  principal: {
    address: string;
    email: string;
    website: string;
    phone: string;
  };
  secondary: {
    address: string;
    email: string;
    website: string;
    phone: string;
  };
  skype: string;
}
