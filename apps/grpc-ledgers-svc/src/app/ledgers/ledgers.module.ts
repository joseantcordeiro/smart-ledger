import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { EthService } from '@ledger/eth';
import { LedgersController } from './ledgers.controller';
import { LedgersService } from './ledgers.service';

@Module({
  controllers: [LedgersController],
  providers: [PrismaService, EthService, LedgersService],
})
export class LedgersModule {}