import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FindLedgerRequest, CreateLedgerRequest } from './tenants.pb';

export class FindLedgerRequestDto implements FindLedgerRequest {
  @IsString()
	@IsNotEmpty()
  public readonly id: string;
}

export class CreateLedgerRequestDto implements CreateLedgerRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsNumber()
	public readonly volumeIn: number = 0.00;

	@IsNumber()
	public readonly volumeOut: number = 0.00;

}