import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { TransactionModule } from './transactions/transaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentProviderModule } from './payment-provider/payment-provider.module';
import { CustomerModule } from './customers/customer.module';
import { DeliveryModule } from './deliveries/delivery.module';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    TransactionModule,
    HttpModule,
    PaymentProviderModule,
    CustomerModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
