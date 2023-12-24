import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schema/currency.schema';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
})
export class CurrencyModule {}
