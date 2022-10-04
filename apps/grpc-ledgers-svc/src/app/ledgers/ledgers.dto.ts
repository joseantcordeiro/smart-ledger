import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	FindLedgerRequest,
	CreateLedgerRequest,
	GetConfigurationRequest,
	GetConfigurationsRequest,
	CreateConfigurationRequest
} from './ledgers.pb';

export class FindLedgerRequestDto implements FindLedgerRequest {
  @IsString()
	@IsNotEmpty()
  public readonly id: string;
}

export class CreateLedgerRequestDto implements CreateLedgerRequest {
	@IsString()
	@IsNotEmpty()
  public readonly tenantId: string;

	@IsString()
	@IsNotEmpty()
  public readonly name: string;

}

export class GetConfigurationRequestDto implements GetConfigurationRequest {
	@IsString()
	@IsNotEmpty()
	public readonly id: string;

	@IsString()
	@IsNotEmpty()
	public readonly key: string;

}

export class GetConfigurationsRequestDto implements GetConfigurationsRequest {
	@IsString()
	@IsNotEmpty()
	public readonly id: string;

}

export class CreateConfigurationRequestDto implements CreateConfigurationRequest {
  @IsString()
	@IsNotEmpty()
	public readonly id: string;

	@IsString()
	@IsNotEmpty()
	public readonly key: string;

	@IsString()
	@IsNotEmpty()
	public readonly value: string;

}