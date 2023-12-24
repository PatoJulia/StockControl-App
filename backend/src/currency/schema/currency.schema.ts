/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CurrencyDocument = HydratedDocument<Currency>;

@Schema({ timestamps: true })
export class Currency {
  @Prop()
  code: string;

  @Prop()
  symbol: string;

  // TO DO: We won't use Country as a Prop, update the drawio
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
