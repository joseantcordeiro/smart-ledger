import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
	CreateAssetRequest,
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

export class CreateAssetRequestDto implements CreateAssetRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsString()
	@IsNotEmpty()
  public readonly symbol: string;

	@IsString()
	@IsNotEmpty()
  public readonly ledgerId: string;

}
