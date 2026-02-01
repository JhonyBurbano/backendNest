import { Module } from '@nestjs/common';
import { CustomerController } from './infrastructure/controllers/customer.controller';
import { CreateCustomerService } from './application/services/create-customer.service';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.use-case';
import { CustomerAdapterRepository } from './infrastructure/adapters/customer-adapter.repository';
import { CUSTOMER_REPOSITORY } from './application/ports/customer.repository.port';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController],
  providers: [
    CreateCustomerService,
    CreateCustomerUseCase,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerAdapterRepository,
    },
  ],
  exports: [CUSTOMER_REPOSITORY],
})
export class CustomerModule {}
