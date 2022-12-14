import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
	FindAccountsRequestDto,
	FindAccountRequestDto,
	FindBalanceRequestDto
} from './accounts.dto';
import {
	FindAccountResponse,
	ACCOUNTS_SERVICE_NAME,
	FindAccountsResponse,
	FindBalanceResponse
} from './accounts.pb';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;

  @GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindAccountRequestDto): Promise<FindAccountResponse> {
    return this.service.findOne(payload);
  }

	@GrpcMethod(ACCOUNTS_SERVICE_NAME, 'CreateAccount')
  private createAccount(payload: FindAccountRequestDto): Promise<FindAccountResponse> {
    return this.service.createAccount(payload);
  }

	@GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindMany')
  private findMany(payload: FindAccountsRequestDto): Promise<FindAccountsResponse> {
    return this.service.findMany(payload);
  }

	@GrpcMethod(ACCOUNTS_SERVICE_NAME, 'Balance')
  private balance(payload: FindBalanceRequestDto): Promise<FindBalanceResponse> {
    return this.service.balance(payload);
  }

}
