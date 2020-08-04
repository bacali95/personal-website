import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skill extends Document {
  @Prop({ required: true })
  name: string;

  @Prop(Number)
  value: number;

  @Prop(Number)
  rank: number;
}

export class SkillDTO {
  readonly _id: string;
  readonly name: string;
  readonly value: number;
  readonly rank: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
