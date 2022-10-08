import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseArrayPipe, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  TransactionsServiceClient,
  TRANSACTIONS_SERVICE_NAME,
	CreateBatchResponse
} from './transactions.pb';
import { CreateBatchBodyDto } from './transactions.dto';

@Controller('transactions')
export class TransactionsController implements OnModuleInit {
  private svc: TransactionsServiceClient;

  @Inject(TRANSACTIONS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<TransactionsServiceClient>(TRANSACTIONS_SERVICE_NAME);
  }

	@Post(':ledgerId/batch')
  private async createBatch(
		@Param('ledgerId') ledgerId: string,
    @Body(new ParseArrayPipe({ items: CreateBatchBodyDto })) postings: CreateBatchBodyDto[],
  ): Promise<Observable<CreateBatchResponse>> {
		console.log(JSON.stringify(postings));
		
		return this.svc.createBatch({ ledgerId, postings });
  }

}