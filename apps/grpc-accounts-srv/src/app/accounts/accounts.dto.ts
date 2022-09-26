import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FindAccountsRequest,
	FindAccountRequest,
	FindMetadataRequest,
	CreateMetadataRequest } from './accounts.pb';

export class FindAccountRequestDto implements FindAccountRequest {
  @IsString()
	@IsNotEmpty()
  public readonly name: string;
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
}

export class FindMetadataRequestDto implements FindMetadataRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;
	
  @IsString()
  public readonly searchString: string = '';

	@IsNumber()
	public readonly take: number = 10;

	@IsNumber()
	public readonly skip: number = 0;

	@IsString()
	public readonly orderBy: string = 'asc';
}

export class CreateMetadataRequestDto implements CreateMetadataRequest {
	@IsString()
	@IsNotEmpty()
  public readonly name: string;

	@IsString()
	@IsNotEmpty()
  public readonly key: string;

	@IsString()
	@IsNotEmpty()
  public readonly value: string;
}

/**
export class CreateProductRequestDto implements CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly sku: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly stock: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly price: number;
}

export class DecreaseStockRequestDto implements DecreaseStockRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly orderId: number;
}
 */