import { Delivery } from '../../domain/entities/delivery.entity';

export interface DeliveryRepositoryPort {
  create(delivery: Delivery): Promise<Delivery>;
}

export const DELIVERY_REPOSITORY = Symbol('DELIVERY_REPOSITORY');
