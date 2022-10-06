import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	DefaultConfigurationRequest,
	FindOneRequest,
	CreateRequest, 
	FindManyRequest
} from '../common.pb';

	export class FindConfigurationsRequestDto implements FindManyRequest {
		@IsString()
		@IsNotEmpty()
		public readonly targetId: string;
		
		@IsString()
		public readonly searchString: string = '';
	
		@IsNumber()
		public readonly take: number = 10;
	
		@IsNumber()
		public readonly skip: number = 0;
	
		@IsString()
		public readonly orderBy: string = 'asc';
	}

export class FindConfigurationRequestDto implements FindOneRequest {
	@IsString()
	@IsNotEmpty()
	public readonly targetId: string;

	@IsString()
	@IsNotEmpty()
	public readonly key: string;

}

export class CreateConfigurationRequestDto implements CreateRequest {
  @IsString()
	@IsNotEmpty()
	public readonly targetId: string;

	@IsString()
	@IsNotEmpty()
	public readonly key: string;

	@IsString()
	@IsNotEmpty()
	public readonly value: string;

}

export class DefaultConfigurationRequestDto implements DefaultConfigurationRequest {
  @IsString()
	@IsNotEmpty()
	public readonly targetId: string;

}