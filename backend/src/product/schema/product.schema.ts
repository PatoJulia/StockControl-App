/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Currency } from 'src/currency/schema/currency.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  _id: string;
  @Prop()
  name: string;

  @Prop()
  productCode: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  imageUrl: string;

  @Prop()
  stock: number;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Currency' })
  currency: Currency;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
