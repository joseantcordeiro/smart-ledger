import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfigurationService } from './configuration.service';
import {
	COMMON_SERVICE_NAME,
	CreateConfigurationResponse,
	DefaultConfigurationResponse,
	FindConfigurationResponse,
	FindConfigurationsResponse
} from '../common.pb';
import {
	CreateConfigurationRequestDto,
	DefaultConfigurationRequestDto,
	FindConfigurationRequestDto,
	FindConfigurationsRequestDto
} from './configuration.dto';

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

	@GrpcMethod(COMMON_SERVICE_NAME, 'FindOneConfiguration')
  private findOneConfiguration(payload: FindConfigurationRequestDto): Promise<FindConfigurationResponse> {
    return this.service.findOneConfiguration(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'FindManyConfiguration')
  private findManyConfiguration(payload: FindConfigurationsRequestDto): Promise<FindConfigurationsResponse> {
    return this.service.findManyConfiguration(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'CreateConfiguration')
  private createConfiguration(payload: CreateConfigurationRequestDto): Promise<CreateConfigurationResponse> {
    return this.service.createConfiguration(payload);
  }

}