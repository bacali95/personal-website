import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;
}

export interface CategoryDTO {
  readonly _id: string;
  readonly name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
