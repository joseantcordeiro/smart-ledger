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

	@Post(':ledgerId/deposit')
  private async createDeposit(
		@Param('ledgerId') ledgerId: string,
    @Body() BodyInput: { destination: string, asset: string, value: number },
  ): Promise<Observable<CreateBatchResponse>> {
		const destination = BodyInput.destination;
		const asset = BodyInput.asset;
		const value = BodyInput.value;
		return this.svc.createDeposit({ ledgerId, destination, asset, value });
  }

	@Post(':ledgerId/withdrawal')
  private async createWithdrawal(
		@Param('ledgerId') ledgerId: string,
    @Body() BodyInput: { source: string, asset: string, value: number },
  ): Promise<Observable<CreateBatchResponse>> {
		const source = BodyInput.source;
		const asset = BodyInput.asset;
		const value = BodyInput.value;
		return this.svc.createWithdrawal({ ledgerId, source, asset, value });
  }

}