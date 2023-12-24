import { IsString, IsEmail, IsNumber } from 'class-validator';
export class CreateClientDto {
  @IsString()
  name: string;

  @IsNumber()
  clientNumber: number;

  @IsString()
  address: string;

  @IsNumber()
  phoneNumber: number;

  @IsEmail()
  email: string;
}
