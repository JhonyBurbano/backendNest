import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerService } from '../../application/services/create-customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  async createCustomer(@Body() request: CreateCustomerDto) {
    const customer = await this.createCustomerService.execute({
      email: request.email,
      full_name: request.full_name,
    });

    return {
      data: customer,
      operation: 'CUSTOMER_CREATED',
    };
  }
}
