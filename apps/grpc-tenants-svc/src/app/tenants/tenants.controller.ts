import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TenantsService } from './tenants.service';
import { FindTenantRequestDto, CreateTenantRequestDto } from './tenants.dto';
import { FindTenantResponse, TENANTS_SERVICE_NAME, CreateTenantResponse } from './tenants.pb';

@Controller()
export class TenantsController {
  @Inject(TenantsService)
  private readonly service: TenantsService;

	@GrpcMethod(TENANTS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindTenantRequestDto): Promise<FindTenantResponse> {
    return this.service.findOne(payload);
  }

	@GrpcMethod(TENANTS_SERVICE_NAME, 'CreateTenant')
  private createMetadata(payload: CreateTenantRequestDto): Promise<CreateTenantResponse> {
    return this.service.createTenant(payload);
  }

}