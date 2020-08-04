import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  profession: string;

  @Prop()
  intro: string;

  @Prop()
  birthdayDate: Date;

  @Prop()
  birthdayPlace: string;

  @Prop()
  nationality: string;

  @Prop()
  maritalStatus: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  phone: string;

  @Prop()
  skype: string;

  @Prop()
  imageURL: string;
}

export class ProfileDTO {
  readonly _id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly profession: string;
  readonly intro: string;
  readonly birthdayDate: Date;
  readonly birthdayPlace: string;
  readonly nationality: string;
  readonly maritalStatus: string;
  readonly address: string;
  readonly email: string;
  readonly website: string;
  readonly phone: string;
  readonly skype: string;
  readonly imageURL: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
