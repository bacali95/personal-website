import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Education extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  details: string;

  @Prop()
  period: string;

  @Prop(Number)
  rank: number;
}

export interface EducationDTO {
  readonly _id: string;
  readonly name: string;
  readonly details: string;
  readonly period: string;
  readonly rank: number;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
