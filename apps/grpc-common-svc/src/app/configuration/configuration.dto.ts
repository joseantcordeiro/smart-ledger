import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	DefaultConfigurationRequest,
	FindOneRequest,
	CreateRequest } from './common.pb';

export class GetConfigurationRequestDto implements GetConfigurationRequest {
	@IsString()
	@IsNotEmpty()
	public readonly id: string;

	@IsString()
	@IsNotEmpty()
	public readonly key: string;

}

export class DefaultConfigurationRequestDto implements DefaultConfigurationRequest {
	@IsString()
	@IsNotEmpty()
	public readonly id: string;

}

export class DefaultConfigurationResponse implements DefaultConfigurationResponse {
	@IsNumber()

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