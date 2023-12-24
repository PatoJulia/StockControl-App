/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  name: string;

  @Prop()
  clientNumber: number;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  email: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
