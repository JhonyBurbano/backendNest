import { Inject, Injectable } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepositoryPort,
} from '../ports/transaction.repository.port';
import { UpdateTransactionStatusInputDto } from '../input/update-transaction-status-input.dto';
import { Transaction } from 'src/transactions/domain/entities/transaction.entity';

@Injectable()
export class UpdateTransactionStatusUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepositoryPort,
  ) {}

  async execute(input: UpdateTransactionStatusInputDto): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(
      input.transactionId,
    );

    if (!transaction) {
      throw new Error('Transacción no encontrada');
    }

    return await this.transactionRepository.updateStatus(
      input.transactionId,
      input.status,
      input.externalTransactionId,
    );
  }
}
