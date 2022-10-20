import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseGuards, Session } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { SessionContainer, SessionClaimValidator } from "supertokens-node/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { AuthGuard } from '@ledger/auth';
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
	@UseGuards(new AuthGuard())
  private async findOne(
			@Session() session: SessionContainer,
			@Param('id') id: string
		): Promise<Observable<FindTenantResponse>> {
		const token = session.getAccessTokenPayload()["jwt"];
		const metadata = new Metadata();
  	metadata.add('Authorization', `Bearer ${token}`);
    return this.svc.findOne({ id }, metadata);
  }

	@Post()
	@UseGuards(new AuthGuard({
		overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
			...globalValidators,
			UserRoles.UserRoleClaim.validators.includes("admin"),
			// UserRoles.PermissionClaim.validators.includes("edit")
		])
	}))
  private async createTenant(
		@Session() session: SessionContainer,
    @Body() createTenant: { name: string, identifier: string, country: string, timezone: number},
  ): Promise<Observable<CreateTenantResponse>> {
		const token = session.getAccessTokenPayload()["jwt"];
		const metadata = new Metadata();
  	metadata.add('Authorization', `Bearer ${token}`);
		const name = createTenant.name;
		const identifier = createTenant.identifier;
		const timezone = createTenant.timezone;
		const country = createTenant.country;
		return this.svc.createTenant({ name, identifier, country, timezone }, metadata);
  }
	
}
