import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { Currency } from 'src/currency/schema/currency.schema';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  productCode: string;

  @IsString()
  description: string;

  @IsString()
  brand: string;

  @IsString()
  imageUrl: string;

  @IsInt()
  @Min(0)
  stock: number;

  @Min(0)
  @IsNumber()
  price: number;

  currencyId: Currency;
}
