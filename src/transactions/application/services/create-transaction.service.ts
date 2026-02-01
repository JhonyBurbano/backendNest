import { Injectable } from '@nestjs/common';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { CreateTransactionOutputDto } from '../output/create-transaction-output.dto';
import { CreateTransactionInputDto } from '../input/create-transaction-input.dto';

@Injectable()
export class CreateTransactionService {
  constructor(private readonly useCase: CreateTransactionUseCase) {}

  async execute(
    input: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    const transaction = await this.useCase.execute(input);

    return {
      id: transaction.getId(),
      status: transaction.getStatus(),
      customerId: transaction.getCustomerId(),
      deliveryId: transaction.getDeliveryId(),
      externalTransactionId: transaction.getExternalTransactionId(),
      subtotal: transaction.getSubtotal().getAmount(),
      baseFee: transaction.getBaseFee().getAmount(),
      deliveryFee: transaction.getDeliveryFee().getAmount(),
      totalAmount: transaction.getTotalAmount().getAmount(),
      currency: transaction.getTotalAmount().getCurrency(),
      products: transaction.getProducts().map((p) => ({
        productId: p.getProductId(),
        quantity: p.getQuantity(),
        unitPrice: p.getUnitPrice().getAmount(),
        totalAmount: p.getTotalAmount(),
      })),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
    };
  }
}
