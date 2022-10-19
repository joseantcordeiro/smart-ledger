import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { EthModule } from '@ledger/eth';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		BullModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				redis: {
					host: configService.get('QUEUE_HOST'),
					port: +configService.get('QUEUE_PORT'),
					password: configService.get('QUEUE_PASSWORD'),
				},
			}),
			inject: [ConfigService],
		}),
		EthModule,
		TransactionsModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
