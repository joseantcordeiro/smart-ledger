import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TransactionsModule } from './transactions/transactions.module';
import { EthModule } from '@ledger/eth';

@Module({
  imports: [
		BullModule.forRoot({
      redis: {
        host: 'joseantcordeiro.hopto.org',
        port: 16379,
				password: 'KXfgU0p3pAWp'
      },
    }),
		EthModule,
		TransactionsModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
