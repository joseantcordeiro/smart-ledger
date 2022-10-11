import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindLedgerResponse,
  LedgersServiceClient,
  LEDGERS_SERVICE_NAME,
	CreateLedgerResponse,
	CreateAssetResponse
} from './ledgers.pb';

@Controller('ledgers')
export class LedgersController implements OnModuleInit {
  private svc: LedgersServiceClient;

  @Inject(LEDGERS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<LedgersServiceClient>(LEDGERS_SERVICE_NAME);
  }

  @Get(':id')
  private async findOne(@Param('id') id: string): Promise<Observable<FindLedgerResponse>> {
    return this.svc.findOne({ id });
  }

	@Post(':tenantId')
  private async createLedger(
		@Param('tenantId') tenantId: string,
    @Body() createLedger: { name: string },
  ): Promise<Observable<CreateLedgerResponse>> {
		const name = createLedger.name;
		return this.svc.createLedger({ tenantId, name });
  }

	@Post(':ledgerId/asset')
  private async createAsset(
		@Param('ledgerId') ledgerId: string,
    @Body() createAsset: { name: string, symbol: string},
  ): Promise<Observable<CreateAssetResponse>> {
		const name = createAsset.name;
		const symbol = createAsset.symbol;
		return this.svc.createAsset({ name, symbol, ledgerId });
  }
	
}
