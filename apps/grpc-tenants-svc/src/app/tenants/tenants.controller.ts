import { Controller, Inject, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TenantsService } from './tenants.service';
import { FindTenantRequestDto, CreateTenantRequestDto } from './tenants.dto';
import { FindTenantResponse, TENANTS_SERVICE_NAME, CreateTenantResponse } from './tenants.pb';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcAuthGuard } from '@ledger/auth';

@Controller()
export class TenantsController {
  @Inject(TenantsService)
  private readonly service: TenantsService;

	@GrpcMethod(TENANTS_SERVICE_NAME, 'FindOne')
  private findOne(
			payload: FindTenantRequestDto,
			metadata: Metadata,
			call: ServerUnaryCall<any, any>
		): Promise<FindTenantResponse> {
		console.log(metadata);
    return this.service.findOne(payload);
  }

	@GrpcMethod(TENANTS_SERVICE_NAME, 'CreateTenant')
	// @UseGuards(new GrpcAuthGuard())
  private createTenant(
			payload: CreateTenantRequestDto,
			metadata: Metadata,
			call: ServerUnaryCall<any, any>
		): Promise<CreateTenantResponse> {
    return this.service.createTenant(payload);
  }

}