import { Inject, Injectable } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepositoryPort,
} from '../ports/transaction.repository.port';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from 'src/products/application/ports/product.repository.port';
import { CreateTransactionInputDto } from '../input/create-transaction-input.dto';
import { Transaction } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionProduct } from 'src/transactions/domain/entities/transaction-product.entity';
import { Money } from 'src/products/domain/value-objects/money.vo';
import { Currency } from 'src/products/domain/value-objects/currency';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepositoryPort,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(input: CreateTransactionInputDto): Promise<Transaction> {
    const currency = input.currency as Currency;

    const transactionProducts: TransactionProduct[] = [];

    for (const productInput of input.products) {
      const product = await this.productRepository.findById(
        productInput.productId,
      );

      if (!product) {
        throw new Error(
          `Producto con id ${productInput.productId} no encontrado`,
        );
      }

      const unitPrice = product.getPrice();
      const totalAmount = unitPrice.getAmount() * productInput.quantity;

      const transactionProduct = TransactionProduct.create({
        productId: productInput.productId,
        transactionId: '',
        quantity: productInput.quantity,
        unitPrice: unitPrice,
        totalAmount: totalAmount,
      });

      transactionProducts.push(transactionProduct);
    }

    const baseFee = Money.create(input.baseFee, currency);
    const deliveryFee = Money.create(input.deliveryFee, currency);

    const transaction = Transaction.create({
      customerId: input.customerId,
      deliveryId: input.deliveryId ?? null,
      externalTransactionId: '',
      products: transactionProducts,
      baseFee: baseFee,
      deliveryFee: deliveryFee,
    });

    return await this.transactionRepository.create(transaction);
  }
}
