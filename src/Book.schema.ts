import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookDocument extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  date: Date;
}

export const BookSchema = SchemaFactory.createForClass(BookDocument);
