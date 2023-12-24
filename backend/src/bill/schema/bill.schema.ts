/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Product } from 'src/product/schema/product.schema';

export type BillDocument = HydratedDocument<Bill>;

@Schema({ timestamps: true })
export class Bill {
  @Prop()
  description: string;

  @Prop()
  discount: number;

  @Prop()
  total: number;

  @Prop()
  dateOfIssue: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Currency' })
  currency: Currency;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Product' })
  productList: Product[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
