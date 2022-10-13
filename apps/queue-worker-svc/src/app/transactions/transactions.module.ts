import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from '@ledger/prisma';
import { TransactionsProcessor } from './transactions.processor';
import { EthService } from '@ledger/eth';

@Module({
	imports: [
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [],
  providers: [PrismaService, EthService, TransactionsProcessor],
})
export class TransactionsModule {}