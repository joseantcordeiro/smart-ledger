import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LedgersService } from './ledgers.service';
import {
	FindLedgerRequestDto,
	CreateLedgerRequestDto
} from './ledgers.dto';
import {
	FindLedgerResponse,
	LEDGERS_SERVICE_NAME,
	CreateLedgerResponse
} from './ledgers.pb';

@Controller()
export class LedgersController {
  @Inject(LedgersService)
  private readonly service: LedgersService;

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindLedgerRequestDto): Promise<FindLedgerResponse> {
    return this.service.findOne(payload);
  }

	@GrpcMethod(LEDGERS_SERVICE_NAME, 'CreateLedger')
  private createLedger(payload: CreateLedgerRequestDto): Promise<CreateLedgerResponse> {
    return this.service.createLedger(payload);
  }

}