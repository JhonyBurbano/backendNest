import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TransactionStatus } from 'src/transactions/domain/value-objects/transaction-status';

export class UpdateTransactionStatusDto {
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  @IsString()
  externalTransactionId: string;
}
