import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { LedgersController } from './ledgers.controller';
import { LedgersService } from './ledgers.service';

@Module({
  controllers: [LedgersController],
  providers: [PrismaService, LedgersService],
})
export class LedgersModule {}