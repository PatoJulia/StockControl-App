import { IsInt, IsNumber, IsString, Min } from 'class-validator';
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

  @IsString()
  currencyId: string | null;
}
