import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schema/client.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}
  create(createClientDto: CreateClientDto) {
    return this.clientModel.create(createClientDto);
  }

  findAll() {
    return this.clientModel.find().exec();
  }

  findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  update(id: string, updateClientDto: CreateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
