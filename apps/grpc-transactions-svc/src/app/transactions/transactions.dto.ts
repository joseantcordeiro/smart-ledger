import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBatchRequest, CreateDepositRequest, CreateWithdrawalRequest } from './transactions.pb';

export class PostingsDto {
	@IsString()
	@IsNotEmpty()
  public readonly source: string;

	@IsString()
	@IsNotEmpty()
  public readonly destination: string;

	@IsString()
	@IsNotEmpty()
  public readonly asset: string;

	@IsNumber()
	public readonly value: number;

  public readonly type: string = "TRANSFER";

}

export class CreateBatchRequestDto implements CreateBatchRequest {
	@IsString()
	@IsNotEmpty()
	public readonly ledgerId: string;

	@IsArray()
	@IsNotEmpty()
	public readonly postings: PostingsDto[];
}

export class CreateDepositRequestDto implements CreateDepositRequest {
	@IsString()
	@IsNotEmpty()
	public readonly ledgerId: string;

	@IsString()
	@IsNotEmpty()
  public readonly destination: string;

	@IsString()
	@IsNotEmpty()
  public readonly asset: string;

	@IsNumber()
	public readonly value: number;
}

export class CreateWithdrawalRequestDto implements CreateWithdrawalRequest {
	@IsString()
	@IsNotEmpty()
	public readonly ledgerId: string;

	@IsString()
	@IsNotEmpty()
  public readonly source: string;

	@IsString()
	@IsNotEmpty()
  public readonly asset: string;

	@IsNumber()
	public readonly value: number;
}