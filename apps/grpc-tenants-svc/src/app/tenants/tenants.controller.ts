import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TenantsService } from './tenants.service';

@Controller()
export class TenantsController {
  @Inject(TenantsService)
  private readonly service: TenantsService;


}