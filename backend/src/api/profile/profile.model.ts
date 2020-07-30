import { Collection } from 'fireorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Collection()
export class Profile {
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  profession: string;

  intro: string;

  birthdayDate: Date;

  birthdayPlace: string;

  nationality: string;

  maritalStatus: string;

  address: string;

  @IsEmail()
  email: string;

  website: string;

  phone: string;

  skype: string;

  imageURL: string;
}
