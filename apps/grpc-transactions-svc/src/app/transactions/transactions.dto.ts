import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBatchRequest, Posting } from './transactions.pb';

export class PostingsDto {
	@IsString()
	@IsNotEmpty()
  public readonly source: string;

	@IsString()
	@IsNotEmpty()
  public readonly destination: string;

	@IsString()
	@IsNotEmpty()
  public readonly countasset: string;

	@IsNumber()
	public readonly value: number;

}

export class CreateBatchRequestDto implements CreateBatchRequest {
	@IsString()
	@IsNotEmpty()
	public readonly ledgerId: string;

	public readonly postings: Posting[];
}