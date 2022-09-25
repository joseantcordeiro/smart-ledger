import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneResponse,
  AccountsServiceClient,
  ACCOUNTS_SERVICE_NAME,
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
  private async findOne(@Param('name') name: string): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ name });
  }
}
