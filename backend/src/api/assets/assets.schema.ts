import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Asset extends Document {
  @Prop({ required: true })
  name: string;
}

export interface AssetDTO {
  readonly _id: string;
  readonly name: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
