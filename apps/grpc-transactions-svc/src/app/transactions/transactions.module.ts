import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [PrismaService, TransactionsService],
})
export class TransactionsModule {}