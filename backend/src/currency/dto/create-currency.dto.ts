import { IsString } from 'class-validator';
export class CreateCurrencyDto {
  @IsString()
  code: string;

  @IsString()
  symbol: string;
}
