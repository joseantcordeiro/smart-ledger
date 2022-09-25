import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneResponse,
  AccountsServiceClient,
  ACCOUNTS_SERVICE_NAME,
} from './accounts.pb';
import { AuthGuard } from '../auth/auth.guard';

@Controller('accounts')
export class AccountsController implements OnModuleInit {
  private svc: AccountsServiceClient;

  @Inject(ACCOUNTS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AccountsServiceClient>(ACCOUNTS_SERVICE_NAME);
  }
/**
  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(@Body() body: CreateProductRequest): Promise<Observable<CreateProductResponse>> {
    return this.svc.createProduct(body);
  }
 */
  @Get(':name')
  @UseGuards(AuthGuard)
  private async findOne(@Param('name') name: string): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({ name });
  }
}
