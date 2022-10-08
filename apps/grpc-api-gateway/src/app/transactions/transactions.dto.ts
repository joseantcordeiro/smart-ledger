import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBatchBodyDto {
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