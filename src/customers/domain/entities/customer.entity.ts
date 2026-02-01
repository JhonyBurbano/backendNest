export class Customer {
  constructor(
    private readonly id: string | null,
    private readonly email: string,
    private readonly full_name: string,
    private readonly createdAt: Date = new Date(),
  ) {}

  static create(params: { email: string; full_name: string }): Customer {
    if (!params.email?.trim()) {
      throw new Error('Email is required');
    }

    if (!params.full_name?.trim()) {
      throw new Error('Full name is required');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      throw new Error('Invalid email format');
    }

    return new Customer(
      null,
      params.email.toLowerCase().trim(),
      params.full_name.trim(),
    );
  }

  getId(): string | null {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getFullName(): string {
    return this.full_name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
