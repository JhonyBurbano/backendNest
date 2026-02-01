import { Injectable } from '@nestjs/common';
import { UpdateTransactionStatusUseCase } from '../use-cases/update-transaction-status.use-case';
import { UpdateTransactionStatusOutputDto } from '../output/update-transaction-status-output.dto';
import { UpdateTransactionStatusInputDto } from '../input/update-transaction-status-input.dto';

@Injectable()
export class UpdateTransactionStatusService {
  constructor(private readonly useCase: UpdateTransactionStatusUseCase) {}

  async execute(
    input: UpdateTransactionStatusInputDto,
  ): Promise<UpdateTransactionStatusOutputDto> {
    const transaction = await this.useCase.execute(input);

    return {
      id: transaction.getId(),
      status: transaction.getStatus(),
      externalTransactionId: transaction.getExternalTransactionId(),
      updatedAt: transaction.getUpdatedAt(),
    };
  }
}
