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

  findOneByName(name: string) {
    return this.productModel.findOne({ name: name }).exec();
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

  async sellProduct(product: Product, quantity: number) {
    try {
      if (product.stock - quantity < 0) {
        throw new Error(
          'Quantity selected for selling product is higher than current stock',
        );
      } else {
        product.stock -= quantity;
        await this.productModel.updateOne(
          { _id: id },
          { stock: product.stock },
        );
      }
    } catch (error) {
      console.error('Error selling product:', error);
    }
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
