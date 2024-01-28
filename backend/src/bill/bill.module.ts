import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schema/bill.schema';
import { ClientModule } from 'src/client/client.module';
import { ProductModule } from 'src/product/product.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { Client, ClientSchema } from 'src/client/schema/client.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { Currency, CurrencySchema } from 'src/currency/schema/currency.schema';

@Module({
  controllers: [BillController],
  providers: [BillService],
  imports: [
    MongooseModule.forFeature([
      { name: Bill.name, schema: BillSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
})
export class BillModule {}
