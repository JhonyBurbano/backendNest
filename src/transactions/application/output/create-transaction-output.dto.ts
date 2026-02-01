export interface CreateTransactionOutputDto {
  id: string;
  status: string;
  customerId: string;
  deliveryId: string | null;
  externalTransactionId: string;
  subtotal: number;
  baseFee: number;
  deliveryFee: number;
  totalAmount: number;
  currency: string;
  products: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
