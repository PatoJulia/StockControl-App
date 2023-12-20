import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class BillService {
  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }

  async generatePdf(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
      });

      doc.text('PDF generated in the server');
      doc.moveDown();
      doc.text('this is an example text');
      doc.text(
        "To continue let's follow https://www.youtube.com/watch?v=gdSw3clMZ0E",
      );

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
