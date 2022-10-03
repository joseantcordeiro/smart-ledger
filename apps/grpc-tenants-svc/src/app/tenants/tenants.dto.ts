import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FindTenantRequest, CreateTenantRequest } from './tenants.pb';

export class FindTenantRequestDto implements FindTenantRequest {
  @IsString()
	@IsNotEmpty()
  public readonly id: string;
}

export class CreateTenantRequestDto implements CreateTenantRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsString()
	@IsNotEmpty()
  public readonly identifier: string;

	@IsString()
	@IsNotEmpty()
  public readonly country: string = 'US';

	@IsNumber()
	public readonly timezone: number = 37;

}