import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { TRANSACTIONS_SERVICE_NAME, CreateBatchResponse } from './transactions.pb';
import { CreateBatchRequestDto } from './transactions.dto';

@Controller()
export class TransactionsController {
  @Inject(TransactionsService)
  private readonly service: TransactionsService;

	@GrpcMethod(TRANSACTIONS_SERVICE_NAME, 'CreateBatch')
  private createBatch(payload: CreateBatchRequestDto): Promise<CreateBatchResponse> {
    return this.service.createBatch(payload);
  }

}