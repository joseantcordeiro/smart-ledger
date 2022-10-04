import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [PrismaService, AccountsService],
})
export class AccountsModule {}
