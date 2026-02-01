import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateTransactionService } from 'src/transactions/application/services/create-transaction.service';
import { UpdateTransactionStatusService } from 'src/transactions/application/services/update-transaction-status.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from '../dto/update-transaction-status.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly updateTransactionStatusService: UpdateTransactionStatusService,
  ) {}

  @Post()
  async createTransaction(@Body() request: CreateTransactionDto) {
    const transaction = await this.createTransactionService.execute(request);

    return {
      data: transaction,
      operation: 'TRANSACTION_CREATED',
    };
  }

  @Patch(':id/status')
  async updateTransactionStatus(
    @Param('id') id: string,
    @Body() request: UpdateTransactionStatusDto,
  ) {
    const transaction = await this.updateTransactionStatusService.execute({
      transactionId: id,
      status: request.status,
      externalTransactionId: request.externalTransactionId,
    });

    return {
      data: transaction,
      operation: 'TRANSACTION_STATUS_UPDATED',
    };
  }
}
