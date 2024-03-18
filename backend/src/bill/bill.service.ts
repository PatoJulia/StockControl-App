import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './schema/bill.schema';
import { Client } from 'src/client/schema/client.schema';
import { Currency } from 'src/currency/schema/currency.schema';
import { Product } from 'src/product/schema/product.schema';
import { ProductService } from 'src/product/product.service';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<Bill>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Currency.name) private currencyModel: Model<Currency>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private productService: ProductService,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const client = await this.clientModel.findOne({
      name: createBillDto.clientName,
    });
    /*
    const currency = await this.currencyModel.findOne({
      code: createBillDto.currencyCode,
    });*/
    const foundProducts = [];
    for (const product of createBillDto.products) {
      const foundProduct: Product = await this.productModel.findOne({
        name: product.name,
      });
      foundProducts.push(foundProduct);

      this.productService.sellProduct(foundProduct, product.quantity);
    }

    return this.billModel
      .create({
        ...createBillDto,
        client: client._id, // Assuming client has an '_id' field
        products: foundProducts.map((product) => product._id), // Assuming products has an '_id' field
      })
      .then((bill) => bill.populate(['currency', 'client', 'products']));
  }

  findAll() {
    return this.billModel
      .find()
      .populate(['currency', 'client', 'products'])
      .exec();
  }

  findOne(id: string) {
    return this.billModel
      .findById(id)
      .populate(['currency', 'client', 'products'])
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
      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;
  
        if (pageNumber > 1) {
          doc.text('encabezado de pagina');
        }
        
        const bottom = doc.page.margings.bottom;

        doc.page.margins.bottom = 0;
        doc.font('Helvetica').fontSize(14);
        doc.text(
          'Pág. ' + pageNumber,
          0.5 * (doc.page.width - 100),
          doc.page.height - 50,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          })
        doc.page.margins.bottom = bottom;
      })

      doc.text('PDF generated in the server');
      doc.moveDown();
      doc.text('this is an example text for a bill with id: ' + id);
      doc.text(
        "To continue let's follow https://www.youtube.com/watch?v=gdSw3clMZ0E",
      );
      doc.text('Client information:_' + JSON.stringify(bill.client));
      doc.text('Currency information:_' + JSON.stringify(bill.currency));
      doc.text('Product List:_' + JSON.stringify(bill.products));
      
      const row_Bills = [];

      /*bill.forEach((element) => {
        const tempList = [element.descripcion, element.discount, element.total]
        row_Bills.push(tempList);
      });*/
      doc.addPage();
      const table = {
        title: 'Tabla ejemplo',
        subtitle: 'Esta es una tabla de ejemplo',
        headers: [
          //'codigo',
          //'cantidad',
          'descripcion',
          //'unidades',
          'dec',
          'total'
        ],
        rows:row_Bills,
      };

      doc.table(table, {
        columnsSize: [150, 350, 100],
      });

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
