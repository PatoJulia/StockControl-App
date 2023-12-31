import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: CreateBillDto) {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }

  @Get(':id/pdf')
  async getPdf(@Param('id') id: string, @Res() res): Promise<void> {
    const buffer = await this.billService.generatePdf(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename-exampke.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
