import { Injectable } from '@nestjs/common';
import { CreateCustomerUseCase } from '../use-cases/create-customer.use-case';
import { CreateCustomerInputDto } from '../input/create-customer-input.dto';
import { CreateCustomerOutputDto } from '../output/create-customer-output.dto';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  async execute(
    input: CreateCustomerInputDto,
  ): Promise<CreateCustomerOutputDto> {
    return this.createCustomerUseCase.execute(input);
  }
}
