import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FindAccountsRequest, FindAccountRequest } from './accounts.pb';

export class FindAccountRequestDto implements FindAccountRequest {
  @IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsString()
	@IsNotEmpty()
  public readonly ledgerId: string;

}

export class FindAccountsRequestDto implements FindAccountsRequest {
  @IsString()
  public readonly searchString: string = '';

	@IsNumber()
	public readonly take: number = 10;

	@IsNumber()
	public readonly skip: number = 0;

	@IsString()
	public readonly orderBy: string = 'asc';

	@IsString()
	@IsNotEmpty()
  public readonly ledgerId: string;
	
}
