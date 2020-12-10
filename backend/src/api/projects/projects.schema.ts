import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  type: string;

  @Prop()
  categories: string[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  sourceCodeLink: string;

  @Prop()
  demoLink: string;

  @Prop()
  images: string[];

  @Prop(Number)
  clicks: number;
}

export class ProjectDTO {
  _id: string;
  title: string;
  description: string;
  type: string;
  categories: string[];
  startDate: Date;
  endDate: Date;
  sourceCodeLink: string;
  demoLink: string;
  images: string[];
  clicks: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
