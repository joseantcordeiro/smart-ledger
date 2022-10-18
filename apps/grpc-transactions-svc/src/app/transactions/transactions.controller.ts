import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { TRANSACTIONS_SERVICE_NAME, CreateBatchResponse } from './transactions.pb';
import { CreateBatchRequestDto, CreateDepositRequestDto, CreateWithdrawalRequestDto } from './transactions.dto';

@Controller()
export class TransactionsController {
  @Inject(TransactionsService)
  private readonly service: TransactionsService;

	@GrpcMethod(TRANSACTIONS_SERVICE_NAME, 'CreateBatch')
  private createBatch(payload: CreateBatchRequestDto): Promise<CreateBatchResponse> {
    return this.service.createBatch(payload);
  }

	@GrpcMethod(TRANSACTIONS_SERVICE_NAME, 'CreateDeposit')
  private createDeposit(payload: CreateDepositRequestDto): Promise<CreateBatchResponse> {
    return this.service.createDeposit(payload);
  }

	@GrpcMethod(TRANSACTIONS_SERVICE_NAME, 'CreateWithdrawal')
  private createWithdrawal(payload: CreateWithdrawalRequestDto): Promise<CreateBatchResponse> {
    return this.service.createWithdrawal(payload);
  }

}