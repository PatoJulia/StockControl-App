import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { BillModule } from './bill/bill.module';
import { CurrencyModule } from './currency/currency.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://new-user:mXf8yQjEp9CSVPLh@cluster0.uhhw1c8.mongodb.net/stock-control?retryWrites=true&w=majority',
    ),
    ProductModule,
    ClientModule,
    BillModule,
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
