import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schema/bill.schema';

@Module({
  controllers: [BillController],
  providers: [BillService],
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
})
export class BillModule {}
