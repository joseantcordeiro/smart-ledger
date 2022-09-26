import { Controller, Get, Inject, OnModuleInit, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindAccountResponse,
	FindAccountsResponse,
  AccountsServiceClient,
  ACCOUNTS_SERVICE_NAME,
	FindMetadataResponse,
} from './accounts.pb';

@Controller('accounts')
export class AccountsController implements OnModuleInit {
  private svc: AccountsServiceClient;

  @Inject(ACCOUNTS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AccountsServiceClient>(ACCOUNTS_SERVICE_NAME);
  }

  @Get(':name')
  private async findOne(@Param('name') name: string): Promise<Observable<FindAccountResponse>> {
    return this.svc.findOne({ name });
  }

	@Get()
  private async findMany(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<Observable<FindAccountsResponse>> {
		return this.svc.findMany({ searchString, take, skip, orderBy });
  }

	@Get(':name/metadata')
  private async findMetadata(
		@Param('name') name: string,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<Observable<FindMetadataResponse>> {
		return this.svc.findMetadata({ name, searchString, take, skip, orderBy });
  }
	
}
