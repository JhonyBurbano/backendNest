import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNumber()
  installments: number;
}

export class CreatePaymentTransactionDto {
  @IsString()
  @IsNotEmpty()
  acceptance_token: string;

  @IsString()
  @IsNotEmpty()
  accept_personal_auth: string;

  @IsNumber()
  amount_in_cents: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsEmail()
  @IsNotEmpty()
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PaymentMethodDto)
  payment_method: PaymentMethodDto;
}
