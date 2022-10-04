import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindLedgerResponse,
  LedgersServiceClient,
  LEDGERS_SERVICE_NAME,
	CreateLedgerResponse,
	GetConfigurationResponse,
	GetConfigurationsResponse,
	CreateConfigurationResponse
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

	@Get(':id/config/:key')
  private async getConfiguration(
		@Param('id') id: string,
		@Param('key') key: string): Promise<Observable<GetConfigurationResponse>> {
    return this.svc.getConfiguration({ id, key });
  }

	@Get(':id/config')
  private async getConfigurations(@Param('id') id: string): Promise<Observable<GetConfigurationsResponse>> {
    return this.svc.getConfigurations({ id });
  }

	@Post(':id/config')
  private async createConfiguration(
		@Param('id') id: string,
    @Body() createLedger: { key: string, value: string},
  ): Promise<Observable<CreateConfigurationResponse>> {
		const key = createLedger.key
		const value = createLedger.value
		return this.svc.createConfiguration({ id, key, value });
  }
	
}
