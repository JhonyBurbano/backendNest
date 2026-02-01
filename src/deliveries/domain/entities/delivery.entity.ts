export class Delivery {
  constructor(
    private readonly id: string | null,
    private readonly customerId: string,
    private readonly address: string,
    private readonly city: string,
    private readonly createdAt: Date = new Date(),
    private readonly updatedAt: Date = new Date(),
  ) {}

  static create(params: {
    customerId: string;
    address: string;
    city: string;
  }): Delivery {
    if (!params.customerId?.trim()) {
      throw new Error('Customer ID is required');
    }

    if (!params.address?.trim()) {
      throw new Error('Address is required');
    }

    if (!params.city?.trim()) {
      throw new Error('City is required');
    }

    return new Delivery(
      null,
      params.customerId.trim(),
      params.address.trim(),
      params.city.trim(),
    );
  }

  getId(): string | null {
    return this.id;
  }

  getCustomerId(): string {
    return this.customerId;
  }

  getAddress(): string {
    return this.address;
  }

  getCity(): string {
    return this.city;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
