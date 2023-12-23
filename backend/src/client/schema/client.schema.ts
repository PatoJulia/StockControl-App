/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  name: string;

  @Prop()
  clientNumber: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
