import { Inject, Injectable } from '@nestjs/common';
import {
  DeliveryRepositoryPort,
  DELIVERY_REPOSITORY,
} from '../ports/delivery.repository.port';
import { CreateDeliveryInputDto } from '../input/create-delivery-input.dto';
import { CreateDeliveryOutputDto } from '../output/create-delivery-output.dto';
import { Delivery } from '../../domain/entities/delivery.entity';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly deliveryRepository: DeliveryRepositoryPort,
  ) {}

  async execute(
    input: CreateDeliveryInputDto,
  ): Promise<CreateDeliveryOutputDto> {
    const delivery = Delivery.create({
      customerId: input.customerId,
      address: input.address,
      city: input.city,
    });

    const createdDelivery = await this.deliveryRepository.create(delivery);

    return {
      id: createdDelivery.getId(),
      customerId: createdDelivery.getCustomerId(),
      address: createdDelivery.getAddress(),
      city: createdDelivery.getCity(),
      createdAt: createdDelivery.getCreatedAt(),
      updatedAt: createdDelivery.getUpdatedAt(),
    };
  }
}
