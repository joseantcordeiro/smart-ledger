import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { EthService } from '@ledger/eth';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [PrismaService, EthService, AccountsService],
})
export class AccountsModule {}
