import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	FindManyRequest,
	CreateRequest } from './common.pb';

export class FindMetadataRequestDto implements FindManyRequest {
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

export class CreateMetadataRequestDto implements CreateRequest {
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