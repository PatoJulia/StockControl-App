import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const createdProduct = this.productModel.create({
      ...createProductDto,
      currency: createProductDto.currencyId,
    });
    return createdProduct.then((doc) => doc.populate(['currency']));
  }

  findAll() {
    return this.productModel.find().populate('currency').exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: CreateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  updateStock(id: string, newStock: number) {
    return this.productModel
      .findByIdAndUpdate(id, { stock: newStock }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
