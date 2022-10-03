import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindLedgerResponse,
  LedgersServiceClient,
  LEDGERS_SERVICE_NAME,
	CreateLedgerResponse
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

	@Post()
  private async createLedger(
    @Body() createLedger: { name: string, tenantId: string},
  ): Promise<Observable<CreateLedgerResponse>> {
		const name = createLedger.name;
		const tenantId = createLedger.tenantId;
		return this.svc.createLedger({ name, tenantId });
  }
	
}
