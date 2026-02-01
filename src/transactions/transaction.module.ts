import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from 'src/products/product.module';
import { TRANSACTION_REPOSITORY } from './application/ports/transaction.repository.port';
import { TransactionAdapterRepository } from './infrastructure/adapters/transaction-adapter.repository';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { UpdateTransactionStatusUseCase } from './application/use-cases/update-transaction-status.use-case';
import { CreateTransactionService } from './application/services/create-transaction.service';
import { UpdateTransactionStatusService } from './application/services/update-transaction-status.service';
import { TransactionController } from './infrastructure/controllers/transaction.controller';

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [
    CreateTransactionUseCase,
    UpdateTransactionStatusUseCase,
    CreateTransactionService,
    UpdateTransactionStatusService,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionAdapterRepository,
    },
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
