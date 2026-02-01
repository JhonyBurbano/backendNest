export interface CreateTransactionInputDto {
  customerId: string;
  deliveryId?: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  baseFee: number;
  deliveryFee: number;
  currency: string;
}
