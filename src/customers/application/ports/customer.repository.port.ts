import { Customer } from '../../domain/entities/customer.entity';

export interface CustomerRepositoryPort {
  findByEmail(email: string): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
}

export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');
