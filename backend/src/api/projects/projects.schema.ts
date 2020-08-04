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
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly type: string;
  readonly categories: string[];
  readonly startDate: Date;
  readonly endDate: Date;
  readonly sourceCodeLink: string;
  readonly demoLink: string;
  readonly images: string[];
  readonly clicks: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
