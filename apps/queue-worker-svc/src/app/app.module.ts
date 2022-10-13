import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
