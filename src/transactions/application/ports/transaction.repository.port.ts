import { Transaction } from '../../domain/entities/transaction.entity';

export interface TransactionRepositoryPort {
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  create(transaction: Transaction): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
  updateStatus(
    id: string,
    status: string,
    externalTransactionId: string,
  ): Promise<Transaction>;
  delete(id: string): Promise<void>;
}

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');
