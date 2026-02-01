import { Module } from '@nestjs/common';
import { DeliveryController } from './infrastructure/controllers/delivery.controller';
import { CreateDeliveryService } from './application/services/create-delivery.service';
import { CreateDeliveryUseCase } from './application/use-cases/create-delivery.use-case';
import { DeliveryAdapterRepository } from './infrastructure/adapters/delivery-adapter.repository';
import { DELIVERY_REPOSITORY } from './application/ports/delivery.repository.port';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveryController],
  providers: [
    CreateDeliveryService,
    CreateDeliveryUseCase,
    {
      provide: DELIVERY_REPOSITORY,
      useClass: DeliveryAdapterRepository,
    },
  ],
  exports: [DELIVERY_REPOSITORY],
})
export class DeliveryModule {}
