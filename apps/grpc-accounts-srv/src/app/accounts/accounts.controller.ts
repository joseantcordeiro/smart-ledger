import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FindAccountsRequestDto, FindAccountRequestDto, FindMetadataRequestDto } from './accounts.dto';
import { FindAccountResponse, ACCOUNTS_SERVICE_NAME, FindAccountsResponse, FindMetadataResponse } from './accounts.pb';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;

  @GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindAccountRequestDto): Promise<FindAccountResponse> {
    return this.service.findOne(payload);
  }

	@GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindMany')
  private findMany(payload: FindAccountsRequestDto): Promise<FindAccountsResponse> {
    return this.service.findMany(payload);
  }

	@GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindMetadata')
  private findMetadata(payload: FindMetadataRequestDto): Promise<FindMetadataResponse> {
    return this.service.findMetadata(payload);
  }

}
