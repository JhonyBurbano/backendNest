import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionInputDto } from 'src/payment-provider/application/input/create-payment-transaction-input.dto';
import { PaymentTransactionRequestDto } from '../dto/payment-transaction-request.dto';

@Injectable()
export class PaymentTransactionRequestMapper {
  toRequest(
    input: CreatePaymentTransactionInputDto,
  ): PaymentTransactionRequestDto {
    return {
      acceptance_token: input.acceptance_token,
      accept_personal_auth: input.accept_personal_auth,
      amount_in_cents: input.amount_in_cents,
      currency: input.currency,
      customer_email: input.customer_email,
      reference: input.reference,
      signature: input.signature,
      payment_method: {
        type: input.payment_method.type,
        token: input.payment_method.token,
        installments: input.payment_method.installments,
      },
    };
  }
}
