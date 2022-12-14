import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from '@ledger/prisma';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { EthService } from '@ledger/eth';

@Module({
	imports: [
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [TransactionsController],
  providers: [PrismaService, EthService, TransactionsService],
})
export class TransactionsModule {}