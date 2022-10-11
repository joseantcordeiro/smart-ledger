import { Module } from '@nestjs/common';
import { EthModule } from '@ledger/eth';
import { LedgersModule } from './ledgers/ledgers.module';

@Module({
  imports: [EthModule, LedgersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
