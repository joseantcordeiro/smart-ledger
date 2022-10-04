import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LedgersService } from './ledgers.service';
import {
	FindLedgerRequestDto,
	CreateLedgerRequestDto,
	GetConfigurationRequestDto,
	GetConfigurationsRequestDto,
	CreateConfigurationRequestDto
} from './ledgers.dto';
import {
	FindLedgerResponse,
	LEDGERS_SERVICE_NAME,
	CreateLedgerResponse,
	GetConfigurationResponse,
	GetConfigurationsResponse,
	CreateConfigurationResponse
} from './ledgers.pb';

@Controller()
export class LedgersController {
  @Inject(LedgersService)
  private readonly service: LedgersService;

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindLedgerRequestDto): Promise<FindLedgerResponse> {
    return this.service.findOne(payload);
  }

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'CreateLedger')
  private createLedger(payload: CreateLedgerRequestDto): Promise<CreateLedgerResponse> {
    return this.service.createLedger(payload);
  }

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'GetConfiguration')
	private getConfiguration(payload: GetConfigurationRequestDto): Promise<GetConfigurationResponse> {
		return this.service.getConfiguration(payload);
	}

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'GetConfigurations')
	private getConfigurations(payload: GetConfigurationsRequestDto): Promise<GetConfigurationsResponse> {
		return this.service.getConfigurations(payload);
	}

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'CreateConfiguration')
	private createConfiguration(payload: CreateConfigurationRequestDto): Promise<CreateConfigurationResponse> {
		return this.service.createConfiguration(payload);
	}

}