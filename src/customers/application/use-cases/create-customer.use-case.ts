import { Inject, Injectable } from '@nestjs/common';
import {
  CustomerRepositoryPort,
  CUSTOMER_REPOSITORY,
} from '../ports/customer.repository.port';
import { CreateCustomerInputDto } from '../input/create-customer-input.dto';
import { CreateCustomerOutputDto } from '../output/create-customer-output.dto';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(
    input: CreateCustomerInputDto,
  ): Promise<CreateCustomerOutputDto> {
    // Check if customer already exists
    const existingCustomer = await this.customerRepository.findByEmail(
      input.email,
    );

    if (existingCustomer) {
      return {
        id: existingCustomer.getId(),
        email: existingCustomer.getEmail(),
        full_name: existingCustomer.getFullName(),
        createdAt: existingCustomer.getCreatedAt(),
      };
    }

    // Create new customer
    const customer = Customer.create({
      email: input.email,
      full_name: input.full_name,
    });

    const createdCustomer = await this.customerRepository.create(customer);

    return {
      id: createdCustomer.getId(),
      email: createdCustomer.getEmail(),
      full_name: createdCustomer.getFullName(),
      createdAt: createdCustomer.getCreatedAt(),
    };
  }
}
