import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfigurationService } from './configuration.service';
import {
	COMMON_SERVICE_NAME,
} from '../common.pb';

@Controller()
export class ConfigurationController {
	@Inject(ConfigurationService)
  private readonly service: ConfigurationService;

	@GrpcMethod(COMMON_SERVICE_NAME, 'TenantDefaultConfiguration')
  private tenantDefaultConfiguration(payload: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
    return this.service.tenantDefaultConfiguration(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'LedgerDefaultConfiguration')
  private ledgerDefaultConfiguration(payload: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
    return this.service.ledgerDefaultConfiguration(payload);
  }

}