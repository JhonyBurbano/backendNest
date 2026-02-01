import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeliveryRepositoryPort } from '../../application/ports/delivery.repository.port';
import { Delivery } from '../../domain/entities/delivery.entity';

@Injectable()
export class DeliveryAdapterRepository implements DeliveryRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(delivery: Delivery): Promise<Delivery> {
    const created = await this.prisma.delivery.create({
      data: {
        customerId: delivery.getCustomerId(),
        address: delivery.getAddress(),
        city: delivery.getCity(),
      },
    });

    return new Delivery(
      created.id,
      created.customerId,
      created.address,
      created.city,
      created.createdAt,
      created.updatedAt,
    );
  }
}
