import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FindOneRequestDto } from './accounts.dto';
import { FindOneResponse, ACCOUNTS_SERVICE_NAME } from './accounts.pb';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  @Inject(AccountsService)
  private readonly service: AccountsService;

  @GrpcMethod(ACCOUNTS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

}
