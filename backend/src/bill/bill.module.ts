import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schema/bill.schema';
import { Client, ClientSchema } from 'src/client/schema/client.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { Currency, CurrencySchema } from 'src/currency/schema/currency.schema';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [BillController],
  providers: [BillService, ProductService],
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
