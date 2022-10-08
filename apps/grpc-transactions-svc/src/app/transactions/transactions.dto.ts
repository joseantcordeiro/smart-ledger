import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBatchRequest } from './transactions.pb';

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

}

export class CreateBatchRequestDto implements CreateBatchRequest {
	@IsString()
	@IsNotEmpty()
	public readonly ledgerId: string;

	@IsArray()
	@IsNotEmpty()
	public readonly postings: PostingsDto[];
}