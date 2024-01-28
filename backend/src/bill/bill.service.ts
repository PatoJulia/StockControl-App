import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './schema/bill.schema';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Product } from 'src/product/schema/product.schema';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<Bill>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Currency.name) private currencyModel: Model<Currency>,
    @InjectModel(Product.name) private producttModel: Model<Product>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const client = await this.clientModel.findOne({
      name: createBillDto.clientName,
    });
    /*
    const currency = await this.currencyModel.findOne({
      code: createBillDto.currencyCode,
    });*/
    const productList = await this.producttModel.find({
      name: { $in: createBillDto.productListNames },
    });

    return this.billModel
      .create({
        ...createBillDto,
        client: client._id, // Assuming client has an '_id' field
        productList: productList.map((product) => product._id), // Assuming productList has an '_id' field
      })
      .then((bill) => bill.populate(['currency', 'client', 'productList']));
  }

  findAll() {
    return this.billModel
      .find()
      .populate(['currency', 'client', 'productList'])
      .exec();
  }

  findOne(id: string) {
    return this.billModel
      .findById(id)
      .populate(['currency', 'client', 'productList'])
      .exec();
  }

  update(id: string, updateBillDto: CreateBillDto) {
    return this.billModel
      .findByIdAndUpdate(id, updateBillDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.billModel.findByIdAndDelete(id).exec();
  }

  async generatePdf(id: string): Promise<Buffer> {
    const bill: Bill = await this.findOne(id);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
      });

      doc.text('PDF generated in the server');
      doc.moveDown();
      doc.text('this is an example text for a bill with id: ' + id);
      doc.text(
        "To continue let's follow https://www.youtube.com/watch?v=gdSw3clMZ0E",
      );
      doc.text('Client information:_' + JSON.stringify(bill.client));
      doc.text('Currency information:_' + JSON.stringify(bill.currency));
      doc.text('Product List:_' + JSON.stringify(bill.productList));

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}
