import {
  IsNumber,
  IsString,
  Min,
  IsDate,
  IsPositive,
  Max,
  IsNotEmpty,
} from 'class-validator';
export class CreateBillDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(100)
  discount: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  total: number;

  @IsDate()
  dateOfIssue: Date;

  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  products: { name: string; quantity: number }[];
}
