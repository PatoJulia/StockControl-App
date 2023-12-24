import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Currency } from './schema/currency.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private clientModel: Model<Currency>,
  ) {}
  create(createCurrencyDto: CreateCurrencyDto) {
    return this.clientModel.create(createCurrencyDto);
  }

  findAll() {
    return this.clientModel.find().exec();
  }

  findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  update(id: string, updateCurrencyDto: CreateCurrencyDto) {
    return this.clientModel.findByIdAndUpdate(id, updateCurrencyDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
