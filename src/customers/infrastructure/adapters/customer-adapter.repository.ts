import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerRepositoryPort } from '../../application/ports/customer.repository.port';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerAdapterRepository implements CustomerRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Customer | null> {
    const prismaCustomer = await this.prisma.customer.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!prismaCustomer) {
      return null;
    }

    return new Customer(
      prismaCustomer.id,
      prismaCustomer.email,
      prismaCustomer.full_name,
      prismaCustomer.createdAt,
    );
  }

  async create(customer: Customer): Promise<Customer> {
    const created = await this.prisma.customer.create({
      data: {
        email: customer.getEmail(),
        full_name: customer.getFullName(),
      },
    });

    return new Customer(
      created.id,
      created.email,
      created.full_name,
      created.createdAt,
    );
  }
}
