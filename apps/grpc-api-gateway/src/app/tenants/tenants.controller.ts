import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindTenantResponse,
  TenantsServiceClient,
  TENANTS_SERVICE_NAME,
	CreateTenantResponse
} from './tenants.pb';

@Controller('tenants')
export class TenantsController implements OnModuleInit {
  private svc: TenantsServiceClient;

  @Inject(TENANTS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<TenantsServiceClient>(TENANTS_SERVICE_NAME);
  }

  @Get(':id')
  private async findOne(@Param('id') id: string): Promise<Observable<FindTenantResponse>> {
    return this.svc.findOne({ id });
  }

	@Post()
  private async createTenant(
    @Body() createTenant: { name: string, identifier: string, country: string, timezone: number},
  ): Promise<Observable<CreateTenantResponse>> {
		const name = createTenant.name;
		const identifier = createTenant.identifier;
		const timezone = createTenant.timezone;
		const country = createTenant.country;
		return this.svc.createTenant({ name, identifier, country, timezone });
  }
	
}
