import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client, ClientSchema } from './schema/client.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
})
export class ClientModule {}
