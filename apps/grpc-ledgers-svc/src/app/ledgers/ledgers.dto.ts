import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	CreateLedgerRequest,
	FindLedgerRequest
} from './ledgers.pb';

export class CreateLedgerRequestDto implements CreateLedgerRequest {
	@IsString()
	@IsNotEmpty()
  public readonly tenantId: string;

	@IsString()
	@IsNotEmpty()
  public readonly name: string;

}

export class FindLedgerRequestDto implements FindLedgerRequest {
	@IsString()
	@IsNotEmpty()
	public readonly id: string;

}
