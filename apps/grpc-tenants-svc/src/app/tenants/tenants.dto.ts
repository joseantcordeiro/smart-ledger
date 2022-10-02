import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FindTenantsRequest,
	FindTenantRequest,
	CreateTenantRequest } from './tenants.pb';

export class FindTenantRequestDto implements FindTenantRequest {
  @IsString()
	@IsNotEmpty()
  public readonly id: string;
}

export class FindTenantsRequestDto implements FindTenantsRequest {
  @IsString()
  public readonly searchString: string = '';

	@IsNumber()
	public readonly take: number = 10;

	@IsNumber()
	public readonly skip: number = 0;

	@IsString()
	public readonly orderBy: string = 'asc';
}

export class CreateTenantRequestDto implements CreateTenantRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsString()
	@IsNotEmpty()
  public readonly identifier: string;

	@IsNumber()
	public readonly timezone: number = 0;

	@IsString()
	@IsNotEmpty()
  public readonly country: string;
}