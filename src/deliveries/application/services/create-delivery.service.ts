import { Injectable } from '@nestjs/common';
import { CreateDeliveryUseCase } from '../use-cases/create-delivery.use-case';
import { CreateDeliveryInputDto } from '../input/create-delivery-input.dto';
import { CreateDeliveryOutputDto } from '../output/create-delivery-output.dto';

@Injectable()
export class CreateDeliveryService {
  constructor(private readonly createDeliveryUseCase: CreateDeliveryUseCase) {}

  async execute(
    input: CreateDeliveryInputDto,
  ): Promise<CreateDeliveryOutputDto> {
    return this.createDeliveryUseCase.execute(input);
  }
}
