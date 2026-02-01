import { Body, Controller, Post } from '@nestjs/common';
import { CreateDeliveryService } from '../../application/services/create-delivery.service';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly createDeliveryService: CreateDeliveryService) {}

  @Post()
  async createDelivery(@Body() request: CreateDeliveryDto) {
    const delivery = await this.createDeliveryService.execute({
      customerId: request.customerId,
      address: request.address,
      city: request.city,
    });

    return {
      data: delivery,
      operation: 'DELIVERY_CREATED',
    };
  }
}
