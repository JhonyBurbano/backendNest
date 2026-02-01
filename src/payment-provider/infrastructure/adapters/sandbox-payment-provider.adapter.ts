import { Injectable } from '@nestjs/common';
import { CreateCardTokenInputDto } from 'src/payment-provider/application/input/create-card-token-input.dto';
import { CardTokenOutputDto } from 'src/payment-provider/application/output/card-token-output.dto';
import { PaymentProviderPort } from 'src/payment-provider/application/ports/payment-provider.port';
import { HttpService } from '@nestjs/axios';
import {
  CardTokenMapper,
  CardTokenResponseDto,
} from '../mappers/card-token.mapper';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentTransactionInputDto } from 'src/payment-provider/application/input/create-payment-transaction-input.dto';
import { PaymentTransactionOutputDto } from 'src/payment-provider/application/output/payment-transaction-output.dto';
import { PaymentTransactionRequestMapper } from '../mappers/payment-transaction-request.mapper';
import { PaymentTransactionResponseMapper } from '../mappers/payment-transaction-responde.mapper';
import { PaymentTransactionResponseDto } from '../dto/payment-transaction-response.dto';

@Injectable()
export class SandboxPaymentProviderAdapter implements PaymentProviderPort {
  private readonly baseUrl: string;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly cardTokenMapper: CardTokenMapper,
    private readonly paymentTransactionRequestMapper: PaymentTransactionRequestMapper,
    private readonly paymentTransactionResponseMapper: PaymentTransactionResponseMapper,
  ) {
    this.baseUrl = process.env.PAYMENT_PROVIDER_BASE_URL ?? '';
    this.publicKey = process.env.PAYMENT_PROVIDER_PUBLIC_KEY ?? '';
    this.privateKey = process.env.PAYMENT_PROVIDER_PRIVATE_KEY ?? '';
  }

  async createCardToken(
    data: CreateCardTokenInputDto,
  ): Promise<CardTokenOutputDto> {
    const request = this.cardTokenMapper.toRequest(data);

    const response = await firstValueFrom(
      this.httpService.post<CardTokenResponseDto>(
        `${this.baseUrl}/tokens/cards`,
        request,
        {
          headers: {
            Authorization: `Bearer ${this.publicKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const apiResponse = response.data;

    return this.cardTokenMapper.toOutput(apiResponse);
  }

  async createPaymentTransaction(
    data: CreatePaymentTransactionInputDto,
  ): Promise<PaymentTransactionOutputDto> {
    const request = this.paymentTransactionRequestMapper.toRequest(data);

    const response = await firstValueFrom(
      this.httpService.post<PaymentTransactionResponseDto>(
        `${this.baseUrl}/transactions`,
        request,
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const apiResponse = response.data;

    return this.paymentTransactionResponseMapper.toPaymentTransactionOutput(
      apiResponse,
    );
  }

  async getTransactionById(
    transactionId: string,
  ): Promise<PaymentTransactionOutputDto> {
    const response = await firstValueFrom(
      this.httpService.get<PaymentTransactionResponseDto>(
        `${this.baseUrl}/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const apiResponse = response.data;

    return this.paymentTransactionResponseMapper.toPaymentTransactionOutput(
      apiResponse,
    );
  }
}
