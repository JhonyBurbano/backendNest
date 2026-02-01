export interface UpdateTransactionStatusOutputDto {
  id: string;
  status: string;
  externalTransactionId: string;
  updatedAt: Date;
}
