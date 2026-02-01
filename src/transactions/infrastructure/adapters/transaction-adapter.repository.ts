import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionRepositoryPort } from 'src/transactions/application/ports/transaction.repository.port';
import { TransactionProduct } from 'src/transactions/domain/entities/transaction-product.entity';
import { Transaction as TransactionEntity } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionStatus } from 'src/transactions/domain/value-objects/transaction-status';
import { Money } from 'src/products/domain/value-objects/money.vo';
import { Currency } from 'src/products/domain/value-objects/currency';

@Injectable()
export class TransactionAdapterRepository implements TransactionRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TransactionEntity | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!transaction) {
      return null;
    }

    return this.mapToDomain(transaction);
  }

  async findAll(): Promise<TransactionEntity[]> {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        products: true,
      },
    });

    return transactions.map((t) => this.mapToDomain(t));
  }

  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    const created = await this.prisma.transaction.create({
      data: {
        status: transaction.getStatus(),
        customerId: transaction.getCustomerId(),
        deliveryId: transaction.getDeliveryId(),
        externalTransactionId: transaction.getExternalTransactionId(),
        subtotal: transaction.getSubtotal().getAmount(),
        baseFee: transaction.getBaseFee().getAmount(),
        deliveryFee: transaction.getDeliveryFee().getAmount(),
        totalAmount: transaction.getTotalAmount().getAmount(),
        currency: transaction.getTotalAmount().getCurrency(),
        products: {
          create: transaction.getProducts().map((p) => ({
            productId: p.getProductId(),
            quantity: p.getQuantity(),
            unitPrice: p.getUnitPrice().getAmount(),
            totalAmount: p.getTotalAmount(),
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return this.mapToDomain(created);
  }

  async update(transaction: TransactionEntity): Promise<TransactionEntity> {
    const updated = await this.prisma.transaction.update({
      where: { id: transaction.getId() },
      data: {
        status: transaction.getStatus(),
        deliveryId: transaction.getDeliveryId(),
        externalTransactionId: transaction.getExternalTransactionId(),
        updatedAt: new Date(),
      },
      include: {
        products: true,
      },
    });

    return this.mapToDomain(updated);
  }

  async updateStatus(
    id: string,
    status: string,
    externalTransactionId: string,
  ): Promise<TransactionEntity> {
    const updated = await this.prisma.transaction.update({
      where: { id },
      data: {
        status: status as any,
        externalTransactionId,
        updatedAt: new Date(),
      },
      include: {
        products: true,
      },
    });

    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaTransaction: any): TransactionEntity {
    const currency = prismaTransaction.currency as Currency;

    const products = prismaTransaction.products.map(
      (p: any) =>
        new TransactionProduct(
          p.id,
          p.productId,
          p.transactionId,
          p.quantity,
          Money.create(p.unitPrice, currency),
          p.totalAmount,
        ),
    );

    return new TransactionEntity(
      prismaTransaction.id,
      prismaTransaction.status as TransactionStatus,
      prismaTransaction.customerId,
      prismaTransaction.deliveryId,
      prismaTransaction.externalTransactionId,
      products,
      Money.create(prismaTransaction.subtotal, currency),
      Money.create(prismaTransaction.baseFee, currency),
      Money.create(prismaTransaction.deliveryFee, currency),
      Money.create(prismaTransaction.totalAmount, currency),
      prismaTransaction.createdAt,
      prismaTransaction.updatedAt,
    );
  }
}
